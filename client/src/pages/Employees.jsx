import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../data/store';
import { departments } from '../data/seed';
import Avatar from '../components/Avatar';
import { scoreClass } from '../components/ProgressBar';

export default function Employees() {
  const navigate = useNavigate();
  const all = getEmployees();
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('');
  const [minScore, setMinScore] = useState(0);

  const filtered = useMemo(() => {
    return all.filter(e =>
      (!q || e.full_name.toLowerCase().includes(q.toLowerCase()) || e.position.toLowerCase().includes(q.toLowerCase())) &&
      (!dept || e.department === dept) &&
      e.productivity.week_score >= minScore
    ).sort((a, b) => b.productivity.week_score - a.productivity.week_score);
  }, [q, dept, minScore, all]);

  return (
    <div>
      <div className="page-head">
        <h1>👥 Сотрудники</h1>
        <p>Все сотрудники компании с фильтрами и поиском. Найдено: {filtered.length}.</p>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="row">
          <div>
            <label>Поиск по имени / должности</label>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Например, Диана или Developer" />
          </div>
          <div>
            <label>Департамент</label>
            <select value={dept} onChange={e => setDept(e.target.value)}>
              <option value="">Все департаменты</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label>Мин. продуктивность: {minScore}</label>
            <input type="range" min="0" max="100" value={minScore} onChange={e => setMinScore(+e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Сотрудник</th><th>Должность</th><th>Департамент / Служба</th><th>Продуктивность</th><th>Ранг</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} onClick={() => navigate(`/employees/${e.id}`)}>
                <td>
                  <div className="flex">
                    <Avatar employee={e} size={38} rank={e.productivity.rank_in_service} />
                    <strong>{e.full_name}</strong>
                  </div>
                </td>
                <td>{e.position}</td>
                <td className="muted">{e.department}<br /><span style={{ fontSize: 12 }}>{e.service}</span></td>
                <td><span className={`badge ${scoreClass(e.productivity.week_score)}`}>{e.productivity.week_score}</span></td>
                <td>#{e.productivity.rank_in_service}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
