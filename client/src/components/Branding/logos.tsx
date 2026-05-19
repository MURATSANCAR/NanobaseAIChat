import { cn } from '~/utils';

type LogoProps = {
  className?: string;
  title?: string;
  variant?: 'brand' | 'mono';
};

const NVIDIA_LOGO = 'assets/partners/nvidia.svg';

const nvidiaLogoPlateClass =
  'inline-flex items-center justify-center rounded-lg bg-[#0a1628] px-3 py-1.5';

const partnerWordmarkClass = 'block h-6 w-auto max-w-none object-contain object-center sm:h-7';

type NvidiaLogoProps = LogoProps & {
  onPlate?: boolean;
};

function MicrosoftWordmark({ className, title = 'Microsoft' }: LogoProps) {
  return (
    <svg
      className={cn(partnerWordmarkClass, className)}
      viewBox="0 0 108 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="11" height="11" fill="#F25022" />
      <rect x="13" y="0" width="11" height="11" fill="#7FBA00" />
      <rect x="0" y="13" width="11" height="11" fill="#00A4EF" />
      <rect x="13" y="13" width="11" height="11" fill="#FFB900" />
      <path
        fill="#FFFFFF"
        d="M32 6.2h2.2c2.4 0 3.9 1.3 3.9 3.4 0 1.5-.8 2.5-2 3l2.3 4.2h-2.4l-2.1-3.8h-1.7v3.8H30V6.2Zm2.1 1.8v2.8h1.5c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4h-1.5Zm8.1-1.8h2.1v9.4h3.7v1.8H42.2V6.2Zm9.5 0h2.1l3.4 9h-2.3l-.6-1.7h-3.4l-.6 1.7h-2.3l3.3-9Zm.4 5.5-1.1-3.1-1.1 3.1h2.2Zm7.5-5.5h3.6c2.8 0 4.5 1.4 4.5 3.7 0 2.3-1.7 3.7-4.5 3.7h-1.4v2h-2.2V6.2Zm3.4 1.8c1.2 0 1.9.6 1.9 1.5s-.7 1.5-1.9 1.5h-1.2V8Zm9.1 7.6c-2.5 0-4.1-1.9-4.1-4.7 0-2.8 1.6-4.7 4.1-4.7s4.1 1.9 4.1 4.7c0 2.8-1.6 4.7-4.1 4.7Zm0-1.8c1.3 0 2-1.2 2-2.9s-.7-2.9-2-2.9-2 1.2-2 2.9.7 2.9 2 2.9Z"
      />
    </svg>
  );
}

function GoogleWordmark({ className, title = 'Google' }: LogoProps) {
  return (
    <svg
      className={cn(partnerWordmarkClass, className)}
      viewBox="0 0 272 92"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#EA4335"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#FBBC05"
        d="M209.75 26.34v8.75h-21.66c-2.21 0-3.89 1.14-3.89 3.44 0 1.97 1.49 3.32 3.56 3.32h9.47v8.53h-9.98c-8.32 0-13.93-5.16-13.93-12.87 0-7.79 5.73-12.87 14.17-12.87h12.28V26.34z"
      />
      <path
        fill="#4285F4"
        d="M225 47.18c0-7.98 5.79-13.44 12.51-13.44 4.34 0 7.79 1.8 9.89 4.97l8.03-6.21c-3.72-4.85-9.56-7.79-17.92-7.79-11.09 0-19.9 9.01-19.9 22.18 0 13.17 8.81 22.18 19.9 22.18 8.36 0 14.2-2.94 17.92-7.79l-8.03-6.21c-2.1 3.17-5.55 4.97-9.89 4.97-6.72 0-12.51-5.46-12.51-13.44z"
      />
      <path
        fill="#34A853"
        d="M53.19 42.49c0-1.96 1.57-3.38 3.76-3.38 2.19 0 3.76 1.42 3.76 3.38 0 1.97-1.57 3.39-3.76 3.39-2.19 0-3.76-1.42-3.76-3.39zm-3.19 4.87h6.63v27.03H50V47.36z"
      />
      <path
        fill="#EA4335"
        d="M35.59 27.93v8.75H15.93c-2.21 0-3.89 1.14-3.89 3.44 0 1.97 1.49 3.32 3.56 3.32h9.47v8.53H14.09C5.77 51.97.16 46.81.16 39.1c0-7.79 5.73-12.87 14.17-12.87h12.28V27.93z"
      />
    </svg>
  );
}

export function NvidiaLogo({ className, title = 'NVIDIA', onPlate = false }: NvidiaLogoProps) {
  const image = (
    <img
      src={NVIDIA_LOGO}
      alt={title}
      className={cn(partnerWordmarkClass, onPlate && 'h-full max-h-full', className)}
      loading="lazy"
      decoding="async"
    />
  );

  if (!onPlate) {
    return image;
  }

  return <span className={cn(nvidiaLogoPlateClass, className)}>{image}</span>;
}

export function MicrosoftLogo({ className, title = 'Microsoft', variant = 'brand' }: LogoProps) {
  if (variant === 'mono') {
    return <MicrosoftWordmark className={className} title={title} />;
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
    return <GoogleWordmark className={className} title={title} />;
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
        'flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14',
        className,
      )}
    >
      <NvidiaLogo
        onPlate={nvidiaOnPlate}
        title="NVIDIA"
        className={cn(useWordmarks && 'h-6 sm:h-7', nvidiaOnPlate && 'h-5 sm:h-6')}
      />
      <MicrosoftLogo variant={variant} title="Microsoft" />
      <GoogleLogo variant={variant} title="Google" />
    </div>
  );
}
