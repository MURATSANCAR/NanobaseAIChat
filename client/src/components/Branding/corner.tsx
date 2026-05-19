import { cn } from '~/utils';
import useBrandLocalize from './brand';
import { NvidiaLogo } from './logos';

function PartnerCornerBadge({ className }: { className?: string }) {
  const brandLocalize = useBrandLocalize();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-2 top-2 z-[15] flex max-w-[min(100%,168px)] items-center gap-1.5 rounded-lg border border-orange-500/15 bg-[rgba(21,34,56,0.72)] px-2 py-1 opacity-80 shadow-md backdrop-blur-sm sm:left-3 sm:top-3',
        className,
      )}
      role="note"
      aria-label={brandLocalize('com_ui_partner_nvidia_corner')}
    >
      <NvidiaLogo className="h-3.5 w-auto shrink-0 sm:h-4" />
      <span className="text-[9px] font-medium leading-tight text-slate-300 sm:text-[10px]">
        {brandLocalize('com_ui_partner_nvidia_corner')}
      </span>
    </div>
  );
}

export default PartnerCornerBadge;
