import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import { GoogleLogo, MicrosoftLogo, NvidiaLogo } from './logos';

function PartnerSupportFooter({ className }: { className?: string }) {
  const localize = useLocalize();

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 border-t border-white/5 px-2 py-3 text-center',
        className,
      )}
      role="complementary"
      aria-label={localize('com_ui_partner_footer_aria')}
    >
      <p className="text-[11px] font-medium tracking-wide text-text-secondary sm:text-xs">
        {localize('com_ui_partner_silicon_valley')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5">
        <span className="text-[10px] text-text-tertiary sm:text-xs">
          {localize('com_ui_partner_supported_by')}
        </span>
        <div className="flex items-center gap-2.5">
          <NvidiaLogo className="h-3.5 w-auto sm:h-4" title="NVIDIA" />
          <MicrosoftLogo className="h-3.5 w-3.5 sm:h-4 sm:w-4" title="Microsoft" />
          <GoogleLogo className="h-3.5 w-3.5 sm:h-4 sm:w-4" title="Google" />
        </div>
      </div>
    </div>
  );
}

export default PartnerSupportFooter;
