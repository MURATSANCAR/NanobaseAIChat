import { cn } from '~/utils';
import useBrandLocalize from './brand';
import { PartnerLogoRow } from './logos';

function PartnerSupportFooter({ className }: { className?: string }) {
  const brandLocalize = useBrandLocalize();

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 border-t border-white/5 px-3 py-3 text-center',
        className,
      )}
      role="complementary"
      aria-label={brandLocalize('com_ui_partner_footer_aria')}
    >
      <p className="text-[11px] font-medium leading-snug text-slate-200 sm:text-xs">
        {brandLocalize('com_ui_partner_silicon_valley')}
      </p>
      <p className="text-[10px] font-medium tracking-wide text-slate-400 sm:text-xs">
        {brandLocalize('com_ui_partner_supported_by')}
      </p>
      <PartnerLogoRow variant="mono" className="mt-2" />
    </div>
  );
}

export default PartnerSupportFooter;
