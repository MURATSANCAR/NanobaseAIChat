import { cn } from '~/utils';
import type { OperationStatusTone } from '~/utils/operationDisplay';

const toneClasses: Record<OperationStatusTone, string> = {
  success: 'bg-green-500/15 text-green-700 dark:text-green-400',
  warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  error: 'bg-red-500/15 text-red-700 dark:text-red-400',
  info: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  neutral: 'bg-surface-active text-text-secondary',
};

export default function OperationStatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: OperationStatusTone;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
}
