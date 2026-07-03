import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, getServiceColleagues } from '../data/store';
import { trendFor } from '../data/seed';
import ProductivityChart from '../components/ProductivityChart';
import Avatar from '../components/Avatar';
import ProgressBar, { scoreClass } from '../components/ProgressBar';

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const e = getEmployeeById(id);

  if (!e) return <div className="card">Сотрудник не найден. <button className="btn" onClick={() => navigate('/employees')}>← Назад</button></div>;

  const colleagues = getServiceColleagues(e);
  const trend = trendFor(e, 'week');

  return (
    <div>
      <button className="btn ghost" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← Назад</button>

      <div className="grid grid-2">
        <div className="card">
          <div className="flex" style={{ gap: 18 }}>
            <Avatar employee={e} size={84} rank={e.productivity.rank_in_service} />
            <div>
              <h2 style={{ margin: '0 0 4px' }}>{e.full_name}</h2>
              <div className="muted">{e.position}</div>
              <div style={{ marginTop: 8 }}>
                <span className="chip">{e.department}</span>{' '}
                <span className="chip">{e.service}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-3 mt">
            <div className="stat"><span className="lbl">Email</span><strong style={{ fontSize: 13 }}>{e.email}</strong></div>
            <div className="stat"><span className="lbl">Дата найма</span><strong style={{ fontSize: 13 }}>{e.hire_date}</strong></div>
            <div className="stat"><span className="lbl">Ранг в службе</span><strong>#{e.productivity.rank_in_service}</strong></div>
          </div>
          <div className="grid grid-3 mt">
            {['day', 'week', 'month'].map(p => (
              <div key={p} className="stat">
                <span className="lbl">{p === 'day' ? 'День' : p === 'week' ? 'Неделя' : 'Месяц'}</span>
                <span className="val" style={{ fontSize: 22 }}>{e.productivity[`${p}_score`]}</span>
                <ProgressBar value={e.productivity[`${p}_score`]} />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>История продуктивности (неделя)</h3>
          <ProductivityChart data={trend} />
          <h3 style={{ marginTop: 18 }}>Место в рейтинге службы</h3>
          {colleagues.slice(0, 5).map((c, i) => (
            <div key={c.id} className={'lb-row' + (c.id === e.id ? ' top1' : '')} style={{ cursor: 'default' }}>
              <div className="lb-rank">{i + 1}</div>
              <Avatar employee={c} size={34} rank={i + 1} />
              <div className="lb-info"><div className="nm">{c.full_name}</div></div>
              <span className={`badge ${scoreClass(c.productivity.week_score)}`}>{c.productivity.week_score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
