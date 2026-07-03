export default function ProgressBar({ value }) {
  return (
    <div className="xp" aria-label={`Прогресс ${value}%`}>
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function scoreClass(v) {
  return v >= 75 ? 'green' : v >= 50 ? 'yellow' : 'red';
}
