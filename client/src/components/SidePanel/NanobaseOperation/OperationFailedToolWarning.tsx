import type { OperationRuntimeToolResult } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { formatDuration, getToolDisplayName } from '~/utils/operationDisplay';

export default function OperationFailedToolWarning({
  results,
}: {
  results: OperationRuntimeToolResult[];
}) {
  const localize = useLocalize();
  const failed = results.filter((r) => r.state === 'failed');

  if (failed.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3" role="alert">
      <p className="text-sm font-medium text-red-800 dark:text-red-300">
        {localize('com_nanobase_operation_failed_warning_title')}
      </p>
      <p className="mt-1 text-xs text-red-700 dark:text-red-400">
        {localize('com_nanobase_operation_failed_body')}
      </p>
      <ul className="mt-2 space-y-2">
        {failed.map((r) => (
          <li key={r.tool} className="text-xs text-red-700 dark:text-red-400">
            <span className="font-medium">{getToolDisplayName(r.tool, localize)}</span>
            {r.error && <span> — {r.error}</span>}
            {r.ms != null && (
              <span className="text-text-secondary">
                {' '}
                ({formatDuration(r.ms)})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
