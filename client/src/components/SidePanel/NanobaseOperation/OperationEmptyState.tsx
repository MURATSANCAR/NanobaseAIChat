import { Workflow } from 'lucide-react';
import { useLocalize } from '~/hooks';

export default function OperationEmptyState() {
  const localize = useLocalize();

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <Workflow className="icon-xl text-text-secondary" aria-hidden="true" />
      <p className="text-sm font-medium text-text-primary">
        {localize('com_nanobase_operation_empty_title')}
      </p>
      <p className="text-xs text-text-secondary">
        {localize('com_nanobase_operation_empty_description')}
      </p>
    </div>
  );
}
