import type { OperationRuntimeResult } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';

export default function OperationRuntimeSummary({
  runtime,
  artifactCount,
}: {
  runtime: OperationRuntimeResult;
  artifactCount: number;
}) {
  const localize = useLocalize();

  const rows = [
    { label: localize('com_nanobase_operation_label_tool_count'), value: runtime.tool_count },
    {
      label: localize('com_nanobase_operation_label_success_count'),
      value: runtime.success_count ?? 0,
    },
    {
      label: localize('com_nanobase_operation_label_failed_count'),
      value: runtime.failed_count,
    },
    {
      label: localize('com_nanobase_operation_label_waiting_credentials'),
      value: runtime.waiting_credentials_count ?? 0,
    },
    {
      label: localize('com_nanobase_operation_label_skipped_count'),
      value: runtime.skipped_count ?? 0,
    },
    { label: localize('com_nanobase_operation_label_artifact_count'), value: artifactCount },
  ];

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">
        {localize('com_nanobase_operation_summary_title')}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-lg border border-border-light bg-surface-secondary px-3 py-2"
          >
            <p className="text-xs text-text-secondary">{row.label}</p>
            <p className="text-lg font-semibold text-text-primary">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
