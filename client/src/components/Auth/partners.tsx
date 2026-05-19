import { useLocalize } from '~/hooks';
import { GoogleLogo, MicrosoftLogo, NvidiaLogo } from '~/components/Branding/logos';
import { cn } from '~/utils';

const partnerItems = [
  { Logo: NvidiaLogo, label: 'NVIDIA', accent: 'from-[#76B900]/20 to-transparent' },
  { Logo: MicrosoftLogo, label: 'Microsoft', accent: 'from-[#00A4EF]/15 to-transparent' },
  { Logo: GoogleLogo, label: 'Google', accent: 'from-[#4285F4]/15 to-transparent' },
] as const;

function AuthPartnerBanner({ className }: { className?: string }) {
  const localize = useLocalize();

  return (
    <section
      className={cn(
        'auth-partner-banner relative mt-6 overflow-hidden rounded-2xl border border-white/15',
        'bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-indigo-500/5',
        'px-4 py-4 shadow-lg shadow-sky-950/20 backdrop-blur-md',
        'dark:from-sky-500/15 dark:via-violet-500/15 dark:to-indigo-500/10',
        'lg:hidden',
        className,
      )}
      aria-label={localize('com_ui_partner_footer_aria')}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] auth-partner-shine" />
      <p className="relative text-center text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500 dark:text-sky-400">
        {localize('com_ui_partner_silicon_valley')}
      </p>
      <p className="relative mt-2 text-center text-sm font-semibold text-gray-800 dark:text-white">
        {localize('com_ui_partner_supported_by')}
      </p>
      <div className="relative mt-4 flex items-stretch justify-center gap-2 sm:gap-3">
        {partnerItems.map(({ Logo, label, accent }) => (
          <div
            key={label}
            className={cn(
              'flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/10',
              'bg-gradient-to-b px-2 py-3',
              accent,
              'transition-transform duration-200 hover:scale-[1.03]',
            )}
          >
            <Logo
              className={cn(
                label === 'NVIDIA' ? 'h-5 w-auto sm:h-6' : 'h-6 w-6 sm:h-7 sm:w-7',
              )}
              title={label}
            />
            <span className="text-[9px] font-medium uppercase tracking-wide text-gray-500 dark:text-slate-400">
              {label}
            </span>
          </div>
        ))}
      </div>
      <p className="relative mt-3 flex items-center justify-center gap-2 text-center text-xs font-medium text-sky-600 dark:text-sky-300">
        <NvidiaLogo className="h-3.5 w-auto" title="NVIDIA" />
        {localize('com_ui_partner_nvidia_corner')}
      </p>
    </section>
  );
}

function AuthHeroPartners() {
  const localize = useLocalize();

  return (
    <div
      className="relative z-10 mt-auto w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
      aria-label={localize('com_ui_partner_footer_aria')}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
        {localize('com_ui_partner_silicon_valley')}
      </p>
      <p className="mt-2 text-base font-semibold text-white">
        {localize('com_ui_partner_supported_by')}
      </p>
      <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-black/20 px-4 py-4">
        <NvidiaLogo className="h-6 w-auto" title="NVIDIA" />
        <MicrosoftLogo className="h-7 w-7" title="Microsoft" />
        <GoogleLogo className="h-7 w-7" title="Google" />
      </div>
      <p className="mt-4 text-sm text-slate-400">{localize('com_ui_partner_nvidia_corner')}</p>
    </div>
  );
}

export { AuthPartnerBanner, AuthHeroPartners };
