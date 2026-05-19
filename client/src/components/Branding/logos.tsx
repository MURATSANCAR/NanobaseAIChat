type LogoProps = {
  className?: string;
  title?: string;
};

export function NvidiaLogo({ className, title = 'NVIDIA' }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#76B900"
        d="M8.2 4.1 0 7v10l8.2 2.9 8.2-2.9V7L8.2 4.1zm0 12.6L3.4 14.2V9.8l4.8 1.8 4.8-1.8v4.4l-4.8 2.5z"
      />
      <path
        fill="#76B900"
        d="M24.5 6.2h3.4v11.6h-3.4V6.2zm7.8 0c3.4 0 5.6 2.2 5.6 5.8s-2.2 5.8-5.6 5.8-5.6-2.2-5.6-5.8 2.2-5.8 5.6-5.8zm0 2.8c-1.7 0-2.2 1.6-2.2 3s.5 3 2.2 3 2.2-1.6 2.2-3-.5-3-2.2-3zm13.2-2.8 4.5 11.6h-3.3l-.8-2.4h-4.5l-.8 2.4h-3.3l4.5-11.6h3.7zm-.5 7.1-1.4-4.1-1.4 4.1h2.8zm10.5-7.1h3.4v9.2h6.2v2.4H55.5V6.2zm15.2 0c3.6 0 5.8 1.9 5.8 5.2 0 2.5-1.4 3.9-3.3 4.5l3.9 3.6h-4.1l-3.6-3.3h-2.2v3.3h-3.4V6.2zm3.1 2.7v2.8h2.2c1.1 0 1.9-.5 1.9-1.4s-.8-1.4-1.9-1.4h-2.2z"
      />
    </svg>
  );
}

export function MicrosoftLogo({ className, title = 'Microsoft' }: LogoProps) {
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

export function GoogleLogo({ className, title = 'Google' }: LogoProps) {
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
