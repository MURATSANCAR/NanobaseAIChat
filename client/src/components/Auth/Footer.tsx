import { useLocalize } from '~/hooks';
import { TStartupConfig } from 'librechat-data-provider';
import { PartnerSupportFooter } from '~/components/Branding';
import { authLinkClass } from './styles';

function Footer({ startupConfig }: { startupConfig: TStartupConfig | null | undefined }) {
  const localize = useLocalize();
  if (!startupConfig) {
    return null;
  }
  const privacyPolicy = startupConfig.interface?.privacyPolicy;
  const termsOfService = startupConfig.interface?.termsOfService;

  const privacyPolicyRender = privacyPolicy?.externalUrl && (
    <a
      className={`text-sm ${authLinkClass}`}
      href={privacyPolicy.externalUrl}
      rel="noreferrer"
    >
      {localize('com_ui_privacy_policy')}
    </a>
  );

  const termsOfServiceRender = termsOfService?.externalUrl && (
    <a
      className={`text-sm ${authLinkClass}`}
      href={termsOfService.externalUrl}
      rel="noreferrer"
    >
      {localize('com_ui_terms_of_service')}
    </a>
  );

  return (
    <div className="m-4 flex flex-col items-center gap-3">
      <PartnerSupportFooter className="border-white/10" />
      <div className="flex flex-wrap justify-center gap-2" role="contentinfo">
        {privacyPolicyRender}
        {privacyPolicyRender && termsOfServiceRender && (
          <div className="border-r-[1px] border-gray-300 dark:border-gray-600" />
        )}
        {termsOfServiceRender}
      </div>
    </div>
  );
}

export default Footer;
