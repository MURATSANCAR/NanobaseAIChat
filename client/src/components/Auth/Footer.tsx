import { useLocalize } from '~/hooks';
import { TStartupConfig } from 'librechat-data-provider';
import { GoogleLogo, MicrosoftLogo, NvidiaLogo } from '~/components/Branding/logos';
import { authLinkClass } from './styles';

function Footer({ startupConfig }: { startupConfig: TStartupConfig | null | undefined }) {
  const localize = useLocalize();
  if (!startupConfig) {
    return null;
  }
  const privacyPolicy = startupConfig.interface?.privacyPolicy;
  const termsOfService = startupConfig.interface?.termsOfService;

  const privacyPolicyRender = privacyPolicy?.externalUrl && (
    <a className={`text-sm ${authLinkClass}`} href={privacyPolicy.externalUrl} rel="noreferrer">
      {localize('com_ui_privacy_policy')}
    </a>
  );

  const termsOfServiceRender = termsOfService?.externalUrl && (
    <a className={`text-sm ${authLinkClass}`} href={termsOfService.externalUrl} rel="noreferrer">
      {localize('com_ui_terms_of_service')}
    </a>
  );

  return (
    <footer className="relative z-10 m-4 flex flex-col items-center gap-4">
      <div
        className="auth-partner-banner w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-indigo-500/5 px-5 py-4 shadow-xl backdrop-blur-md lg:hidden"
        aria-label={localize('com_ui_partner_footer_aria')}
      >
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-sky-500 dark:text-sky-400">
          {localize('com_ui_partner_silicon_valley')}
        </p>
        <p className="mt-2 text-center text-sm font-semibold text-gray-800 dark:text-white">
          {localize('com_ui_partner_supported_by')}
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <NvidiaLogo className="h-6 w-auto" title="NVIDIA" />
          <MicrosoftLogo className="h-7 w-7" title="Microsoft" />
          <GoogleLogo className="h-7 w-7" title="Google" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="contentinfo">
        {privacyPolicyRender}
        {privacyPolicyRender && termsOfServiceRender && (
          <div className="border-r-[1px] border-gray-300 dark:border-gray-600" />
        )}
        {termsOfServiceRender}
      </div>
    </footer>
  );
}

export default Footer;
