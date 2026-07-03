import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine,
} from 'recharts';

// Линейный/площадной график тренда продуктивности с линией личного среднего.
export default function ProductivityChart({ data, average }) {
  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#00d2a8" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3350" />
          <XAxis dataKey="label" stroke="#9aa0c3" fontSize={12} />
          <YAxis domain={[0, 100]} stroke="#9aa0c3" fontSize={12} />
          <Tooltip
            contentStyle={{ background: '#1c2038', border: '1px solid #2d3350', borderRadius: 12, color: '#e8eaf6' }}
          />
          {average != null && (
            <ReferenceLine y={average} stroke="#f7b731" strokeDasharray="5 5"
              label={{ value: `среднее ${average}`, fill: '#f7b731', fontSize: 11, position: 'insideTopRight' }} />
          )}
          <Area type="monotone" dataKey="score" stroke="#8b7df0" strokeWidth={3} fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
