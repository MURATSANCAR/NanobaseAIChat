import ColorfulBackground from './background';

function ColorfulShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="nb-colorful-app dark relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <ColorfulBackground />
      <div className="nb-colorful-scrim pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="relative z-[1] flex h-full min-h-0 w-full flex-col">{children}</div>
    </div>
  );
}

export default ColorfulShell;
