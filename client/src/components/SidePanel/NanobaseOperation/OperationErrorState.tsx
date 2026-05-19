import { useLocalize } from '~/hooks';

export default function OperationErrorState({ message }: { message: string }) {
  const localize = useLocalize();

  return (
    <div
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400"
      role="alert"
    >
      <p className="font-medium">{localize('com_nanobase_operation_error_generic')}</p>
      <p className="mt-1 text-xs">{message}</p>
    </div>
  );
}
