import { NvidiaLogo } from '~/components/Branding/logos';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

function AuthInceptionBadge({
  className,
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  const localize = useLocalize();

  return (
    <div
      className={cn('flex flex-col items-center gap-3', className)}
      role="note"
      aria-label={localize('com_auth_nvidia_inception')}
    >
      <p
        className={cn(
          'text-center font-semibold uppercase tracking-[0.14em] text-[#76B900]',
          large ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs',
        )}
      >
        {localize('com_auth_nvidia_inception')}
      </p>
      <NvidiaLogo
        title="NVIDIA"
        className={cn(
          'w-auto object-contain',
          large ? 'h-12 max-w-[220px] sm:h-16 sm:max-w-[280px]' : 'h-8 max-w-[140px] sm:h-10 sm:max-w-[180px]',
        )}
      />
    </div>
  );
}

export default AuthInceptionBadge;
