function getPoint(value, index, total, center, radius) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
  const scaledRadius = radius * (value / 100);

  return [
    center + Math.cos(angle) * scaledRadius,
    center + Math.sin(angle) * scaledRadius,
  ];
}

function buildPath(points) {
  return `M ${points.map(([x, y]) => `${x},${y}`).join(" L ")} Z`;
}

export default function RadarChart({ categories }) {
  const center = 160;
  const radius = 112;
  const levels = [20, 40, 60, 80, 100];
  const total = categories.length;
  const dataPoints = categories.map((item, index) =>
    getPoint(item.value, index, total, center, radius),
  );

  return (
    <div className="radar-chart-shell">
      <svg viewBox="0 0 320 320" className="radar-chart" role="img" aria-label="Skills radar chart">
        {levels.map((level) => {
          const levelPoints = categories.map((_, index) =>
            getPoint(level, index, total, center, radius),
          );

          return (
            <polygon
              key={level}
              points={levelPoints.map(([x, y]) => `${x},${y}`).join(" ")}
              className="radar-grid"
            />
          );
        })}

        {categories.map((item, index) => {
          const [x, y] = getPoint(100, index, total, center, radius);

          return (
            <g key={item.label}>
              <line x1={center} y1={center} x2={x} y2={y} className="radar-axis" />
              <text x={x} y={y} className="radar-label" textAnchor="middle">
                {item.label}
              </text>
            </g>
          );
        })}

        <path d={buildPath(dataPoints)} className="radar-surface" />

        {dataPoints.map(([x, y], index) => (
          <circle
            key={categories[index].label}
            cx={x}
            cy={y}
            r="4.5"
            className="radar-dot"
          />
        ))}
      </svg>
    </div>
  );
}
