const AGENT_LINKS: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [
  { x1: 100, y1: 100, x2: 100, y2: 38, delay: 0 },
  { x1: 100, y1: 100, x2: 154, y2: 132, delay: 0.6 },
  { x1: 100, y1: 100, x2: 46, y2: 132, delay: 1.2 },
  { x1: 100, y1: 100, x2: 162, y2: 68, delay: 1.8 },
  { x1: 100, y1: 100, x2: 38, y2: 68, delay: 2.4 },
];

function AuthAiVisual() {
  return (
    <div
      className="auth-ai-visual relative flex aspect-square w-full max-w-[min(480px,78%)] items-center justify-center"
      aria-hidden="true"
    >
      <div className="auth-ai-glow absolute inset-[12%] rounded-full bg-orange-400/30 blur-3xl" />
      <div className="auth-ai-glow auth-ai-glow-delay absolute inset-[22%] rounded-full bg-sky-400/20 blur-2xl" />
      <div className="auth-ai-glow auth-ai-glow-delay-2 absolute inset-[32%] rounded-full bg-orange-300/15 blur-xl" />

      <svg
        className="auth-ai-orbit relative h-full w-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="authAiCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="authAiRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
          </linearGradient>
          <filter id="authAiBlur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          className="auth-ai-scan-ring"
        />

        <g className="auth-ai-orbit-slow" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#authAiRing)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="100" cy="12" r="4.5" fill="#fb923c" className="auth-ai-satellite" />
          <circle cx="188" cy="100" r="4" fill="#38bdf8" className="auth-ai-satellite auth-ai-satellite-delay-1" />
          <circle cx="100" cy="188" r="3.5" fill="#f97316" className="auth-ai-satellite auth-ai-satellite-delay-2" />
          <circle cx="12" cy="100" r="4" fill="#fdba74" className="auth-ai-satellite auth-ai-satellite-delay-3" />
        </g>

        <g className="auth-ai-orbit-reverse" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="68" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.45" strokeDasharray="3 6" />
          <circle cx="100" cy="32" r="3" fill="#fdba74" className="auth-ai-satellite auth-ai-satellite-delay-2" />
          <circle cx="168" cy="100" r="2.5" fill="#38bdf8" className="auth-ai-satellite auth-ai-satellite-delay-4" />
          <circle cx="100" cy="168" r="3" fill="#fb923c" className="auth-ai-satellite auth-ai-satellite-delay-1" />
          <circle cx="32" cy="100" r="2.5" fill="#f97316" className="auth-ai-satellite auth-ai-satellite-delay-3" />
        </g>

        {AGENT_LINKS.map((link, index) => (
          <line
            key={`stream-${index}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="4 12"
            className="auth-ai-data-stream"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        <g className="auth-ai-agents" style={{ transformOrigin: '100px 100px' }}>
          <g className="auth-ai-agent auth-ai-agent-delay-0">
            <circle cx="100" cy="34" r="7" fill="#1e293b" stroke="#fb923c" strokeWidth="1.25" />
            <circle cx="100" cy="34" r="2.5" fill="#fdba74" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-1">
            <circle cx="158" cy="130" r="7" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.25" />
            <circle cx="158" cy="130" r="2.5" fill="#7dd3fc" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-2">
            <circle cx="42" cy="130" r="7" fill="#1e293b" stroke="#f97316" strokeWidth="1.25" />
            <circle cx="42" cy="130" r="2.5" fill="#fb923c" className="auth-ai-agent-core" />
          </g>
        </g>

        <g className="auth-ai-core" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="38" fill="url(#authAiCore)" fillOpacity="0.18" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="url(#authAiCore)" strokeWidth="2" strokeOpacity="0.85" className="auth-ai-core-ring" />
          <circle cx="100" cy="100" r="16" fill="url(#authAiCore)" filter="url(#authAiBlur)" className="auth-ai-core-dot" />
          <path
            d="M100 62 L120 82 L120 118 L100 138 L80 118 L80 82 Z"
            fill="none"
            stroke="#fdba74"
            strokeWidth="1"
            strokeOpacity="0.65"
            className="auth-ai-hex"
          />
          <line x1="100" y1="48" x2="100" y2="70" stroke="#f97316" strokeWidth="1" className="auth-ai-spoke" />
          <line x1="152" y1="100" x2="130" y2="100" stroke="#38bdf8" strokeWidth="1" className="auth-ai-spoke auth-ai-spoke-delay-1" />
          <line x1="100" y1="152" x2="100" y2="130" stroke="#fb923c" strokeWidth="1" className="auth-ai-spoke auth-ai-spoke-delay-2" />
          <line x1="48" y1="100" x2="70" y2="100" stroke="#38bdf8" strokeWidth="1" className="auth-ai-spoke auth-ai-spoke-delay-3" />
        </g>
      </svg>

      <div className="auth-ai-status absolute bottom-[6%] flex items-center gap-1.5">
        <span className="auth-ai-status-dot h-2 w-2 rounded-full bg-emerald-400" />
        <span className="auth-ai-status-dot auth-ai-satellite-delay-1 h-1.5 w-1.5 rounded-full bg-orange-400" />
        <span className="auth-ai-status-dot auth-ai-satellite-delay-2 h-1.5 w-1.5 rounded-full bg-sky-400" />
      </div>
    </div>
  );
}

export default AuthAiVisual;
