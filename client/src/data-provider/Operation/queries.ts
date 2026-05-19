import {
  QueryKeys,
  dataService,
  type OperationArtifactMetadata,
  type OperationAuditResponse,
  type OperationHealthResponse,
  type OperationJob,
  type OperationMessageRequest,
  type OperationMessageResponse,
} from 'librechat-data-provider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export const useOperationHealthQuery = (
  enabled = true,
  config?: UseQueryOptions<OperationHealthResponse>,
) => {
  return useQuery<OperationHealthResponse>({
    queryKey: [QueryKeys.operationHealth],
    queryFn: () => dataService.getOperationHealth(),
    refetchOnWindowFocus: false,
    enabled,
    ...config,
  });
};

export const useOperationJobQuery = (
  jobId: string | null,
  config?: UseQueryOptions<OperationJob>,
) => {
  return useQuery<OperationJob>({
    queryKey: [QueryKeys.operationJob, jobId],
    queryFn: () => dataService.getOperationJob(jobId as string),
    enabled: !!jobId,
    refetchOnWindowFocus: false,
    ...config,
  });
};

export const useOperationAuditQuery = (
  executionId: string | null,
  config?: UseQueryOptions<OperationAuditResponse>,
) => {
  return useQuery<OperationAuditResponse>({
    queryKey: [QueryKeys.operationAudit, executionId],
    queryFn: () => dataService.getOperationAudit(executionId as string),
    enabled: !!executionId,
    refetchOnWindowFocus: false,
    ...config,
  });
};

export const useOperationArtifactMetadataQuery = (
  artifactId: string | null,
  config?: UseQueryOptions<OperationArtifactMetadata>,
) => {
  return useQuery<OperationArtifactMetadata>({
    queryKey: [QueryKeys.operationArtifact, artifactId],
    queryFn: () => dataService.getOperationArtifactMetadata(artifactId as string),
    enabled: !!artifactId,
    refetchOnWindowFocus: false,
    ...config,
  });
};

export const useSendOperationMessageMutation = (
  options?: UseMutationOptions<OperationMessageResponse, Error, OperationMessageRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: OperationMessageRequest) => dataService.sendOperationMessage(payload),
    onSuccess: (data) => {
      if (data.job_id) {
        queryClient.invalidateQueries([QueryKeys.operationJob, data.job_id]);
      }
      if (data.execution_id) {
        queryClient.invalidateQueries([QueryKeys.operationAudit, data.execution_id]);
      }
    },
    ...options,
  });
};
