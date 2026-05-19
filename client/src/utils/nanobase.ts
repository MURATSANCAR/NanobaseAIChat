import { DEFAULT_APP_TITLE } from 'librechat-data-provider';
import type {
  TEndpointsConfig,
  TModelSpec,
  TModelsConfig,
  TStartupConfig,
} from 'librechat-data-provider';
import getDefaultEndpoint from './getDefaultEndpoint';

export const NANOBASE_MODEL_SPEC_NAME = 'nanobaseai';
export const NANOBASE_MODEL_LABEL = DEFAULT_APP_TITLE;

export function findConfiguredNanobaseSpec(
  startupConfig?: TStartupConfig,
): TModelSpec | undefined {
  const list = startupConfig?.modelSpecs?.list;
  if (!list?.length) {
    return undefined;
  }

  return (
    list.find((spec) => spec.name === NANOBASE_MODEL_SPEC_NAME) ??
    list.find((spec) => spec.label === NANOBASE_MODEL_LABEL) ??
    list.find((spec) => spec.default === true)
  );
}

export function buildNanobaseModelSpec(
  endpointsConfig: TEndpointsConfig,
  modelsConfig?: TModelsConfig,
): TModelSpec | undefined {
  const endpoint = getDefaultEndpoint({ convoSetup: {}, endpointsConfig });
  if (!endpoint) {
    return undefined;
  }

  const models = modelsConfig?.[endpoint] ?? [];
  const model = models[0] ?? '';

  return {
    name: NANOBASE_MODEL_SPEC_NAME,
    label: NANOBASE_MODEL_LABEL,
    default: true,
    preset: {
      endpoint,
      model,
      modelLabel: NANOBASE_MODEL_LABEL,
    },
  };
}

export function resolveNanobaseDefaultModelSpec(
  startupConfig: TStartupConfig | undefined,
  endpointsConfig: TEndpointsConfig,
  modelsConfig?: TModelsConfig,
): TModelSpec | undefined {
  return (
    findConfiguredNanobaseSpec(startupConfig) ??
    buildNanobaseModelSpec(endpointsConfig, modelsConfig)
  );
}
