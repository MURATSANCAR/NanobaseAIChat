import { useCallback } from 'react';
import { v4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
import { Constants } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import { useChatContext } from '~/Providers';
import { useAuthContext } from '~/hooks/AuthContext';
import { useLocalize } from '~/hooks';
import { useSendOperationMessageMutation } from '~/data-provider/Operation';
import { getOperationSummaryMessage, mapProxyErrorToUserMessage } from '~/utils/operationDisplay';
import store from '~/store';

export default function useOperationSubmit() {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const { conversation, getMessages, setMessages, setIsSubmitting } = useChatContext();
  const setOperationPanelOpen = useSetRecoilState(store.operationPanelOpen);
  const setActiveJobId = useSetRecoilState(store.activeOperationJobId);
  const setActiveExecutionId = useSetRecoilState(store.activeOperationExecutionId);

  const mutation = useSendOperationMessageMutation();

  const submitOperationMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const conversationId = conversation?.conversationId ?? Constants.NEW_CONVO;
      const currentMessages = getMessages() ?? [];
      const parentMessageId =
        currentMessages.at(-1)?.messageId ?? Constants.NO_PARENT;

      const userMessageId = v4();
      const assistantMessageId = `${userMessageId}_`;

      const userMessage: TMessage = {
        text: trimmed,
        sender: 'User',
        clientTimestamp: new Date().toISOString(),
        isCreatedByUser: true,
        parentMessageId,
        conversationId: conversationId === Constants.NEW_CONVO ? null : conversationId,
        messageId: userMessageId,
        error: false,
      };

      const placeholderAssistant: TMessage = {
        text: localize('com_nanobase_operation_loading'),
        sender: 'NanobaseAI',
        isCreatedByUser: false,
        parentMessageId: userMessageId,
        conversationId: userMessage.conversationId,
        messageId: assistantMessageId,
        error: false,
        unfinished: true,
      };

      setMessages([...currentMessages, userMessage, placeholderAssistant]);
      setIsSubmitting(true);

      try {
        const response = await mutation.mutateAsync({
          workspace_id: 'default',
          user_id: user?.id,
          conversation_id:
            conversationId === Constants.NEW_CONVO ? `new-${userMessageId}` : conversationId,
          message: trimmed,
          risk: 'medium',
          requires_approval: false,
          requested_tools: [],
        });

        const summaryText = getOperationSummaryMessage(response, localize);

        const assistantMessage: TMessage = {
          ...placeholderAssistant,
          text: summaryText,
          unfinished: false,
          error: false,
        };

        setMessages([...currentMessages, userMessage, assistantMessage]);

        if (response.job_id) {
          setActiveJobId(response.job_id);
          setActiveExecutionId(response.execution_id ?? null);
          setOperationPanelOpen(true);
        }
      } catch (error) {
        const axiosData = error as { response?: { data?: { error?: string } } };
        const rawError =
          axiosData.response?.data?.error ??
          (error instanceof Error ? error.message : undefined);
        const errorMessage = mapProxyErrorToUserMessage(rawError, localize);

        const assistantMessage: TMessage = {
          ...placeholderAssistant,
          text: errorMessage,
          unfinished: false,
          error: true,
        };

        setMessages([...currentMessages, userMessage, assistantMessage]);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      conversation?.conversationId,
      getMessages,
      localize,
      mutation,
      setActiveExecutionId,
      setActiveJobId,
      setIsSubmitting,
      setMessages,
      setOperationPanelOpen,
      user?.id,
    ],
  );

  return { submitOperationMessage, isPending: mutation.isPending };
}
