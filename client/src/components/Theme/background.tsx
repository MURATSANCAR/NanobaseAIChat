import { NB_PALETTE } from './palette';

const PARTICLE_COUNT = 48;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 4) % 97}%`,
  top: `${(i * 19 + 6) % 94}%`,
  size: 2 + (i % 4),
  color: NB_PALETTE[i % NB_PALETTE.length],
  delay: `${(i % 14) * 0.12}s`,
  duration: `${2.2 + (i % 6) * 0.35}s`,
}));

function ColorfulBackground() {
  return (
    <div className="nb-colorful-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="nb-colorful-aurora nb-colorful-aurora-a" />
      <div className="nb-colorful-aurora nb-colorful-aurora-b" />
      <div className="nb-colorful-aurora nb-colorful-aurora-c" />
      <div className="nb-colorful-scan" />
      {particles.map((p) => (
        <span
          key={p.id}
          className="nb-colorful-particle"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              ['--nb-dur' as string]: p.duration,
              ['--nb-delay' as string]: p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default ColorfulBackground;
