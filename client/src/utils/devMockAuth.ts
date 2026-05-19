import { SystemRoles } from 'librechat-data-provider';
import type { TUser } from 'librechat-data-provider';

export const DEV_MOCK_TOKEN = 'dev-mock-token';

export function isDevMockAuthEnabled(): boolean {
  return import.meta.env.DEV && import.meta.env.VITE_DEV_MOCK_AUTH === 'true';
}

export const DEV_MOCK_USER: TUser = {
  id: '000000000000000000000001',
  username: 'devuser',
  email: 'dev@nanobase.local',
  name: 'Dev User',
  avatar: '',
  role: SystemRoles.ADMIN,
  provider: 'local',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
