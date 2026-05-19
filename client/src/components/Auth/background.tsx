const nodes: ReadonlyArray<{ cx: number; cy: number; r: number; delay: number }> = [
  { cx: 80, cy: 120, r: 3, delay: 0 },
  { cx: 180, cy: 80, r: 4, delay: 0.4 },
  { cx: 320, cy: 100, r: 3, delay: 0.8 },
  { cx: 420, cy: 160, r: 4, delay: 1.2 },
  { cx: 520, cy: 240, r: 3, delay: 0.2 },
  { cx: 640, cy: 180, r: 4, delay: 0.6 },
  { cx: 760, cy: 120, r: 3, delay: 1 },
  { cx: 120, cy: 280, r: 4, delay: 0.3 },
  { cx: 240, cy: 220, r: 5, delay: 0.7 },
  { cx: 380, cy: 260, r: 4, delay: 1.1 },
  { cx: 500, cy: 340, r: 3, delay: 0.5 },
  { cx: 620, cy: 300, r: 4, delay: 0.9 },
  { cx: 740, cy: 380, r: 3, delay: 1.3 },
  { cx: 160, cy: 420, r: 4, delay: 0.15 },
  { cx: 300, cy: 460, r: 3, delay: 0.55 },
  { cx: 440, cy: 420, r: 4, delay: 0.95 },
  { cx: 580, cy: 480, r: 3, delay: 1.35 },
  { cx: 700, cy: 440, r: 4, delay: 0.25 },
];

const edges: ReadonlyArray<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [7, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [8, 14],
  [3, 9],
  [5, 11],
];

function NeuralBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(14,165,233,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(99,102,241,0.14),transparent_45%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="nbLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {edges.map(([from, to], index) => {
          const a = nodes[from];
          const b = nodes[to];
          if (!a || !b) {
            return null;
          }
          return (
            <line
              key={`edge-${index}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="url(#nbLineGrad)"
              strokeWidth="1"
              className="auth-neural-line"
            />
          );
        })}
        {nodes.map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#0ea5e9"
            className="auth-neural-node"
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 24 }, (_, index) => (
          <span
            key={`particle-${index}`}
            className="auth-particle absolute block h-1 w-1 rounded-full bg-sky-400"
            style={{
              left: `${(index * 17) % 100}%`,
              top: `${(index * 23) % 100}%`,
              animationDelay: `${(index % 8) * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default NeuralBackground;
