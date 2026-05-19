export type OperationRisk = 'low' | 'medium' | 'high' | 'critical';

export type OperationToolState = 'success' | 'failed' | 'waiting_credentials' | 'skipped';

export type OperationJobStatus =
  | 'completed'
  | 'running'
  | 'queued'
  | 'waiting_approval'
  | 'waiting_credentials'
  | 'completed_with_adapter_errors'
  | 'failed'
  | string;

export type OperationMessageRequest = {
  workspace_id?: string;
  user_id?: string;
  conversation_id?: string;
  message: string;
  risk?: OperationRisk;
  requires_approval?: boolean;
  requested_tools?: string[];
};

export type OperationRuntimeToolResult = {
  tool: string;
  state: OperationToolState;
  ok: boolean;
  ms?: number;
  payload?: Record<string, string | number | boolean | null>;
  error?: string;
  created_at?: string;
};

export type OperationRuntimeResult = {
  tool_count: number;
  success_count?: number;
  waiting_credentials_count?: number;
  skipped_count?: number;
  failed_count: number;
  results?: OperationRuntimeToolResult[];
};

export type OperationArtifact = {
  artifact_id: string;
  job_id: string;
  execution_id: string;
  name: string;
  filename: string;
  media_type: string;
  size: number;
  created_at: string;
};

export type OperationMessageResponse = {
  ok: boolean;
  binding: string;
  routed_to_job: boolean;
  message: string;
  job_id: string;
  execution_id: string;
  status: OperationJobStatus;
  job_url: string;
  audit_url: string;
  artifact_ids: string[];
  artifacts: OperationArtifact[];
  runtime_result: OperationRuntimeResult;
  requested_tools: string[];
  llm_used: false;
  runtime_adapters: true;
};

export type OperationJob = {
  ok: boolean;
  job_id: string;
  execution_id: string;
  workspace_id?: string;
  user_id?: string;
  conversation_id?: string;
  status: OperationJobStatus;
  message: string;
  dsl?: Record<string, string | number | boolean | null>;
  runtime_result: OperationRuntimeResult;
  artifacts: OperationArtifact[];
  artifact_ids: string[];
  audit_url?: string;
  job_url?: string;
  created_at: string;
  updated_at: string;
  llm_used: false;
  runtime_adapters: true;
};

export type OperationAuditEvent = {
  ts: string;
  event_type: string;
  payload: Record<string, string | number | boolean | null>;
  llm_used: false;
};

export type OperationAuditResponse = {
  ok: boolean;
  execution_id: string;
  event_count: number;
  events: OperationAuditEvent[];
};

export type OperationArtifactMetadata = {
  artifact_id: string;
  job_id: string;
  execution_id: string;
  name: string;
  filename: string;
  media_type: string;
  size: number;
  created_at: string;
};

export type OperationHealthResponse = {
  ok: boolean;
  service: string;
  binding: string;
  runtime_adapters: boolean;
  llm_execution_allowed: boolean;
  ts: string;
};

export type OperationProxyError = {
  ok: false;
  source: 'nanobase-operation-proxy';
  error: string;
};
