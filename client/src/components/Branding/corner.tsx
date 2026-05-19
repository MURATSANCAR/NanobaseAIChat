import { cn } from '~/utils';
import useBrandLocalize from './brand';
import { NvidiaLogo } from './logos';

function PartnerCornerBadge({ className }: { className?: string }) {
  const brandLocalize = useBrandLocalize();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-2 top-2 z-[15] flex max-w-[min(100%,220px)] items-center gap-2 rounded-xl border border-orange-500/20 bg-[rgba(21,34,56,0.85)] px-2.5 py-1.5 shadow-lg backdrop-blur-md sm:left-3 sm:top-3',
        className,
      )}
      role="note"
      aria-label={brandLocalize('com_ui_partner_nvidia_corner')}
    >
      <NvidiaLogo className="h-4 w-auto shrink-0 sm:h-5" />
      <span className="text-[10px] font-medium leading-tight text-text-secondary sm:text-xs">
        {brandLocalize('com_ui_partner_nvidia_corner')}
      </span>
    </div>
  );
}

export default PartnerCornerBadge;
