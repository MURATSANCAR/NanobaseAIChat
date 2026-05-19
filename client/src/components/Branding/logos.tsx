import { cn } from '~/utils';

type LogoProps = {
  className?: string;
  title?: string;
  variant?: 'brand' | 'mono';
};

const NVIDIA_LOGO = 'assets/partners/nvidia.svg';
const MICROSOFT_LOGO = 'assets/partners/microsoft.svg';
const GOOGLE_LOGO = 'assets/partners/google.svg';

const nvidiaLogoPlateClass =
  'inline-flex items-center justify-center rounded-lg bg-[#0a1628] px-3 py-1.5';

const wordmarkImgClass =
  'h-[18px] w-auto max-w-none object-contain object-center sm:h-5';

type NvidiaLogoProps = LogoProps & {
  /** White wordmark on NVIDIA dark plate — for light page backgrounds */
  onPlate?: boolean;
};

function PartnerWordmarkImg({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={title}
      className={cn(wordmarkImgClass, className)}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Official NVIDIA wordmark + eye symbol (green #76B900, white wordmark). */
export function NvidiaLogo({ className, title = 'NVIDIA', onPlate = false }: NvidiaLogoProps) {
  const image = (
    <img
      src={NVIDIA_LOGO}
      alt={title}
      className={cn(
        wordmarkImgClass,
        onPlate && 'h-full max-h-full max-w-full',
        !onPlate && className,
      )}
      loading="lazy"
      decoding="async"
    />
  );

  if (!onPlate) {
    return image;
  }

  return <span className={cn(nvidiaLogoPlateClass, className)}>{image}</span>;
}

/** Microsoft four-square mark + wordmark (footer) or icon only (compact). */
export function MicrosoftLogo({ className, title = 'Microsoft', variant = 'brand' }: LogoProps) {
  if (variant === 'mono') {
    return <PartnerWordmarkImg src={MICROSOFT_LOGO} title={title} className={className} />;
  }

  return (
    <svg
      className={className}
      viewBox="0 0 23 23"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

/** Google full-color wordmark (footer) or G icon (compact). */
export function GoogleLogo({ className, title = 'Google', variant = 'brand' }: LogoProps) {
  if (variant === 'mono') {
    return <PartnerWordmarkImg src={GOOGLE_LOGO} title={title} className={className} />;
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const logoSlotClass = 'flex h-6 shrink-0 items-center justify-center sm:h-7';

export function PartnerLogoRow({
  className,
  variant = 'brand',
  nvidiaOnPlate = false,
}: {
  className?: string;
  variant?: 'brand' | 'mono';
  nvidiaOnPlate?: boolean;
}) {
  const useWordmarks = variant === 'mono';

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10',
        className,
      )}
    >
      <div className={cn(logoSlotClass, useWordmarks ? 'min-w-[72px] sm:min-w-[88px]' : '')}>
        <NvidiaLogo
          onPlate={nvidiaOnPlate}
          title="NVIDIA"
          className={cn(useWordmarks && '!h-5 sm:!h-6', nvidiaOnPlate && '!h-4 sm:!h-5')}
        />
      </div>
      <div
        className={cn(
          logoSlotClass,
          useWordmarks ? 'min-w-[90px] sm:min-w-[108px]' : 'w-7 sm:w-8',
        )}
      >
        <MicrosoftLogo
          variant={variant}
          title="Microsoft"
          className={useWordmarks ? undefined : 'h-6 w-6 sm:h-7 sm:w-7'}
        />
      </div>
      <div className={cn(logoSlotClass, useWordmarks ? 'min-w-[62px] sm:min-w-[74px]' : 'w-7 sm:w-8')}>
        <GoogleLogo
          variant={variant}
          title="Google"
          className={useWordmarks ? undefined : 'h-6 w-6 sm:h-7 sm:w-7'}
        />
      </div>
    </motion.div>
  );
}
