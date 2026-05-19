import { memo } from 'react';
import { TooltipAnchor } from '@librechat/client';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import ComposerAgentOrb from './ComposerAgentOrb';

export default memo(function StopButton({
  stop,
  setShowStopButton,
}: {
  stop: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowStopButton: (value: boolean) => void;
}) {
  const localize = useLocalize();

  return (
    <TooltipAnchor
      description={localize('com_nav_stop_generating')}
      render={
        <button
          type="button"
          id="stop-button"
          className={cn(
            'nb-stop-agent group relative flex size-12 shrink-0 items-center justify-center rounded-full outline-offset-4 transition-all duration-200',
            'border border-red-500/35 bg-[rgba(15,29,50,0.95)] shadow-[0_4px_16px_rgba(0,0,0,0.35)]',
            'hover:border-red-400/55 hover:shadow-[0_4px_20px_rgba(248,113,113,0.25)]',
            'nb-stop-agent--active',
          )}
          aria-label={localize('com_nav_stop_generating')}
          onClick={(e) => {
            setShowStopButton(false);
            stop(e);
          }}
        >
          <ComposerAgentOrb active variant="stop" />
          <span className="relative z-[2] flex items-center justify-center text-red-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="7" y="7" width="10" height="10" rx="1.25" fill="currentColor" />
            </svg>
          </span>
        </button>
      }
    />
  );
});
