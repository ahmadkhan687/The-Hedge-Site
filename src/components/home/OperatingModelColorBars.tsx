const bars = [
  { width: 65, color: "#E83387" },
  { width: 18, color: "#F08A22" },
  { width: 19, color: "#D7A92C" },
  { width: 19, color: "#19B8B7" },
  { width: 18, color: "#23B6D2" },
];

export default function OperatingModelColorBars() {
  return (
    <div className="flex items-center gap-[6px]" aria-hidden="true">
      {bars.map((bar) => (
        <span
          key={bar.color}
          className="h-[9px] shrink-0"
          style={{ width: bar.width, backgroundColor: bar.color }}
        />
      ))}
    </div>
  );
}
