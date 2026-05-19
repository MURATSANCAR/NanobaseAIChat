import type { Response } from 'express';

export type OperationProxyErrorBody = {
  ok: false;
  source: 'nanobase-operation-proxy';
  error: string;
};

export type ProxyJsonResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; status: number; body: OperationProxyErrorBody };

export type ProxyStreamResult =
  | { ok: true; status: number; headers: Record<string, string | string[] | undefined>; stream: NodeJS.ReadableStream }
  | { ok: false; status: number; body: OperationProxyErrorBody };

export type ExpressResponse = Response;
