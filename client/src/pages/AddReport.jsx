import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addReport, getGoals } from '../data/store';

export default function AddReport() {
  const navigate = useNavigate();
  const goals = getGoals();
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [goalId, setGoalId] = useState(goals[0]?.goal_id || '');
  const [progress, setProgress] = useState(50);
  const [completed, setCompleted] = useState(false);

  const submit = e => {
    e.preventDefault();
    addReport({
      type, title: title || 'Отчёт о работе', content,
      file_name: fileName, related_goal_id: goalId,
      progress: completed ? 100 : progress, completed,
    });
    navigate('/');
  };

  return (
    <div>
      <div className="page-head">
        <h1>➕ Добавить отчёт о работе</h1>
        <p>Зафиксируйте выполненную работу и прогресс по цели.</p>
      </div>

      <form className="card" onSubmit={submit} style={{ maxWidth: 720 }}>
        <div className="field">
          <label>Тип отчёта</label>
          <div className="tabs" style={{ marginBottom: 0 }}>
            {[['text', '📝 Текст'], ['doc', '📄 Документ (Word/PDF)'], ['excel', '📊 Excel']].map(([k, l]) => (
              <div key={k} className={'tab' + (type === k ? ' active' : '')} onClick={() => setType(k)}>{l}</div>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Заголовок</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Что сделано сегодня" />
        </div>

        {type === 'text' ? (
          <div className="field">
            <label>Описание работы</label>
            <textarea rows={5} value={content} onChange={e => setContent(e.target.value)}
              placeholder="Опишите выполненные задачи..." />
          </div>
        ) : (
          <div className="field">
            <label>Прикрепить файл ({type === 'excel' ? 'Excel' : 'Word/PDF'})</label>
            <input type="file" onChange={e => setFileName(e.target.files?.[0]?.name || '')} />
            {fileName && <p className="muted" style={{ marginTop: 6 }}>Выбрано: {fileName}</p>}
          </div>
        )}

        <div className="field">
          <label>Связанная цель</label>
          <select value={goalId} onChange={e => setGoalId(e.target.value)}>
            {goals.map(g => <option key={g.goal_id} value={g.goal_id}>[{g.level}] {g.title}</option>)}
          </select>
        </div>

        <div className="field">
          <label>% выполнения: {completed ? 100 : progress}%</label>
          <input type="range" min="0" max="100" value={completed ? 100 : progress}
            disabled={completed} onChange={e => setProgress(+e.target.value)} />
        </div>

        <label className="flex" style={{ cursor: 'pointer' }}>
          <input type="checkbox" style={{ width: 'auto' }} checked={completed}
            onChange={e => setCompleted(e.target.checked)} /> Задача завершена
        </label>

        <div className="flex mt">
          <button type="submit" className="btn primary">Отправить отчёт</button>
          <button type="button" className="btn ghost" onClick={() => navigate('/')}>Отмена</button>
        </div>
      </form>
    </div>
  );
}
