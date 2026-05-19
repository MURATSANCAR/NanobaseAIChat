const AGENT_LINKS: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [
  { x1: 100, y1: 100, x2: 100, y2: 34, delay: 0 },
  { x1: 100, y1: 100, x2: 158, y2: 132, delay: 0.5 },
  { x1: 100, y1: 100, x2: 42, y2: 132, delay: 1 },
  { x1: 100, y1: 100, x2: 164, y2: 66, delay: 1.5 },
  { x1: 100, y1: 100, x2: 36, y2: 66, delay: 2 },
];

function LandingAgentVisual() {
  return (
    <div
      className="nb-landing-agent relative flex aspect-square w-[min(10.5rem,30vw)] max-w-[168px] shrink-0 items-center justify-center sm:max-w-[188px]"
      aria-hidden="true"
    >
      <div className="auth-ai-glow absolute inset-[6%] rounded-full bg-orange-400/35 blur-3xl" />
      <div className="auth-ai-glow auth-ai-glow-delay absolute inset-[14%] rounded-full bg-sky-400/25 blur-2xl" />
      <div className="auth-ai-glow auth-ai-glow-delay-2 absolute inset-[24%] rounded-full bg-orange-300/20 blur-xl" />
      <div className="nb-landing-pulse absolute inset-[10%] rounded-full border border-orange-400/20" />

      <svg
        className="auth-ai-orbit pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="landingAiCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="landingAiRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
          <filter id="landingAiBlur" x="-40%" y="-40%" width="180%" height="180%">
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
          r="94"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.75"
          strokeOpacity="0.35"
          className="auth-ai-scan-ring"
        />

        <g className="auth-ai-orbit-slow" style={{ transformOrigin: '100px 100px' }}>
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#landingAiRing)"
            strokeWidth="1.25"
            strokeDasharray="5 7"
          />
          <circle cx="100" cy="12" r="5" fill="#fb923c" className="auth-ai-satellite" />
          <circle cx="188" cy="100" r="4.5" fill="#38bdf8" className="auth-ai-satellite auth-ai-satellite-delay-1" />
          <circle cx="100" cy="188" r="4" fill="#f97316" className="auth-ai-satellite auth-ai-satellite-delay-2" />
          <circle cx="12" cy="100" r="4.5" fill="#fdba74" className="auth-ai-satellite auth-ai-satellite-delay-3" />
        </g>

        <g className="auth-ai-orbit-reverse" style={{ transformOrigin: '100px 100px' }}>
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.85"
            strokeOpacity="0.45"
            strokeDasharray="3 6"
          />
          <circle cx="100" cy="30" r="3.5" fill="#fdba74" className="auth-ai-satellite auth-ai-satellite-delay-2" />
          <circle cx="170" cy="100" r="3" fill="#38bdf8" className="auth-ai-satellite auth-ai-satellite-delay-4" />
          <circle cx="100" cy="170" r="3.5" fill="#fb923c" className="auth-ai-satellite auth-ai-satellite-delay-1" />
          <circle cx="30" cy="100" r="3" fill="#f97316" className="auth-ai-satellite auth-ai-satellite-delay-3" />
        </g>

        {AGENT_LINKS.map((link, index) => (
          <line
            key={`landing-stream-${index}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#38bdf8"
            strokeWidth="1.25"
            strokeDasharray="4 10"
            className="auth-ai-data-stream"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        <g className="auth-ai-agents" style={{ transformOrigin: '100px 100px' }}>
          <g className="auth-ai-agent auth-ai-agent-delay-0">
            <circle cx="100" cy="34" r="7.5" fill="#0f1d32" stroke="#fb923c" strokeWidth="1.25" />
            <circle cx="100" cy="34" r="2.75" fill="#fdba74" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-1">
            <circle cx="158" cy="130" r="7.5" fill="#0f1d32" stroke="#38bdf8" strokeWidth="1.25" />
            <circle cx="158" cy="130" r="2.75" fill="#7dd3fc" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-2">
            <circle cx="42" cy="130" r="7.5" fill="#0f1d32" stroke="#f97316" strokeWidth="1.25" />
            <circle cx="42" cy="130" r="2.75" fill="#fb923c" className="auth-ai-agent-core" />
          </g>
        </g>

        <g className="auth-ai-core" style={{ transformOrigin: '100px 100px' }}>
          <circle cx="100" cy="100" r="42" fill="url(#landingAiCore)" fillOpacity="0.22" />
          <circle
            cx="100"
            cy="100"
            r="34"
            fill="none"
            stroke="url(#landingAiCore)"
            strokeWidth="2"
            strokeOpacity="0.9"
            className="auth-ai-core-ring"
          />
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="url(#landingAiCore)"
            filter="url(#landingAiBlur)"
            className="auth-ai-core-dot"
          />
          <path
            d="M100 58 L122 80 L122 120 L100 142 L78 120 L78 80 Z"
            fill="none"
            stroke="#fdba74"
            strokeWidth="1.1"
            strokeOpacity="0.7"
            className="auth-ai-hex"
          />
          <line x1="100" y1="44" x2="100" y2="68" stroke="#f97316" strokeWidth="1.1" className="auth-ai-spoke" />
          <line
            x1="156"
            y1="100"
            x2="132"
            y2="100"
            stroke="#38bdf8"
            strokeWidth="1.1"
            className="auth-ai-spoke auth-ai-spoke-delay-1"
          />
          <line
            x1="100"
            y1="156"
            x2="100"
            y2="132"
            stroke="#fb923c"
            strokeWidth="1.1"
            className="auth-ai-spoke auth-ai-spoke-delay-2"
          />
          <line
            x1="44"
            y1="100"
            x2="68"
            y2="100"
            stroke="#38bdf8"
            strokeWidth="1.1"
            className="auth-ai-spoke auth-ai-spoke-delay-3"
          />
        </g>
      </svg>

      <div className="nb-landing-logo-core relative z-[2] flex items-center justify-center">
        <img
          src="assets/logo-icon.svg"
          alt=""
          className="nb-landing-logo h-[38%] w-[38%] min-h-[2.5rem] min-w-[2.5rem] max-h-[3.25rem] max-w-[3.25rem] rounded-2xl object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]"
          width={52}
          height={52}
          decoding="async"
        />
      </div>
    </div>
  );
}

export default LandingAgentVisual;
