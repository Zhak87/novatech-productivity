import { useState } from 'react';

// Настройки, включая веса формулы продуктивности (PRD 4.6 / FR-16).
export default function Settings() {
  const [w, setW] = useState({ completed: 40, progress: 30, timeliness: 20, reports: 10 });
  const total = w.completed + w.progress + w.timeliness + w.reports;
  const [notif, setNotif] = useState({ report: true, goal: true, rank: false });

  return (
    <div>
      <div className="page-head">
        <h1>⚙️ Настройки</h1>
        <p>Уведомления и параметры расчёта продуктивности.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>Веса формулы продуктивности</h3>
          <p className="muted" style={{ marginTop: -6 }}>
            Score = завершённые задачи × {w.completed}% + ср. % выполнения × {w.progress}% +
            своевременность × {w.timeliness}% + кол-во отчётов × {w.reports}%
          </p>
          {[['completed', 'Завершённые задачи'], ['progress', 'Средний % выполнения'],
            ['timeliness', 'Своевременность сдачи'], ['reports', 'Количество отчётов']].map(([k, l]) => (
            <div className="field" key={k}>
              <label>{l}: {w[k]}%</label>
              <input type="range" min="0" max="100" value={w[k]}
                onChange={e => setW({ ...w, [k]: +e.target.value })} />
            </div>
          ))}
          <span className={'badge ' + (total === 100 ? 'green' : 'yellow')}>Сумма весов: {total}%</span>
        </div>

        <div className="card">
          <h3>Уведомления</h3>
          {[['report', 'Новый отчёт в моей службе'], ['goal', 'Изменение цели'], ['rank', 'Обновление рейтинга']].map(([k, l]) => (
            <label key={k} className="flex between" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
              <span>{l}</span>
              <input type="checkbox" style={{ width: 'auto' }} checked={notif[k]}
                onChange={e => setNotif({ ...notif, [k]: e.target.checked })} />
            </label>
          ))}
          <div className="mt"><button className="btn primary">Сохранить настройки</button></div>
        </div>
      </div>
    </div>
  );
}
