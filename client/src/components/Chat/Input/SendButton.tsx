import React, { forwardRef } from 'react';
import { useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { SendIcon, TooltipAnchor } from '@librechat/client';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import ComposerAgentOrb from './ComposerAgentOrb';

type SendButtonProps = {
  disabled: boolean;
  control: Control<{ text: string }>;
};

const SubmitButton = React.memo(
  forwardRef((props: { disabled: boolean }, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const localize = useLocalize();
    const isActive = !props.disabled;

    return (
      <TooltipAnchor
        description={localize('com_nav_send_message')}
        render={
          <button
            ref={ref}
            aria-label={localize('com_nav_send_message')}
            id="send-button"
            disabled={props.disabled}
            className={cn(
              'nb-send-agent group relative flex size-12 shrink-0 items-center justify-center rounded-full outline-offset-4 transition-all duration-200',
              isActive
                ? 'nb-send-agent--ready border border-orange-200/90 bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 shadow-[0_4px_22px_rgba(249,115,22,0.55)] hover:border-white/70 hover:shadow-[0_6px_28px_rgba(249,115,22,0.72)]'
                : 'border border-orange-500/35 bg-[rgba(15,29,50,0.95)] shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:border-orange-400/55 hover:shadow-[0_4px_20px_rgba(249,115,22,0.28)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-orange-500/35 disabled:hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]',
            )}
            data-testid="send-button"
            type="submit"
          >
            <ComposerAgentOrb active={isActive} />
            <span
              className={cn(
                'relative z-[2] flex items-center justify-center rounded-full transition-colors duration-200',
                isActive
                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]'
                  : 'text-slate-400',
              )}
            >
              <SendIcon size={22} />
            </span>
          </button>
        }
      />
    );
  }),
);

const SendButton = React.memo(
  forwardRef((props: SendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const data = useWatch({ control: props.control });
    const content = data?.text?.trim();
    return <SubmitButton ref={ref} disabled={props.disabled || !content} />;
  }),
);

export default SendButton;
