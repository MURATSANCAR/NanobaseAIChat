import type { OperationRuntimeToolResult } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { getToolDisplayName } from '~/utils/operationDisplay';

export default function OperationCredentialWarning({
  results,
}: {
  results: OperationRuntimeToolResult[];
}) {
  const localize = useLocalize();
  const waiting = results.filter((r) => r.state === 'waiting_credentials');

  if (waiting.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3"
      role="status"
    >
      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
        {localize('com_nanobase_operation_credential_warning_title')}
      </p>
      <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
        {localize('com_nanobase_operation_credential_body')}
      </p>
      <ul className="mt-2 list-inside list-disc text-xs text-amber-700 dark:text-amber-400">
        {waiting.map((r) => (
          <li key={r.tool}>{getToolDisplayName(r.tool, localize)}</li>
        ))}
      </ul>
    </div>
  );
}
