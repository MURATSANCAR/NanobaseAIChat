import { ThemeSelector } from '@librechat/client';
import { DEFAULT_APP_TITLE, TStartupConfig } from 'librechat-data-provider';
import { ErrorMessage } from '~/components/Auth/ErrorMessage';
import { TranslationKeys, useLocalize } from '~/hooks';
import SocialLoginRender from './SocialLoginRender';
import { BlinkAnimation } from './BlinkAnimation';
import { Banner } from '../Banners';
import Footer from './Footer';
import AuthHero from './hero';
import NeuralBackground from './background';
import { PartnerCornerBadge } from '~/components/Branding';
import { authCardClass, authLinkClass, authPanelClass } from './styles';

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: TranslationKeys | null;
}) {
  const localize = useLocalize();
  const appTitle = startupConfig?.appTitle ?? DEFAULT_APP_TITLE;

  const hasStartupConfigError = startupConfigError !== null && startupConfigError !== undefined;
  const DisplayError = () => {
    if (hasStartupConfigError) {
      return (
        <div className="mx-auto mb-4 w-full">
          <ErrorMessage>{localize('com_auth_error_login_server')}</ErrorMessage>
        </div>
      );
    }
    if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <div className="mx-auto mb-4 w-full">
          <ErrorMessage>
            {localize('com_auth_error_invalid_reset_token')}{' '}
            <a className={`font-semibold ${authLinkClass}`} href="/forgot-password">
              {localize('com_auth_click_here')}
            </a>{' '}
            {localize('com_auth_to_try_again')}
          </ErrorMessage>
        </div>
      );
    }
    if (error != null && error) {
      return (
        <div className="mx-auto mb-4 w-full">
          <ErrorMessage>{localize(error)}</ErrorMessage>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative flex min-h-screen">
      <Banner />
      <AuthHero />

      <div className={authPanelClass}>
        <PartnerCornerBadge className="left-3 top-3" />
        <div className="absolute inset-0 overflow-hidden opacity-40 lg:hidden">
          <NeuralBackground />
        </div>
        <div className="absolute bottom-4 left-4 z-20 md:m-4">
          <ThemeSelector />
        </div>

        <main className="relative z-10 flex flex-grow items-center justify-center px-4 py-10 sm:px-6">
          <div className={authCardClass}>
            <BlinkAnimation active={isFetching}>
              <div className="mb-6 flex flex-col items-center gap-3">
                <img
                  src="assets/logo-icon.svg"
                  className="h-14 w-14 shrink-0"
                  alt={localize('com_ui_logo', { 0: appTitle })}
                />
                <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                  {appTitle}
                </span>
              </div>
            </BlinkAnimation>

            <DisplayError />

            {!hasStartupConfigError && !isFetching && header && (
              <h1
                className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white"
                style={{ userSelect: 'none' }}
              >
                {header}
              </h1>
            )}

            {children}

            {!pathname.includes('2fa') &&
              (pathname.includes('login') || pathname.includes('register')) && (
                <SocialLoginRender startupConfig={startupConfig} />
              )}
          </div>
        </main>

        <Footer startupConfig={startupConfig} />
      </div>
    </div>
  );
}

export default AuthLayout;
