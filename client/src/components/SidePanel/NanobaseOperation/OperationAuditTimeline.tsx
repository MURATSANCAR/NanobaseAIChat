import type { OperationAuditEvent } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { formatDateTime, getAuditEventLabel } from '~/utils/operationDisplay';

export default function OperationAuditTimeline({ events }: { events: OperationAuditEvent[] }) {
  const localize = useLocalize();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">
        {localize('com_nanobase_operation_audit_title')}
      </h3>
      <ol className="relative space-y-3 border-l border-border-medium pl-4">
        {events.map((event, index) => (
          <li key={`${event.ts}-${event.event_type}-${index}`} className="relative">
            <span className="absolute -left-[1.3rem] top-1.5 h-2 w-2 rounded-full bg-border-heavy" />
            <p className="text-sm font-medium text-text-primary">
              {getAuditEventLabel(event.event_type, event.payload, localize)}
            </p>
            <p className="text-xs text-text-secondary">{formatDateTime(event.ts)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
