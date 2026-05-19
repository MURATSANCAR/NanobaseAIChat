import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'librechat-data-provider';
import { useOperationAuditQuery, useOperationJobQuery } from '~/data-provider/Operation';
import { isOperationTerminalStatus } from '~/utils/operationDisplay';

const POLL_INTERVAL_MS = 2000;

export default function useOperationPolling(
  jobId: string | null,
  executionId: string | null,
  enabled: boolean,
) {
  const queryClient = useQueryClient();

  const jobQuery = useOperationJobQuery(jobId, {
    refetchInterval: (query) => {
      if (!enabled || !jobId) {
        return false;
      }
      const status = query.state.data?.status;
      if (isOperationTerminalStatus(status)) {
        return false;
      }
      return POLL_INTERVAL_MS;
    },
  });

  useOperationAuditQuery(executionId, {
    refetchInterval: () => {
      if (!enabled || !executionId) {
        return false;
      }
      const status = jobQuery.data?.status;
      if (isOperationTerminalStatus(status)) {
        return false;
      }
      return POLL_INTERVAL_MS;
    },
  });

  useEffect(() => {
    if (!enabled || !jobId) {
      return;
    }
    return () => {
      queryClient.removeQueries([QueryKeys.operationJob, jobId]);
      if (executionId) {
        queryClient.removeQueries([QueryKeys.operationAudit, executionId]);
      }
    };
  }, [enabled, executionId, jobId, queryClient]);
}
