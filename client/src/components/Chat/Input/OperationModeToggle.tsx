import { useRecoilState } from 'recoil';
import { TooltipAnchor } from '@librechat/client';
import { Workflow } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';

export default function OperationModeToggle() {
  const localize = useLocalize();
  const [isOperationMode, setIsOperationMode] = useRecoilState(store.isOperationMode);

  return (
    <TooltipAnchor
      description={localize('com_nanobase_operation_mode_toggle')}
      render={
        <button
          type="button"
          onClick={() => setIsOperationMode(!isOperationMode)}
          aria-label={localize('com_nanobase_operation_mode_toggle')}
          aria-pressed={isOperationMode}
          className={cn(
            'inline-flex h-9 flex-shrink-0 items-center gap-1.5 rounded-xl border border-border-light px-2.5 text-xs font-medium text-text-primary transition-all',
            isOperationMode
              ? 'bg-surface-active'
              : 'bg-presentation shadow-sm hover:bg-surface-active-alt',
          )}
        >
          <Workflow className="icon-sm" aria-hidden="true" />
          <span className="hidden sm:inline">
            {isOperationMode
              ? localize('com_nanobase_operation_mode_operation')
              : localize('com_nanobase_operation_mode_normal')}
          </span>
        </button>
      }
    />
  );
}
