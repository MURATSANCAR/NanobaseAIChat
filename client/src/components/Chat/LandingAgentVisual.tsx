import type { ReactNode } from 'react';

const AGENT_LINKS: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [
  { x1: 100, y1: 100, x2: 100, y2: 42, delay: 0 },
  { x1: 100, y1: 100, x2: 150, y2: 128, delay: 0.5 },
  { x1: 100, y1: 100, x2: 50, y2: 128, delay: 1 },
  { x1: 100, y1: 100, x2: 156, y2: 72, delay: 1.5 },
  { x1: 100, y1: 100, x2: 44, y2: 72, delay: 2 },
];

function LandingAgentVisual({ children }: { children: ReactNode }) {
  return (
    <div
      className="nb-landing-agent relative mx-auto flex aspect-square w-[min(5.25rem,20vw)] max-w-[84px] items-center justify-center"
      aria-hidden="true"
    >
      <div className="auth-ai-glow absolute inset-[8%] rounded-full bg-orange-400/25 blur-2xl" />
      <div className="auth-ai-glow auth-ai-glow-delay absolute inset-[18%] rounded-full bg-sky-400/20 blur-xl" />
      <div className="auth-ai-glow auth-ai-glow-delay-2 absolute inset-[28%] rounded-full bg-orange-300/15 blur-lg" />

      <svg
        className="auth-ai-orbit pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="landingAgentRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          className="auth-ai-scan-ring"
        />

        <g className="auth-ai-orbit-slow" style={{ transformOrigin: '100px 100px' }}>
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#landingAgentRing)"
            strokeWidth="1"
            strokeDasharray="5 7"
          />
          <circle cx="100" cy="12" r="4" fill="#fb923c" className="auth-ai-satellite" />
          <circle cx="188" cy="100" r="3.5" fill="#38bdf8" className="auth-ai-satellite auth-ai-satellite-delay-1" />
          <circle cx="100" cy="188" r="3" fill="#f97316" className="auth-ai-satellite auth-ai-satellite-delay-2" />
          <circle cx="12" cy="100" r="3.5" fill="#fdba74" className="auth-ai-satellite auth-ai-satellite-delay-3" />
        </g>

        <g className="auth-ai-orbit-reverse" style={{ transformOrigin: '100px 100px' }}>
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            strokeDasharray="3 6"
          />
        </g>

        {AGENT_LINKS.map((link, index) => (
          <line
            key={`landing-stream-${index}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="4 10"
            className="auth-ai-data-stream"
            style={{ animationDelay: `${link.delay}s` }}
          />
        ))}

        <g className="auth-ai-agents" style={{ transformOrigin: '100px 100px' }}>
          <g className="auth-ai-agent auth-ai-agent-delay-0">
            <circle cx="100" cy="38" r="5.5" fill="#0f1d32" stroke="#fb923c" strokeWidth="1" />
            <circle cx="100" cy="38" r="2" fill="#fdba74" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-1">
            <circle cx="152" cy="128" r="5.5" fill="#0f1d32" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="152" cy="128" r="2" fill="#7dd3fc" className="auth-ai-agent-core" />
          </g>
          <g className="auth-ai-agent auth-ai-agent-delay-2">
            <circle cx="48" cy="128" r="5.5" fill="#0f1d32" stroke="#f97316" strokeWidth="1" />
            <circle cx="48" cy="128" r="2" fill="#fb923c" className="auth-ai-agent-core" />
          </g>
        </g>
      </svg>

      <div className="relative z-[1] flex items-center justify-center">{children}</div>

    </div>
  );
}

export default LandingAgentVisual;
