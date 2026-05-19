import { DEFAULT_APP_TITLE } from 'librechat-data-provider';

function CornerAiVisual() {
  return (
    <div
      className="nb-corner-ai group relative flex size-14 items-center justify-center sm:size-16"
      role="img"
      aria-label={DEFAULT_APP_TITLE}
    >
      <div className="nb-corner-ai-plate absolute inset-0 rounded-2xl border border-white/10 bg-[rgba(15,29,50,0.72)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl" />

      <svg
        className="nb-corner-ai-ring pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cornerAiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="url(#cornerAiGrad)"
          strokeWidth="1.25"
          strokeDasharray="3 5"
          strokeLinecap="round"
          className="nb-corner-ai-orbit"
        />
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.5"
          strokeOpacity="0.35"
          className="nb-corner-ai-orbit-reverse"
        />
      </svg>

      <div className="nb-corner-ai-glow absolute inset-[18%] rounded-full bg-orange-400/20 blur-md" />

      <img
        src="assets/logo-icon.svg"
        alt=""
        className="relative z-[1] size-7 rounded-lg object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.35)] sm:size-8"
        width={32}
        height={32}
        decoding="async"
      />

      <span className="nb-corner-ai-status absolute -bottom-0.5 -right-0.5 flex size-2.5 items-center justify-center rounded-full border-2 border-[#0a1628] bg-emerald-400/90 sm:size-3">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}

export default CornerAiVisual;
