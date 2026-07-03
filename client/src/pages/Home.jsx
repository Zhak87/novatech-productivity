import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getGoals, getReports } from '../data/store';
import { scoreClass } from '../components/ProgressBar';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const user = getCurrentUser();
  const companyGoal = getGoals('company')[0];
  const reports = getReports();
  const [showOnboard, setShowOnboard] = useState(
    localStorage.getItem('novatech_onboard_hidden') !== '1'
  );

  const hideOnboard = () => {
    localStorage.setItem('novatech_onboard_hidden', '1');
    setShowOnboard(false);
  };

  return (
    <div>
      <div className="page-head">
        <h1>Добро пожаловать, {user.full_name.split(' ')[0]}! 👋</h1>
        <p>Ваша сводка продуктивности и целей на сегодня.</p>
      </div>

      {showOnboard && (
        <div className="card" style={{ marginBottom: 18, borderColor: 'var(--brand)' }}>
          <div className="flex between">
            <h3 style={{ margin: 0 }}>Что это за платформа?</h3>
            <button className="btn ghost" onClick={hideOnboard}>Скрыть ✕</button>
          </div>
          <p className="muted" style={{ marginBottom: 0 }}>
            NovaTech — внутренняя платформа учёта продуктивности. Фиксируйте выполненную работу,
            отмечайте прогресс по личным, командным и корпоративным целям и следите за рейтингом
            своего отдела в игровом стиле — с короной 👑 у лидера. Начните с кнопки
            «Добавить отчёт».
          </p>
        </div>
      )}

      <div className="grid grid-4" style={{ marginBottom: 18 }}>
        <div className="card stat">
          <span className="lbl">Продуктивность сегодня</span>
          <span className="val">{user.productivity.day_score}
            <span className={`badge ${scoreClass(user.productivity.day_score)}`} style={{ marginLeft: 10, fontSize: 12 }}>
              {scoreClass(user.productivity.day_score) === 'green' ? 'высокая' : scoreClass(user.productivity.day_score) === 'yellow' ? 'средняя' : 'низкая'}
            </span>
          </span>
          <ProgressBar value={user.productivity.day_score} />
        </div>
        <div className="card stat">
          <span className="lbl">За неделю</span>
          <span className="val">{user.productivity.week_score}</span>
          <ProgressBar value={user.productivity.week_score} />
        </div>
        <div className="card stat">
          <span className="lbl">Ранг в службе</span>
          <span className="val">#{user.productivity.rank_in_service}</span>
          <span className="muted" style={{ fontSize: 13 }}>{user.service}</span>
        </div>
        <div className="card stat">
          <span className="lbl">Отправлено отчётов</span>
          <span className="val">{reports.length}</span>
          <Link to="/report" className="btn primary" style={{ marginTop: 6 }}>＋ Добавить отчёт</Link>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>🎯 Ближайшая цель компании</h3>
          {companyGoal && (
            <>
              <div className="flex between">
                <strong>{companyGoal.title}</strong>
                <span className="chip">до {companyGoal.deadline}</span>
              </div>
              <div style={{ margin: '14px 0 6px' }}><ProgressBar value={companyGoal.progress} /></div>
              <span className="muted">{companyGoal.progress}% выполнено · владелец: {companyGoal.owner}</span>
            </>
          )}
          <div className="mt"><Link to="/goals" className="btn ghost">Все цели →</Link></div>
        </div>

        <div className="card">
          <h3>🔔 Последние отчёты</h3>
          {reports.length === 0 && <p className="muted">Пока нет отчётов. Добавьте первый!</p>}
          {reports.slice(0, 4).map(r => (
            <div key={r.id} className="lb-row" style={{ cursor: 'default' }}>
              <span style={{ fontSize: 20 }}>{r.type === 'text' ? '📝' : r.type === 'doc' ? '📄' : '📊'}</span>
              <div className="lb-info">
                <div className="nm">{r.title || 'Отчёт о работе'}</div>
                <div className="ps">{new Date(r.created_at).toLocaleString('ru-RU')}</div>
              </div>
              <span className={`badge ${scoreClass(r.progress)}`}>{r.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
