import { cn } from '~/utils';

type LogoProps = {
  className?: string;
  title?: string;
  variant?: 'brand' | 'mono';
};

const NVIDIA_LOGO = 'assets/partners/nvidia.svg';

/** Official NVIDIA wordmark + eye symbol (green #76B900, wordmark for dark backgrounds). */
export function NvidiaLogo({ className, title = 'NVIDIA' }: LogoProps) {
  return (
    <img
      src={NVIDIA_LOGO}
      alt={title}
      className={cn('h-[18px] w-auto max-w-[88px] object-contain object-center sm:h-5 sm:max-w-[100px]', className)}
      loading="lazy"
      decoding="async"
    />
  );
}

export function MicrosoftLogo({ className, title = 'Microsoft', variant = 'brand' }: LogoProps) {
  if (variant === 'mono') {
    return (
      <svg
        className={className}
        viewBox="0 0 108 24"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="11" height="11" fill="currentColor" opacity="0.9" />
        <rect x="13" y="0" width="11" height="11" fill="currentColor" opacity="0.7" />
        <rect x="0" y="13" width="11" height="11" fill="currentColor" opacity="0.7" />
        <rect x="13" y="13" width="11" height="11" fill="currentColor" opacity="0.5" />
        <path
          fill="currentColor"
          d="M32 6.2h2.2c2.4 0 3.9 1.3 3.9 3.4 0 1.5-.8 2.5-2 3l2.3 4.2h-2.4l-2.1-3.8h-1.7v3.8H30V6.2Zm2.1 1.8v2.8h1.5c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4h-1.5Zm8.1-1.8h2.1v9.4h3.7v1.8H42.2V6.2Zm9.5 0h2.1l3.4 9h-2.3l-.6-1.7h-3.4l-.6 1.7h-2.3l3.3-9Zm.4 5.5-1.1-3.1-1.1 3.1h2.2Zm7.5-5.5h3.6c2.8 0 4.5 1.4 4.5 3.7 0 2.3-1.7 3.7-4.5 3.7h-1.4v2h-2.2V6.2Zm3.4 1.8c1.2 0 1.9.6 1.9 1.5s-.7 1.5-1.9 1.5h-1.2V8Zm9.1 7.6c-2.5 0-4.1-1.9-4.1-4.7 0-2.8 1.6-4.7 4.1-4.7s4.1 1.9 4.1 4.7c0 2.8-1.6 4.7-4.1 4.7Zm0-1.8c1.3 0 2-1.2 2-2.9s-.7-2.9-2-2.9-2 1.2-2 2.9.7 2.9 2 2.9Z"
        />
      </svg>
    );
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

export function GoogleLogo({ className, title = 'Google', variant = 'brand' }: LogoProps) {
  if (variant === 'mono') {
    return (
      <svg
        className={className}
        viewBox="0 0 74 24"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M11.6 12c0-3.2 2.5-5.5 5.8-5.5 1.8 0 3.1.6 4 1.5l-1.6 1.6c-.7-.7-1.6-1.1-2.4-1.1-2 0-3.4 1.5-3.4 3.5s1.4 3.5 3.4 3.5c1.3 0 2-.5 2.5-1h-2.5V12h6.2c.1.4.1.7.1 1.1 0 3.4-2.3 5.7-5.8 5.7-3.4 0-6.3-2.8-6.3-6.3Zm14.2 0c0-3.2 2.5-5.5 5.8-5.5 1.8 0 3.1.6 4 1.5l-1.6 1.6c-.7-.7-1.6-1.1-2.4-1.1-2 0-3.4 1.5-3.4 3.5s1.4 3.5 3.4 3.5c1.3 0 2-.5 2.5-1h-2.5V12h6.2c.1.4.1.7.1 1.1 0 3.4-2.3 5.7-5.8 5.7-3.3 0-6.3-2.8-6.3-6.3Zm14.3 5.3V6.7h2v11.6h-2Zm9.1-5.9c0-3.4 2.5-5.9 5.9-5.9s5.9 2.5 5.9 5.9-2.5 5.9-5.9 5.9-5.9-2.5-5.9-5.9Zm9.6 0c0-2.2-1.6-3.7-3.7-3.7s-3.7 1.5-3.7 3.7 1.6 3.7 3.7 3.7 3.7-1.5 3.7-3.7Z"
        />
      </svg>
    );
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
}: {
  className?: string;
  variant?: 'brand' | 'mono';
}) {
  const mono = variant === 'mono';

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-12',
        mono && 'text-white/55',
        className,
      )}
    >
      <div className={cn(logoSlotClass, 'min-w-[72px] sm:min-w-[88px]')}>
        <NvidiaLogo title="NVIDIA" className="!h-5 !max-w-none sm:!h-6" />
      </div>
      <div className={cn(logoSlotClass, 'w-6 sm:w-7')}>
        <MicrosoftLogo variant={variant} className="h-5 w-5 sm:h-6 sm:w-6" title="Microsoft" />
      </div>
      <div className={cn(logoSlotClass, 'w-6 sm:w-7')}>
        <GoogleLogo variant={variant} className="h-5 w-5 sm:h-6 sm:w-6" title="Google" />
      </div>
    </div>
  );
}
