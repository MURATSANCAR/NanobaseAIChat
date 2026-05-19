import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import { PartnerLogoRow } from './logos';

function PartnerSupportFooter({ className }: { className?: string }) {
  const localize = useLocalize();

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 border-t border-white/5 px-3 py-3 text-center',
        className,
      )}
      role="complementary"
      aria-label={localize('com_ui_partner_footer_aria')}
    >
      <p className="text-[11px] font-medium leading-snug text-text-secondary sm:text-xs">
        {localize('com_ui_partner_silicon_valley')}
      </p>
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
        {localize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant="mono" className="mt-1 gap-5 text-text-tertiary sm:gap-6" />
    </div>
  );
}

export default PartnerSupportFooter;
