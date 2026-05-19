import { useLocalize } from '~/hooks';

const DATA_LINKS: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [
  { x1: 44, y1: 44, x2: 44, y2: 18, delay: 0 },
  { x1: 44, y1: 44, x2: 66, y2: 58, delay: 0.35 },
  { x1: 44, y1: 44, x2: 22, y2: 58, delay: 0.7 },
  { x1: 44, y1: 44, x2: 68, y2: 32, delay: 1.05 },
];

function CornerAiVisual() {
  const localize = useLocalize();

  return (
    <div
      className="nb-corner-ai group relative flex size-[5.25rem] items-center justify-center sm:size-24"
      role="status"
      aria-live="polite"
      aria-label={localize('com_ui_landing_agent_status')}
    >
      <div className="nb-corner-ai-plate absolute inset-0 rounded-2xl border border-white/10 bg-[rgba(15,29,50,0.78)] shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:rounded-[1.125rem]" />

      <svg
        className="nb-corner-ai-ring pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 88 88"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cornerAiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cornerAiCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <circle
          cx="44"
          cy="44"
          r="40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.6"
          strokeOpacity="0.25"
          className="nb-corner-ai-scan"
        />

        <g className="nb-corner-ai-orbit" style={{ transformOrigin: '44px 44px' }}>
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="url(#cornerAiGrad)"
            strokeWidth="1.35"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle cx="44" cy="8" r="3.5" fill="#fb923c" className="nb-corner-ai-satellite" />
          <circle
            cx="80"
            cy="44"
            r="3"
            fill="#38bdf8"
            className="nb-corner-ai-satellite nb-corner-ai-satellite-delay-1"
          />
          <circle
            cx="44"
            cy="80"
            r="2.75"
            fill="#f97316"
            className="nb-corner-ai-satellite nb-corner-ai-satellite-delay-2"
          />
        </g>

        <g className="nb-corner-ai-orbit-reverse" style={{ transformOrigin: '44px 44px' }}>
          <circle
            cx="44"
            cy="44"
            r="28"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.75"
            strokeOpacity="0.45"
            strokeDasharray="2 5"
          />
          <circle
            cx="72"
            cy="44"
            r="2.25"
            fill="#7dd3fc"
            className="nb-corner-ai-satellite nb-corner-ai-satellite-delay-3"
          />
        </g>

        {DATA_LINKS.map((link, index) => (
          <line
            key={`corner-stream-${index}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="3 8"
            className="nb-corner-ai-stream"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        <g className="nb-corner-ai-agents" style={{ transformOrigin: '44px 44px' }}>
          <g className="nb-corner-ai-node nb-corner-ai-node-delay-0">
            <circle cx="44" cy="16" r="4.5" fill="#0f1d32" stroke="#fb923c" strokeWidth="1" />
            <circle cx="44" cy="16" r="1.75" fill="#fdba74" className="nb-corner-ai-node-core" />
          </g>
          <g className="nb-corner-ai-node nb-corner-ai-node-delay-1">
            <circle cx="68" cy="62" r="4.5" fill="#0f1d32" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="68" cy="62" r="1.75" fill="#7dd3fc" className="nb-corner-ai-node-core" />
          </g>
          <g className="nb-corner-ai-node nb-corner-ai-node-delay-2">
            <circle cx="20" cy="62" r="4.5" fill="#0f1d32" stroke="#f97316" strokeWidth="1" />
            <circle cx="20" cy="62" r="1.75" fill="#fb923c" className="nb-corner-ai-node-core" />
          </g>
        </g>

        <circle
          cx="44"
          cy="44"
          r="18"
          fill="url(#cornerAiCore)"
          fillOpacity="0.12"
          className="nb-corner-ai-core-pulse"
        />
        <circle
          cx="44"
          cy="44"
          r="14"
          fill="none"
          stroke="url(#cornerAiCore)"
          strokeWidth="1.25"
          strokeOpacity="0.75"
          className="nb-corner-ai-core-ring"
        />
      </svg>

      <div className="nb-corner-ai-glow absolute inset-[14%] rounded-full bg-orange-400/25 blur-lg" />
      <div className="nb-corner-ai-glow nb-corner-ai-glow-sky absolute inset-[22%] rounded-full bg-sky-400/15 blur-md" />

      <img
        src="assets/logo-icon.svg"
        alt=""
        className="relative z-[1] size-9 rounded-lg object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] sm:size-10"
        width={40}
        height={40}
        decoding="async"
      />

      <span className="nb-corner-ai-status absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#0a1628] bg-emerald-400 sm:size-3.5" />

      <div
        className="nb-corner-ai-activity absolute -bottom-1 left-1/2 flex -translate-x-1/2 translate-y-full gap-1 rounded-full border border-white/10 bg-[rgba(10,22,40,0.9)] px-2 py-1 shadow-lg backdrop-blur-md"
        aria-hidden="true"
      >
        <span className="nb-corner-ai-dot nb-corner-ai-dot-1 size-1 rounded-full bg-sky-400" />
        <span className="nb-corner-ai-dot nb-corner-ai-dot-2 size-1 rounded-full bg-orange-400" />
        <span className="nb-corner-ai-dot nb-corner-ai-dot-3 size-1 rounded-full bg-sky-300" />
      </div>
    </div>
  );
}

export default CornerAiVisual;
