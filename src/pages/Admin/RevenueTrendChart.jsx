const WIDTH = 700;
const HEIGHT = 220;
const BAR_GAP = 16;
const BOTTOM_PADDING = 28;
const TOP_PADDING = 16;

export default function RevenueTrendChart({ data }) {
  const max = Math.max(1, ...data.map((d) => Number(d.revenue)));
  const chartHeight = HEIGHT - BOTTOM_PADDING - TOP_PADDING;
  const barWidth = (WIDTH - BAR_GAP * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-56 w-full">
      {data.map((point, i) => {
        const revenue = Number(point.revenue);
        const isZero = revenue === 0;
        const barHeight = isZero ? 3 : Math.max((revenue / max) * chartHeight, 4);
        const x = i * (barWidth + BAR_GAP);
        const y = HEIGHT - BOTTOM_PADDING - barHeight;
        const label = new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <g key={point.date}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={6}
              className={isZero ? 'fill-gray-200' : 'fill-primary-500'}
            />
            <text
              x={x + barWidth / 2}
              y={HEIGHT - BOTTOM_PADDING + 18}
              textAnchor="middle"
              className="fill-ink-400 text-[11px] font-medium"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
