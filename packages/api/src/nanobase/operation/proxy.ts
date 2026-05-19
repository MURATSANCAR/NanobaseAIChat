import { logger } from '@librechat/data-schemas';
import { createAxiosInstance, logAxiosError } from '~/utils/axios';
import { buildNanobaseOperationUrl, getNanobaseOperationBaseUrl } from './url';
import type { OperationProxyErrorBody, ProxyJsonResult } from './types';

const PROXY_SOURCE = 'nanobase-operation-proxy' as const;
const REQUEST_TIMEOUT_MS = 120_000;

const axios = createAxiosInstance();

export function createConfigErrorBody(): OperationProxyErrorBody {
  return {
    ok: false,
    source: PROXY_SOURCE,
    error: 'NANOBASE_OPERATION_BASE_URL is not configured',
  };
}

export function createUnavailableErrorBody(): OperationProxyErrorBody {
  return {
    ok: false,
    source: PROXY_SOURCE,
    error: 'NanobaseAI Operation Center unavailable',
  };
}

function isConfigError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('NANOBASE_OPERATION_BASE_URL');
}

export async function proxyOperationJson<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST';
    body?: Record<string, string | number | boolean | null | string[] | undefined>;
    stripMetadataPath?: boolean;
  } = {},
): Promise<ProxyJsonResult<T>> {
  try {
    getNanobaseOperationBaseUrl();
  } catch {
    return { ok: false, status: 503, body: createConfigErrorBody() };
  }

  const url = buildNanobaseOperationUrl(path);
  const method = options.method ?? 'GET';

  try {
    const response =
      method === 'POST'
        ? await axios.post<T>(url, options.body ?? {}, { timeout: REQUEST_TIMEOUT_MS })
        : await axios.get<T>(url, { timeout: REQUEST_TIMEOUT_MS });

    let data = response.data;

    if (options.stripMetadataPath && data && typeof data === 'object') {
      const record = data as Record<string, unknown>;
      if ('path' in record) {
        const { path: _path, ...rest } = record;
        data = rest as T;
      }
    }

    return { ok: true, data, status: response.status };
  } catch (error) {
    if (isConfigError(error)) {
      return { ok: false, status: 503, body: createConfigErrorBody() };
    }

    logAxiosError({
      message: '[nanobase-operation-proxy] upstream request failed',
      error,
    });

    const axiosError = error as { response?: { status?: number; data?: OperationProxyErrorBody } };
    const status = axiosError.response?.status ?? 502;
    const upstreamError = axiosError.response?.data?.error;

    return {
      ok: false,
      status: status >= 400 && status < 600 ? status : 502,
      body: {
        ok: false,
        source: PROXY_SOURCE,
        error:
          typeof upstreamError === 'string' && upstreamError.length > 0
            ? upstreamError
            : createUnavailableErrorBody().error,
      },
    };
  }
}

export function sendProxyJsonResponse<T>(
  res: import('express').Response,
  result: ProxyJsonResult<T>,
): void {
  if (!result.ok) {
    res.status(result.status).json(result.body);
    return;
  }
  res.status(result.status).json(result.data);
}

export function logOperationProxyRequest(method: string, path: string): void {
  logger.debug(`[nanobase-operation-proxy] ${method} ${path}`);
}
