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
      <div className="relative z-[1] flex min-h-screen w-full flex-col">{children}</div>
    </div>
  );
}

export default StandaloneThemeShell;
