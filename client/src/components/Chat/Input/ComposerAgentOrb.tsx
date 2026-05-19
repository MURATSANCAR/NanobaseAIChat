import { useId } from 'react';
import { cn } from '~/utils';

const DATA_LINKS: ReadonlyArray<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [
  { x1: 44, y1: 44, x2: 44, y2: 20, delay: 0 },
  { x1: 44, y1: 44, x2: 62, y2: 56, delay: 0.4 },
  { x1: 44, y1: 44, x2: 26, y2: 56, delay: 0.8 },
];

type ComposerAgentOrbProps = {
  active?: boolean;
  className?: string;
};

function ComposerAgentOrb({ active = true, className }: ComposerAgentOrbProps) {
  const uid = useId().replace(/:/g, '');
  const ringGradId = `composerAiRing-${uid}`;
  const coreGradId = `composerAiCore-${uid}`;

  return (
    <div
      className={cn(
        'nb-send-agent-orb pointer-events-none absolute inset-0 flex items-center justify-center',
        !active && 'opacity-40',
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 88 88"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fdba74" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={coreGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <circle
          cx="44"
          cy="44"
          r="38"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.6"
          strokeOpacity="0.3"
          className={cn('nb-corner-ai-scan', active && 'nb-send-agent-orb--active')}
        />

        <g className="nb-corner-ai-orbit" style={{ transformOrigin: '44px 44px' }}>
          <circle
            cx="44"
            cy="44"
            r="34"
            fill="none"
            stroke={`url(#${ringGradId})`}
            strokeWidth="1.35"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <circle cx="44" cy="10" r="3" fill="#fb923c" className="nb-corner-ai-satellite" />
          <circle
            cx="78"
            cy="44"
            r="2.5"
            fill="#38bdf8"
            className="nb-corner-ai-satellite nb-corner-ai-satellite-delay-1"
          />
          <circle
            cx="44"
            cy="78"
            r="2.25"
            fill="#f97316"
            className="nb-corner-ai-satellite nb-corner-ai-satellite-delay-2"
          />
        </g>

        <g className="nb-corner-ai-orbit-reverse" style={{ transformOrigin: '44px 44px' }}>
          <circle
            cx="44"
            cy="44"
            r="26"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            strokeDasharray="2 5"
          />
        </g>

        {DATA_LINKS.map((link, index) => (
          <line
            key={`composer-stream-${index}`}
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
            <circle cx="44" cy="18" r="3.5" fill="#0f1d32" stroke="#fb923c" strokeWidth="1" />
            <circle cx="44" cy="18" r="1.5" fill="#fdba74" className="nb-corner-ai-node-core" />
          </g>
          <g className="nb-corner-ai-node nb-corner-ai-node-delay-1">
            <circle cx="64" cy="60" r="3.5" fill="#0f1d32" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="64" cy="60" r="1.5" fill="#7dd3fc" className="nb-corner-ai-node-core" />
          </g>
          <g className="nb-corner-ai-node nb-corner-ai-node-delay-2">
            <circle cx="24" cy="60" r="3.5" fill="#0f1d32" stroke="#f97316" strokeWidth="1" />
            <circle cx="24" cy="60" r="1.5" fill="#fb923c" className="nb-corner-ai-node-core" />
          </g>
        </g>

        <circle
          cx="44"
          cy="44"
          r="16"
          fill={`url(#${coreGradId})`}
          fillOpacity="0.14"
          className="nb-corner-ai-core-pulse"
        />
        <circle
          cx="44"
          cy="44"
          r="12"
          fill="none"
          stroke={`url(#${coreGradId})`}
          strokeWidth="1.1"
          strokeOpacity="0.8"
          className="nb-corner-ai-core-ring"
        />
      </svg>

      <div className="nb-corner-ai-glow absolute inset-[16%] rounded-full bg-orange-400/30 blur-md" />
      <span className="nb-corner-ai-status absolute bottom-[6%] right-[6%] size-2 rounded-full border border-[#0a1628] bg-emerald-400" />
    </div>
  );
}

export default ComposerAgentOrb;
