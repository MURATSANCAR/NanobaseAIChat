import { useCallback } from 'react';
import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type { TranslationKeys } from '~/hooks';

const AUTH_BRAND_LANG = 'en';

/** Brand slogans on login/register always render in English. */
function useAuthBrandLocalize() {
  const { t } = useTranslation();

  return useCallback(
    (phraseKey: TranslationKeys, options?: TOptions) =>
      t(phraseKey, { ...options, lng: AUTH_BRAND_LANG }),
    [t],
  );
}

export default useAuthBrandLocalize;
