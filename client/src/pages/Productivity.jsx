import { useState } from 'react';
import { getCurrentUser, getServiceColleagues } from '../data/store';
import { trendFor } from '../data/seed';
import ProductivityChart from '../components/ProductivityChart';
import Leaderboard from '../components/Leaderboard';
import { scoreClass } from '../components/ProgressBar';

const periods = [
  { key: 'day', label: 'Продуктивность дня' },
  { key: 'week', label: 'Продуктивность недели' },
  { key: 'month', label: 'Продуктивность месяца' },
];

export default function Productivity() {
  const [period, setPeriod] = useState('week');
  const user = getCurrentUser();
  const colleagues = getServiceColleagues(user);
  const trend = trendFor(user, period);
  const avg = Math.round(trend.reduce((s, p) => s + p.score, 0) / trend.length);
  const cur = user.productivity[`${period}_score`];

  return (
    <div>
      <div className="page-head">
        <h1>📊 Продуктивность работы</h1>
        <p>Тренд вашей продуктивности и лидерборд службы «{user.service}».</p>
      </div>

      <div className="tabs">
        {periods.map(p => (
          <div key={p.key} className={'tab' + (period === p.key ? ' active' : '')}
            onClick={() => setPeriod(p.key)}>{p.label}</div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="flex between">
            <h3 style={{ margin: 0 }}>Мой график</h3>
            <span className={`badge ${scoreClass(cur)}`}>текущий: {cur}</span>
          </div>
          <div style={{ marginTop: 14 }}>
            <ProductivityChart data={trend} average={avg} />
          </div>
          <div className="grid grid-3 mt">
            <div className="stat"><span className="lbl">Текущий</span><span className="val" style={{ fontSize: 22 }}>{cur}</span></div>
            <div className="stat"><span className="lbl">Среднее</span><span className="val" style={{ fontSize: 22 }}>{avg}</span></div>
            <div className="stat"><span className="lbl">Уровень</span><span className="val" style={{ fontSize: 22 }}>
              {cur >= 85 ? 'Legend' : cur >= 70 ? 'Star' : cur >= 55 ? 'Pro' : 'Junior'}</span></div>
          </div>
        </div>

        <Leaderboard list={colleagues} period={period} title={`Лидерборд · ${user.service}`} />
      </div>
    </div>
  );
}
