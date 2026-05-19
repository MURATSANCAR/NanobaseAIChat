import type {
  OperationAuditEvent,
  OperationJobStatus,
  OperationMessageResponse,
  OperationToolState,
} from 'librechat-data-provider';
import type { LocalizeFunction } from '~/common';

const TOOL_DISPLAY_KEYS: Record<string, string> = {
  'http.request': 'com_nanobase_operation_tool_http_request',
  'filesystem.write': 'com_nanobase_operation_tool_filesystem_write',
  'filesystem.read': 'com_nanobase_operation_tool_filesystem_read',
  'filesystem.search': 'com_nanobase_operation_tool_filesystem_search',
  'excel.create': 'com_nanobase_operation_tool_excel_create',
  'pdf.create': 'com_nanobase_operation_tool_pdf_create',
  'pptx.create': 'com_nanobase_operation_tool_pptx_create',
  'smtp.send': 'com_nanobase_operation_tool_smtp_send',
  'imap.read': 'com_nanobase_operation_tool_imap_read',
  'sqlite.query': 'com_nanobase_operation_tool_sqlite_query',
  'postgres.query': 'com_nanobase_operation_tool_postgres_query',
  'mysql.query': 'com_nanobase_operation_tool_mysql_query',
  'mssql.query': 'com_nanobase_operation_tool_mssql_query',
  'oracle.query': 'com_nanobase_operation_tool_oracle_query',
  'elasticsearch.search': 'com_nanobase_operation_tool_elasticsearch_search',
  'opensearch.search': 'com_nanobase_operation_tool_opensearch_search',
  'redis.query': 'com_nanobase_operation_tool_redis_query',
  'mongodb.query': 'com_nanobase_operation_tool_mongodb_query',
  'clickhouse.query': 'com_nanobase_operation_tool_clickhouse_query',
  'qdrant.search': 'com_nanobase_operation_tool_qdrant_search',
  'ssh.exec': 'com_nanobase_operation_tool_ssh_exec',
  'ssh.upload': 'com_nanobase_operation_tool_ssh_upload',
  'ssh.download': 'com_nanobase_operation_tool_ssh_download',
  'sftp.upload': 'com_nanobase_operation_tool_sftp_upload',
  'sftp.download': 'com_nanobase_operation_tool_sftp_download',
  'docker.logs.read': 'com_nanobase_operation_tool_docker_logs_read',
  'docker.container.inspect': 'com_nanobase_operation_tool_docker_container_inspect',
  'systemd.status': 'com_nanobase_operation_tool_systemd_status',
  'nginx.configtest': 'com_nanobase_operation_tool_nginx_configtest',
  'git.clone': 'com_nanobase_operation_tool_git_clone',
  'git.commit': 'com_nanobase_operation_tool_git_commit',
  'log.search': 'com_nanobase_operation_tool_log_search',
  'log.analyze': 'com_nanobase_operation_tool_log_analyze',
  'policy.evaluate': 'com_nanobase_operation_tool_policy_evaluate',
  'approval.request': 'com_nanobase_operation_tool_approval_request',
  'approval.wait': 'com_nanobase_operation_tool_approval_wait',
  'schedule.create': 'com_nanobase_operation_tool_schedule_create',
  'credential.resolve': 'com_nanobase_operation_tool_credential_resolve',
  'audit.append': 'com_nanobase_operation_tool_audit_append',
  'timeout.enforce': 'com_nanobase_operation_tool_timeout_enforce',
  'retry.execute': 'com_nanobase_operation_tool_retry_execute',
  'rollback.execute': 'com_nanobase_operation_tool_rollback_execute',
  'idempotency.check': 'com_nanobase_operation_tool_idempotency_check',
  'artifact.package': 'com_nanobase_operation_tool_artifact_package',
};

const AUDIT_EVENT_KEYS: Record<string, string> = {
  'job.received': 'com_nanobase_operation_audit_job_received',
  'dsl.generated': 'com_nanobase_operation_audit_dsl_generated',
  'policy.evaluated': 'com_nanobase_operation_audit_policy_evaluated',
  'credential.resolved': 'com_nanobase_operation_audit_credential_resolved',
  'adapter.executed': 'com_nanobase_operation_audit_adapter_executed',
  'runtime.completed': 'com_nanobase_operation_audit_runtime_completed',
  'job.completed': 'com_nanobase_operation_audit_job_completed',
};

