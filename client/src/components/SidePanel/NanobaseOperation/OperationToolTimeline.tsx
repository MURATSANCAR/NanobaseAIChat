import type { OperationRuntimeToolResult } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import {
  formatDuration,
  getToolDisplayName,
  getToolStateLabel,
  getToolStateTone,
  sanitizeOperationPayload,
} from '~/utils/operationDisplay';
import OperationStatusBadge from './OperationStatusBadge';

function ToolCard({ result }: { result: OperationRuntimeToolResult }) {
  const localize = useLocalize();
  const details = sanitizeOperationPayload(result.payload);
  const connectorRequired =
    result.payload &&
    typeof result.payload.connector_required === 'string'
      ? result.payload.connector_required
      : null;

  return (
    <div className="rounded-lg border border-border-light bg-surface-secondary p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-text-primary">
          {getToolDisplayName(result.tool, localize)}
        </span>
        <OperationStatusBadge
          label={getToolStateLabel(result.state, localize)}
          tone={getToolStateTone(result.state)}
        />
      </div>
      <p className="text-xs text-text-secondary">
        {localize('com_nanobase_operation_label_duration')}: {formatDuration(result.ms)}
      </p>
      {result.error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {localize('com_nanobase_operation_label_error_detail')}: {result.error}
        </p>
      )}
      {connectorRequired && (
        <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{connectorRequired}</p>
      )}
      {details.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-text-secondary">
          {details.map((entry) => (
            <li key={entry.key}>
              <span className="font-medium">{entry.key}:</span> {entry.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OperationToolTimeline({
  results,
}: {
  results: OperationRuntimeToolResult[];
}) {
  const localize = useLocalize();

  if (results.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">
        {localize('com_nanobase_operation_timeline_title')}
      </h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <ToolCard key={`${result.tool}-${result.created_at ?? index}`} result={result} />
        ))}
      </div>
    </section>
  );
}
