import { useState } from 'react';
import { X } from 'lucide-react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocalize } from '~/hooks';
import useOperationPolling from '~/hooks/Operation/useOperationPolling';
import {
  useOperationAuditQuery,
  useOperationHealthQuery,
  useOperationJobQuery,
} from '~/data-provider/Operation';
import { mapProxyErrorToUserMessage } from '~/utils/operationDisplay';
import store from '~/store';
import OperationJobHeader from './OperationJobHeader';
import OperationRuntimeSummary from './OperationRuntimeSummary';
import OperationToolTimeline from './OperationToolTimeline';
import OperationArtifactList from './OperationArtifactList';
import OperationAuditTimeline from './OperationAuditTimeline';
import OperationEmptyState from './OperationEmptyState';
import OperationErrorState from './OperationErrorState';
import OperationCredentialWarning from './OperationCredentialWarning';
import OperationFailedToolWarning from './OperationFailedToolWarning';
import OperationStatusBadge from './OperationStatusBadge';

export default function NanobaseOperationPanel() {
  const localize = useLocalize();
  const jobId = useRecoilValue(store.activeOperationJobId);
  const executionId = useRecoilValue(store.activeOperationExecutionId);
  const panelOpen = useRecoilValue(store.operationPanelOpen);
  const setPanelOpen = useSetRecoilState(store.operationPanelOpen);
  const setActiveJobId = useSetRecoilState(store.activeOperationJobId);
  const setActiveExecutionId = useSetRecoilState(store.activeOperationExecutionId);
  const [showTechnical, setShowTechnical] = useState(false);

  const healthQuery = useOperationHealthQuery(panelOpen);
  const jobQuery = useOperationJobQuery(jobId);
  const auditQuery = useOperationAuditQuery(executionId);

  useOperationPolling(jobId, executionId, panelOpen && !!jobId);

  const handleClose = () => {
    setPanelOpen(false);
    setActiveJobId(null);
    setActiveExecutionId(null);
  };

  if (!panelOpen) {
    return null;
  }

  const job = jobQuery.data;
  const audit = auditQuery.data;
  const toolResults = job?.runtime_result?.results ?? [];
  const artifacts = job?.artifacts ?? [];

  return (
    <div className="flex h-full flex-col bg-presentation text-text-primary">
      <header className="flex items-start justify-between gap-2 border-b border-border-medium px-4 py-3">
        <div>
          <h2 className="text-base font-semibold">
            {localize('com_nanobase_operation_panel_title')}
          </h2>
          <p className="text-xs text-text-secondary">
            {localize('com_nanobase_operation_panel_subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-lg p-1.5 hover:bg-surface-active"
          aria-label={localize('com_nanobase_operation_action_close')}
        >
          <X className="icon-md" />
        </button>
      </header>

      {healthQuery.isSuccess && healthQuery.data?.ok && (
        <div className="flex flex-wrap gap-2 border-b border-border-medium px-4 py-2">
          <OperationStatusBadge
            label={localize('com_nanobase_operation_health_active')}
            tone="success"
          />
          {healthQuery.data.runtime_adapters && (
            <OperationStatusBadge
              label={localize('com_nanobase_operation_health_tools_ready')}
              tone="info"
            />
          )}
          {healthQuery.data.llm_execution_allowed === false && (
            <OperationStatusBadge
              label={localize('com_nanobase_operation_health_safe_mode')}
              tone="neutral"
            />
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!jobId && <OperationEmptyState />}

        {jobQuery.isLoading && (
          <p className="text-sm text-text-secondary">{localize('com_nanobase_operation_loading')}</p>
        )}

        {jobQuery.isError && (
          <OperationErrorState
            message={mapProxyErrorToUserMessage(
              jobQuery.error instanceof Error ? jobQuery.error.message : undefined,
              localize,
            )}
          />
        )}

        {auditQuery.isError && !jobQuery.isError && (
          <OperationErrorState message={localize('com_nanobase_operation_error_audit')} />
        )}

        {job && (
          <div className="space-y-6">
            <OperationJobHeader job={job} />
            <OperationCredentialWarning results={toolResults} />
            <OperationFailedToolWarning results={toolResults} />
            <OperationRuntimeSummary
              runtime={job.runtime_result}
              artifactCount={artifacts.length}
            />
            <OperationToolTimeline results={toolResults} />
            <OperationArtifactList artifacts={artifacts} />
            {audit?.events && <OperationAuditTimeline events={audit.events} />}

            <details
              className="rounded-lg border border-border-light"
              open={showTechnical}
              onToggle={(e) => setShowTechnical((e.target as HTMLDetailsElement).open)}
            >
              <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-text-secondary">
                {localize('com_nanobase_operation_technical_details')}
              </summary>
              <pre className="max-h-48 overflow-auto p-3 text-xs text-text-secondary">
                {JSON.stringify({ job, audit: audit?.events?.length }, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
