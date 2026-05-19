import { NvidiaLogo } from '~/components/Branding/logos';
import { cn } from '~/utils';
import useBrandLocalize from '~/components/Branding/brand';

function AuthInceptionBadge({
  className,
  large = false,
  onDarkBackground = false,
}: {
  className?: string;
  large?: boolean;
  onDarkBackground?: boolean;
}) {
  const brandLocalize = useBrandLocalize();

  return (
    <div
      className={cn('flex flex-col items-center gap-3', className)}
      role="note"
      aria-label={brandLocalize('com_auth_nvidia_inception')}
    >
      <p
        className={cn(
          'text-center font-semibold uppercase tracking-[0.14em] text-[#76B900]',
          large ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs',
        )}
      >
        {brandLocalize('com_auth_nvidia_inception')}
      </p>
      <NvidiaLogo
        onPlate={!onDarkBackground}
        title="NVIDIA"
        className={cn(
          large ? 'h-12 max-w-[220px] sm:h-16 sm:max-w-[280px]' : 'h-8 max-w-[140px] sm:h-10 sm:max-w-[180px]',
          !onDarkBackground && 'px-4 py-2.5',
        )}
      />
    </div>
  );
}

export default AuthInceptionBadge;
