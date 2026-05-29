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
  const usePlate = onDarkBackground;

  return (
    <div
      className={cn('flex w-full flex-col items-center gap-3', className)}
      role="note"
      aria-label={brandLocalize('com_auth_nvidia_inception')}
    >
      <p
        className={cn(
          'text-center font-semibold uppercase tracking-[0.14em] text-[#76B900]',
          large ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs',
          onDarkBackground && 'text-[#9ae650]',
        )}
      >
        {brandLocalize('com_auth_nvidia_inception')}
      </p>
      <div
        className={cn(
          'flex w-full items-center justify-center',
          !usePlate &&
            'rounded-xl border border-gray-200/80 bg-gradient-to-br from-gray-50 to-white px-5 py-3 shadow-sm dark:border-gray-700 dark:from-gray-900/40 dark:to-gray-900/20',
          usePlate && 'max-w-[280px]',
        )}
      >
        <NvidiaLogo
          onPlate={usePlate}
          onDarkBackground={onDarkBackground}
          title="NVIDIA"
          className={cn(
            large ? 'h-10 w-auto max-w-[240px] sm:h-12 sm:max-w-[280px]' : 'h-8 w-auto max-w-[200px] sm:h-9 sm:max-w-[220px]',
            usePlate && 'px-4 py-2.5',
          )}
        />
      </div>
    </div>
  );
}

export default AuthInceptionBadge;
