import type { ReactNode } from 'react';
import { cn } from '~/utils';
import ColorfulBackground from './background';

function StandaloneThemeShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('nb-colorful-app relative flex min-h-screen w-full flex-col overflow-hidden', className)}>
      <ColorfulBackground />
      <div className="nb-colorful-scrim pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="relative z-[1] flex min-h-screen w-full flex-col">{children}</div>
    </div>
  );
}

export default StandaloneThemeShell;
