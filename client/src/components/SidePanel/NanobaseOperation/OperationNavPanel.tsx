import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useLocalize } from '~/hooks';
import { useOperationHealthQuery } from '~/data-provider/Operation';
import store from '~/store';
import OperationEmptyState from './OperationEmptyState';
import OperationStatusBadge from './OperationStatusBadge';

export default function OperationNavPanel() {
  const localize = useLocalize();
  const jobId = useRecoilValue(store.activeOperationJobId);
  const setPanelOpen = useSetRecoilState(store.operationPanelOpen);
  const healthQuery = useOperationHealthQuery(true);

  useEffect(() => {
    if (jobId) {
      setPanelOpen(true);
    }
  }, [jobId, setPanelOpen]);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h2 className="text-sm font-semibold text-text-primary">
          {localize('com_nanobase_operation_panel_title')}
        </h2>
        <p className="text-xs text-text-secondary">
          {localize('com_nanobase_operation_panel_subtitle')}
        </p>
      </div>

      {healthQuery.isSuccess && healthQuery.data?.ok && (
        <div className="flex flex-wrap gap-2">
          <OperationStatusBadge
            label={localize('com_nanobase_operation_health_active')}
            tone="success"
          />
        </div>
      )}

      {jobId ? (
        <button
          type="button"
          className="rounded-lg bg-surface-active px-3 py-2 text-sm font-medium text-text-primary hover:bg-surface-active-alt"
          onClick={() => setPanelOpen(true)}
        >
          {localize('com_nanobase_operation_status_card')}
        </button>
      ) : (
        <OperationEmptyState />
      )}
    </div>
  );
}