const STATUS_KEYS: Record<string, string> = {
  completed: 'com_nanobase_operation_status_completed',
  running: 'com_nanobase_operation_status_running',
  queued: 'com_nanobase_operation_status_queued',
  waiting_approval: 'com_nanobase_operation_status_waiting_approval',
  waiting_credentials: 'com_nanobase_operation_status_waiting_credentials',
  completed_with_adapter_errors: 'com_nanobase_operation_status_completed_with_errors',
  failed: 'com_nanobase_operation_status_failed',
};

const STATE_KEYS: Record<OperationToolState, string> = {
  success: 'com_nanobase_operation_state_success',
  failed: 'com_nanobase_operation_state_failed',
  waiting_credentials: 'com_nanobase_operation_state_waiting_credentials',
  skipped: 'com_nanobase_operation_state_skipped',
};

export type OperationStatusTone = 'success' | 'warning' | 'error' | 'neutral' | 'info';

export function formatShortId(id: string | undefined | null): string {
  if (!id) {
    return '-';
  }
  if (id.length <= 18) {
    return id;
  }
  return `${id.slice(0, 10)}…${id.slice(-4)}`;
}

export function formatFileSize(bytes: number | undefined | null): string {
  if (bytes == null || Number.isNaN(bytes)) {
    return '-';
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function formatDateTime(ts: string | undefined | null, locale = 'tr-TR'): string {
  if (!ts) {
    return '-';
  }
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatDuration(ms: number | undefined | null): string {
  if (ms == null || Number.isNaN(ms)) {
    return '-';
  }
  if (ms < 1000) {
    return `${Math.round(ms)} ms`;
  }
  if (ms < 60_000) {
    return `${(ms / 1000).toFixed(1)} sn`;
  }
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.round((ms % 60_000) / 1000);
  return `${minutes} dk ${seconds} sn`;
}

export function getOperationStatusLabel(
  status: OperationJobStatus | undefined,
  localize: LocalizeFunction,
): string {
  if (!status) {
    return localize('com_nanobase_operation_status_unknown' as Parameters<LocalizeFunction>[0]);
  }
  const key = STATUS_KEYS[status];
  if (key) {
    return localize(key as Parameters<LocalizeFunction>[0]);
  }
  return localize('com_nanobase_operation_status_unknown' as Parameters<LocalizeFunction>[0]);
}

export function getOperationStatusTone(status: OperationJobStatus | undefined): OperationStatusTone {
  switch (status) {
    case 'completed':
      return 'success';
    case 'running':
    case 'queued':
      return 'info';
    case 'waiting_approval':
    case 'waiting_credentials':
    case 'completed_with_adapter_errors':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'neutral';
  }
}

export function getToolDisplayName(tool: string, localize: LocalizeFunction): string {
  const key = TOOL_DISPLAY_KEYS[tool];
  if (key) {
    return localize(key as Parameters<LocalizeFunction>[0]);
  }
  return tool.replace(/\./g, ' ').replace(/_/g, ' ');
}

export function getToolStateLabel(
  state: OperationToolState,
  localize: LocalizeFunction,
): string {
  const key = STATE_KEYS[state];
  return localize(key as Parameters<LocalizeFunction>[0]);
}

export function getToolStateTone(state: OperationToolState): OperationStatusTone {
  switch (state) {
    case 'success':
      return 'success';
    case 'failed':
      return 'error';
    case 'waiting_credentials':
      return 'warning';
    case 'skipped':
      return 'neutral';
    default:
      return 'neutral';
  }
}

export function getAuditEventLabel(
  eventType: string,
  payload: Record<string, string | number | boolean | null> | undefined,
  localize: LocalizeFunction,
): string {
  const key = AUDIT_EVENT_KEYS[eventType];
  if (eventType === 'adapter.executed' && payload?.tool && typeof payload.tool === 'string') {
    return getToolDisplayName(payload.tool, localize);
  }
  if (key) {
    return localize(key as Parameters<LocalizeFunction>[0]);
  }
  return eventType.replace(/\./g, ' ');
}

export function sanitizeOperationPayload(
  payload: Record<string, string | number | boolean | null> | undefined,
  maxEntries = 6,
): Array<{ key: string; value: string }> {
  if (!payload) {
    return [];
  }
  const hiddenKeys = new Set(['password', 'token', 'secret', 'key', 'credential', 'path']);
  const entries: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(payload)) {
    if (hiddenKeys.has(key.toLowerCase())) {
      continue;
    }
    if (value == null) {
      continue;
    }
    const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    entries.push({
      key,
      value: str.length > 120 ? `${str.slice(0, 120)}…` : str,
    });
    if (entries.length >= maxEntries) {
      break;
    }
  }
  return entries;
}

export function mapProxyErrorToUserMessage(
  error: string | undefined,
  localize: LocalizeFunction,
): string {
  if (!error) {
    return localize('com_nanobase_operation_error_generic' as Parameters<LocalizeFunction>[0]);
  }
  if (error.includes('NANOBASE_OPERATION_BASE_URL')) {
    return localize('com_nanobase_operation_error_not_configured' as Parameters<LocalizeFunction>[0]);
  }
  if (error.includes('unavailable') || error.includes('Unavailable')) {
    return localize('com_nanobase_operation_error_unavailable' as Parameters<LocalizeFunction>[0]);
  }
  if (error.includes('not found') || error.includes('Not Found')) {
    return localize('com_nanobase_operation_error_job_not_found' as Parameters<LocalizeFunction>[0]);
  }
  return localize('com_nanobase_operation_error_generic' as Parameters<LocalizeFunction>[0]);
}

const TERMINAL_STATUSES = new Set([
  'completed',
  'failed',
  'completed_with_adapter_errors',
]);

export function isOperationTerminalStatus(status: OperationJobStatus | undefined): boolean {
  return status != null && TERMINAL_STATUSES.has(status);
}

export function getOperationSummaryMessage(
  response: OperationMessageResponse,
  localize: LocalizeFunction,
): string {
  const status = response.status;
  const runtime = response.runtime_result;
  const failedCount = runtime?.failed_count ?? 0;
  const waitingCount = runtime?.waiting_credentials_count ?? 0;
  const toolCount = runtime?.tool_count ?? 0;
  const artifactCount = response.artifact_ids?.length ?? response.artifacts?.length ?? 0;

  let headline: string;
  if (waitingCount > 0) {
    headline = localize('com_nanobase_operation_summary_waiting_credentials' as Parameters<LocalizeFunction>[0]);
  } else if (failedCount > 0 && isOperationTerminalStatus(status)) {
    headline = localize('com_nanobase_operation_summary_with_failures' as Parameters<LocalizeFunction>[0]);
  } else if (status === 'running' || status === 'queued') {
    headline = localize('com_nanobase_operation_summary_in_progress' as Parameters<LocalizeFunction>[0]);
  } else {
    headline = localize('com_nanobase_operation_summary_completed' as Parameters<LocalizeFunction>[0]);
  }

  const lines = [
    headline,
    '',
    `${localize('com_nanobase_operation_label_job_id' as Parameters<LocalizeFunction>[0])}: ${formatShortId(response.job_id)}`,
    `${localize('com_nanobase_operation_label_status' as Parameters<LocalizeFunction>[0])}: ${getOperationStatusLabel(status, localize)}`,
    `${localize('com_nanobase_operation_label_tool_count' as Parameters<LocalizeFunction>[0])}: ${toolCount}`,
    `${localize('com_nanobase_operation_label_failed_count' as Parameters<LocalizeFunction>[0])}: ${failedCount}`,
    `${localize('com_nanobase_operation_label_artifact_count' as Parameters<LocalizeFunction>[0])}: ${artifactCount}`,
    localize('com_nanobase_operation_summary_audit_ready' as Parameters<LocalizeFunction>[0]),
  ];

  return lines.join('\n');
}

export function getAuditEventFromEvent(event: OperationAuditEvent): {
  label: string;
  timestamp: string;
} {
  return {
    label: event.event_type,
    timestamp: event.ts,
  };
}
