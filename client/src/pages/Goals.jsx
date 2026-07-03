import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getGoals, getCurrentUser, getServiceColleagues } from '../data/store';
import ProgressBar from '../components/ProgressBar';
import Avatar from '../components/Avatar';

const tabs = [
  { key: 'personal', label: 'Моя цель' },
  { key: 'team', label: 'Цель команды' },
  { key: 'company', label: 'Цель компании' },
];

function Donut({ value }) {
  const data = [{ v: value }, { v: 100 - value }];
  return (
    <div style={{ position: 'relative', width: 140, height: 140 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="v" innerRadius={52} outerRadius={68} startAngle={90} endAngle={-270} stroke="none">
            <Cell fill="#6c5ce7" />
            <Cell fill="#232842" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 800 }}>
        {value}%
      </div>
    </div>
  );
}

export default function Goals() {
  const [tab, setTab] = useState('personal');
  const user = getCurrentUser();
  const goals = getGoals(tab);
  const colleagues = getServiceColleagues(user);

  return (
    <div>
      <div className="page-head">
        <h1>🎯 Цели</h1>
        <p>Личные, командные и общекорпоративные цели с прогрессом.</p>
      </div>

      <div className="tabs">
        {tabs.map(t => (
          <div key={t.key} className={'tab' + (tab === t.key ? ' active' : '')} onClick={() => setTab(t.key)}>
            {t.label}
          </div>
        ))}
      </div>

      <div className="grid" style={{ gap: 18 }}>
        {goals.map(g => (
          <div key={g.goal_id} className="card">
            <div className="flex between" style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div className="flex between">
                  <h3 style={{ margin: 0 }}>{g.title}</h3>
                  <span className="chip">до {g.deadline}</span>
                </div>
                <p className="muted" style={{ marginTop: 6 }}>
                  Уровень: {g.level === 'company' ? 'компания' : g.level === 'team' ? 'команда' : 'личная'} · владелец: {g.owner}
                </p>
                <div style={{ margin: '10px 0 6px' }}><ProgressBar value={g.progress} /></div>
                <span className="muted">{g.progress}% выполнено</span>
              </div>
              <div style={{ marginLeft: 20 }}><Donut value={g.progress} /></div>
            </div>
          </div>
        ))}
        {goals.length === 0 && <div className="card muted">Целей этого уровня пока нет.</div>}

        {tab === 'team' && (
          <div className="card">
            <h3>🤝 Вклад участников службы</h3>
            {colleagues.map((e, i) => (
              <div key={e.id} className="lb-row" style={{ cursor: 'default' }}>
                <Avatar employee={e} rank={i + 1} size={40} />
                <div className="lb-info">
                  <div className="nm">{e.full_name}</div>
                  <div style={{ marginTop: 6 }}><ProgressBar value={e.productivity.week_score} /></div>
                </div>
                <span className="lb-score">{e.productivity.week_score}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
