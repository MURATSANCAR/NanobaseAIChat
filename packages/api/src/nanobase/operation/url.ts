export function getNanobaseOperationBaseUrl(): string {
  const baseUrl = process.env.NANOBASE_OPERATION_BASE_URL;

  if (!baseUrl || !baseUrl.trim()) {
    throw new Error('NANOBASE_OPERATION_BASE_URL is not configured');
  }

  return baseUrl.replace(/\/+$/, '');
}

export function buildNanobaseOperationUrl(path: string): string {
  const baseUrl = getNanobaseOperationBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
