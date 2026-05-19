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
      <p className="text-[10px] font-medium tracking-wide text-text-tertiary sm:text-xs">
        {localize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant="mono" className="mt-2" />
    </div>
  );
}

export default PartnerSupportFooter;
