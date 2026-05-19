import { Copy } from 'lucide-react';
import type { OperationJob } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import {
  formatDateTime,
  formatShortId,
  getOperationStatusLabel,
  getOperationStatusTone,
} from '~/utils/operationDisplay';
import OperationStatusBadge from './OperationStatusBadge';

export default function OperationJobHeader({ job }: { job: OperationJob }) {
  const localize = useLocalize();

  const copyId = (id: string) => {
    void navigator.clipboard.writeText(id);
  };

  return (
    <div className="space-y-3 border-b border-border-medium pb-4">
      <div className="flex flex-wrap items-center gap-2">
        <OperationStatusBadge
          label={getOperationStatusLabel(job.status, localize)}
          tone={getOperationStatusTone(job.status)}
        />
        <OperationStatusBadge
          label={localize('com_nanobase_operation_label_tools_active')}
          tone="success"
        />
        <OperationStatusBadge
          label={localize('com_nanobase_operation_label_safe_engine')}
          tone="info"
        />
      </div>
      <div className="space-y-1.5 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">
            {localize('com_nanobase_operation_label_job_id')}:
          </span>
          <span>{formatShortId(job.job_id)}</span>
          <button
            type="button"
            className="rounded p-1 hover:bg-surface-active"
            aria-label={localize('com_nanobase_operation_action_copy_id')}
            onClick={() => copyId(job.job_id)}
          >
            <Copy className="icon-xs" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">
            {localize('com_nanobase_operation_label_execution_id')}:
          </span>
          <span>{formatShortId(job.execution_id)}</span>
          <button
            type="button"
            className="rounded p-1 hover:bg-surface-active"
            aria-label={localize('com_nanobase_operation_action_copy_id')}
            onClick={() => copyId(job.execution_id)}
          >
            <Copy className="icon-xs" />
          </button>
        </div>
        <p>
          {localize('com_nanobase_operation_label_created_at')}: {formatDateTime(job.created_at)}
        </p>
        <p>
          {localize('com_nanobase_operation_label_updated_at')}: {formatDateTime(job.updated_at)}
        </p>
      </div>
    </div>
  );
}
