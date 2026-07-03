import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import ProgressBar from './ProgressBar';

// Игровой лидерборд с короной у лидера — используется во всех разделах сравнения (PRD 4.5).
export default function Leaderboard({ list, period = 'week', title = 'Лидерборд отдела' }) {
  const navigate = useNavigate();
  const key = `${period}_score`;
  const sorted = [...list].sort((a, b) => b.productivity[key] - a.productivity[key]);
  const max = sorted[0]?.productivity[key] || 100;

  return (
    <div className="card">
      <h3>🏆 {title}</h3>
      {sorted.map((e, i) => {
        const rank = i + 1;
        const score = e.productivity[key];
        return (
          <div
            key={e.id}
            className={`lb-row ${rank === 1 ? 'top1' : ''}`}
            onClick={() => navigate(`/employees/${e.id}`)}
          >
            <div className="lb-rank">{rank}</div>
            <Avatar employee={e} rank={rank} size={44} />
            <div className="lb-info">
              <div className="nm">{e.full_name}</div>
              <div className="ps">{e.position}</div>
              <div style={{ marginTop: 6 }}>
                <ProgressBar value={(score / max) * 100} />
              </div>
            </div>
            <div className="lb-score">{score}</div>
          </div>
        );
      })}
    </div>
  );
}
