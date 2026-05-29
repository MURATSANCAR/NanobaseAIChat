import type { PartnerSurface } from '~/components/Branding';
import { PartnerLogoRow } from '~/components/Branding/logos';
import { cn } from '~/utils';
import useBrandLocalize from '~/components/Branding/brand';

function PartnerTrustBlock({
  className,
  logoVariant = 'brand',
  surface = 'dark',
}: {
  className?: string;
  logoVariant?: 'brand' | 'mono';
  surface?: PartnerSurface;
}) {
  const brandLocalize = useBrandLocalize();

  return (
    <section
      className={cn('border-t border-white/10 pt-6', className)}
      aria-label={brandLocalize('com_ui_partner_footer_aria')}
    >
      <p className="text-center text-[11px] font-medium leading-snug tracking-wide text-slate-500 dark:text-slate-400">
        {brandLocalize('com_ui_partner_silicon_valley')}
      </p>
      <p className="mt-1.5 text-center text-[10px] font-medium tracking-wide text-slate-400 dark:text-slate-500 sm:text-xs">
        {brandLocalize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant={logoVariant} surface={surface} className="mt-5" />
    </section>
  );
}

function AuthPartnerCard({ className }: { className?: string }) {
  const brandLocalize = useBrandLocalize();

  return (
    <section
      className={cn(
        'auth-partner-banner w-full overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/12 via-sky-500/8 to-orange-600/5 px-5 py-3 shadow-xl backdrop-blur-md lg:hidden',
        className,
      )}
      aria-label={brandLocalize('com_ui_partner_footer_aria')}
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-sky-500 dark:text-sky-400">
        {brandLocalize('com_ui_partner_silicon_valley')}
      </p>
      <p className="mt-2 text-center text-sm font-semibold text-gray-800 dark:text-white">
        {brandLocalize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant="brand" surface="light" className="mt-3" />
    </section>
  );
}

function AuthHeroPartners() {
  return (
    <PartnerTrustBlock
      className="relative z-10 mt-auto w-full max-w-lg border-white/10 [&_p]:text-slate-400"
      logoVariant="brand"
      surface="dark"
    />
  );
}

export { AuthPartnerCard, AuthHeroPartners };
