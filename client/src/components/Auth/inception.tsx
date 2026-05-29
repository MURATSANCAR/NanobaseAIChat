import { NvidiaLogo } from '~/components/Branding/logos';
import { cn } from '~/utils';
import useBrandLocalize from '~/components/Branding/brand';

function AuthInceptionBadge({ className, large = false }: { className?: string; large?: boolean }) {
  const brandLocalize = useBrandLocalize();

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
        )}
      >
        {brandLocalize('com_auth_nvidia_inception')}
      </p>
      <div
        className={cn(
          'flex w-full max-w-[280px] items-center justify-center rounded-xl border border-gray-200/80 bg-white px-5 py-3 shadow-sm dark:border-gray-600 dark:bg-white',
        )}
      >
        <NvidiaLogo
          surface="light"
          title="NVIDIA"
          className={cn(
            large
              ? 'h-10 w-auto max-w-[240px] sm:h-12 sm:max-w-[280px]'
              : 'h-8 w-auto max-w-[200px] sm:h-9 sm:max-w-[220px]',
          )}
        />
      </div>
    </div>
  );
}

export default AuthInceptionBadge;
