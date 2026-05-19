import { useCallback } from 'react';
import { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type { TranslationKeys } from '~/hooks';

const BRAND_LANG = 'en';

/** Corporate brand copy always renders in English regardless of UI locale. */
function useBrandLocalize() {
  const { t } = useTranslation();

  return useCallback(
    (phraseKey: TranslationKeys, options?: TOptions) =>
      t(phraseKey, { ...options, lng: BRAND_LANG }),
    [t],
  );
}

export default useBrandLocalize;
