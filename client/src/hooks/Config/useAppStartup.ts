import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';
import { installCloudFrontImageRetry } from '@librechat/client';
import {
  getTokenHeader,
  LocalStorageKeys,
  PermissionTypes,
  Permissions,
} from 'librechat-data-provider';
import type { TStartupConfig, TUser } from 'librechat-data-provider';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { useMCPToolsQuery, useMCPServersQuery, useGetEndpointsQuery } from '~/data-provider';
import { getModelSpecPreset, resolveNanobaseDefaultModelSpec } from '~/utils';
import { cleanupTimestampedStorage } from '~/utils/timestamps';
import useSpeechSettingsInit from './useSpeechSettingsInit';
import { useHasAccess } from '~/hooks';
import store from '~/store';

export default function useAppStartup({
  startupConfig,
  user,
}: {
  startupConfig?: TStartupConfig;
  user?: TUser;
}) {
  const [defaultPreset, setDefaultPreset] = useRecoilState(store.defaultPreset);
  const { data: endpointsConfig } = useGetEndpointsQuery({ enabled: !!user });
  const { data: modelsConfig } = useGetModelsQuery({ enabled: !!user });
  const canUseMcp = useHasAccess({
    permissionType: PermissionTypes.MCP_SERVERS,
    permission: Permissions.USE,
  });

  useSpeechSettingsInit(!!user);
  const { data: loadedServers, isLoading: serversLoading } = useMCPServersQuery({
    enabled: canUseMcp,
  });

  useMCPToolsQuery({
    enabled:
      canUseMcp &&
      !serversLoading &&
      !!loadedServers &&
      Object.keys(loadedServers).length > 0 &&
      !!user,
  });

  /** Clean up old localStorage entries on startup */
  useEffect(() => {
    cleanupTimestampedStorage();
  }, []);

  /** Set the app title */
  useEffect(() => {
    const appTitle = startupConfig?.appTitle ?? '';
    if (!appTitle) {
      return;
    }
    document.title = appTitle;
    localStorage.setItem(LocalStorageKeys.APP_TITLE, appTitle);
  }, [startupConfig]);

  /** Set NanobaseAI as the default model preset */
  useEffect(() => {
    if (defaultPreset?.spec != null) {
      return;
    }

    if (!endpointsConfig) {
      return;
    }

    const defaultSpec = resolveNanobaseDefaultModelSpec(
      startupConfig,
      endpointsConfig,
      modelsConfig,
    );

    if (!defaultSpec) {
      return;
    }

    const preset = getModelSpecPreset(defaultSpec);
    if (!preset) {
      return;
    }

    setDefaultPreset(preset);
  }, [
    defaultPreset?.spec,
    endpointsConfig,
    modelsConfig,
    setDefaultPreset,
    startupConfig,
  ]);

  useEffect(() => {
    return installCloudFrontImageRetry(startupConfig, { getAuthorizationHeader: getTokenHeader });
  }, [startupConfig]);

  useEffect(() => {
    if (startupConfig?.analyticsGtmId != null && typeof window.google_tag_manager === 'undefined') {
      const tagManagerArgs = {
        gtmId: startupConfig.analyticsGtmId,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, [startupConfig?.analyticsGtmId]);
}
