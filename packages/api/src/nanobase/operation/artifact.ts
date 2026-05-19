import type { Response } from 'express';
import { createAxiosInstance, logAxiosError } from '~/utils/axios';
import { buildNanobaseOperationUrl, getNanobaseOperationBaseUrl } from './url';
import {
  createConfigErrorBody,
  createUnavailableErrorBody,
} from './proxy';
import type { OperationProxyErrorBody } from './types';

const REQUEST_TIMEOUT_MS = 120_000;
const axios = createAxiosInstance();

export async function proxyOperationArtifactStream(
  artifactId: string,
  res: Response,
): Promise<void> {
  try {
    getNanobaseOperationBaseUrl();
  } catch {
    res.status(503).json(createConfigErrorBody());
    return;
  }

  const url = buildNanobaseOperationUrl(`/api/v1/operation-center/artifacts/${artifactId}`);

  try {
    const upstream = await axios.get(url, {
      responseType: 'stream',
      timeout: REQUEST_TIMEOUT_MS,
      validateStatus: () => true,
    });

    if (upstream.status >= 400) {
      let errorBody: OperationProxyErrorBody = createUnavailableErrorBody();
      const chunks: Buffer[] = [];
      for await (const chunk of upstream.data) {
        chunks.push(Buffer.from(chunk));
      }
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8')) as OperationProxyErrorBody;
        if (parsed?.error) {
          errorBody = { ok: false, source: 'nanobase-operation-proxy', error: parsed.error };
        }
      } catch {
        /* use default */
      }
      res.status(upstream.status).json(errorBody);
      return;
    }

    const contentType = upstream.headers['content-type'];
    const contentDisposition = upstream.headers['content-disposition'];

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    if (contentDisposition) {
      res.setHeader('Content-Disposition', contentDisposition);
    }

    res.status(upstream.status);
    upstream.data.pipe(res);
  } catch (error) {
    logAxiosError({
      message: '[nanobase-operation-proxy] artifact stream failed',
      error,
    });
    res.status(502).json(createUnavailableErrorBody());
  }
}
