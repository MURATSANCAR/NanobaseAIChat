import { cn } from '~/utils';

const NANOBASE_LOGO = 'assets/nanobase-logo.png';

type NanobaseLogoProps = {
  alt: string;
  className?: string;
  variant?: 'auth' | 'hero' | 'compact';
};

function NanobaseLogo({ alt, className, variant = 'auth' }: NanobaseLogoProps) {
  return (
    <img
      src={NANOBASE_LOGO}
      alt={alt}
      className={cn(
        'w-auto object-contain',
        variant === 'hero' && 'h-16 max-w-[200px] sm:h-[4.5rem] sm:max-w-[240px]',
        variant === 'auth' && 'h-[4.5rem] max-w-[200px] sm:h-24 sm:max-w-[240px]',
        variant === 'compact' && 'h-10 max-w-[140px] sm:h-11 sm:max-w-[160px]',
        className,
      )}
      loading="eager"
      decoding="async"
    />
  );
}

export default NanobaseLogo;
