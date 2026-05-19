import { useLocalize } from '~/hooks';
import { PartnerLogoRow } from '~/components/Branding/logos';
import { cn } from '~/utils';

function PartnerTrustBlock({
  className,
  logoVariant = 'brand',
}: {
  className?: string;
  logoVariant?: 'brand' | 'mono';
}) {
  const localize = useLocalize();

  return (
    <section
      className={cn('border-t border-white/10 pt-6', className)}
      aria-label={localize('com_ui_partner_footer_aria')}
    >
      <p className="text-center text-[11px] font-medium leading-snug tracking-wide text-slate-500 dark:text-slate-400">
        {localize('com_ui_partner_silicon_valley')}
      </p>
      <p className="mt-1.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        {localize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant={logoVariant} className="mt-5" />
    </section>
  );
}

function AuthPartnerBanner({ className }: { className?: string }) {
  return (
    <PartnerTrustBlock
      className={cn('mt-8 lg:hidden', className)}
      logoVariant="brand"
    />
  );
}

function AuthHeroPartners() {
  return (
    <PartnerTrustBlock
      className="relative z-10 mt-auto w-full max-w-lg border-white/10 [&_p]:text-slate-400"
      logoVariant="brand"
    />
  );
}

export { AuthPartnerBanner, AuthHeroPartners };
