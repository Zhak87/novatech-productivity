import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, saveProfile } from '../data/store';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {
  const user = getCurrentUser();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    full_name: user.full_name, position: user.position,
    email: user.email, phone: user.phone || '+7 700 000 00 00',
  });

  const save = () => { saveProfile(form); setEdit(false); };

  return (
    <div>
      <div className="page-head">
        <h1>🧑 Личный кабинет</h1>
        <p>Ваши данные, фото и продуктивность.</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="flex between">
            <h3 style={{ margin: 0 }}>Профиль</h3>
            {!edit
              ? <button className="btn" onClick={() => setEdit(true)}>✏️ Редактировать</button>
              : <div className="flex"><button className="btn primary" onClick={save}>Сохранить</button>
                  <button className="btn ghost" onClick={() => setEdit(false)}>Отмена</button></div>}
          </div>

          <div className="flex" style={{ gap: 18, margin: '16px 0' }}>
            <Avatar employee={user} size={80} rank={user.productivity.rank_in_service} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{form.full_name}</div>
              <div className="muted">{form.position}</div>
              {edit && <label style={{ marginTop: 8, cursor: 'pointer' }} className="chip">📷 Загрузить фото (drag&drop)</label>}
            </div>
          </div>

          {['full_name', 'position', 'email', 'phone'].map(k => (
            <div className="field" key={k}>
              <label>{{ full_name: 'ФИО', position: 'Должность', email: 'Email', phone: 'Телефон' }[k]}</label>
              <input disabled={!edit} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <div className="row">
            <div className="field"><label>Департамент</label><input disabled value={user.department} /></div>
            <div className="field"><label>Служба</label><input disabled value={user.service} /></div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 18 }}>
            <h3>Моя продуктивность</h3>
            {['day', 'week', 'month'].map(p => (
              <div key={p} style={{ marginBottom: 14 }}>
                <div className="flex between"><span className="muted">{p === 'day' ? 'День' : p === 'week' ? 'Неделя' : 'Месяц'}</span>
                  <strong>{user.productivity[`${p}_score`]}</strong></div>
                <ProgressBar value={user.productivity[`${p}_score`]} />
              </div>
            ))}
          </div>
          <div className="card center">
            <h3>Быстрые действия</h3>
            <Link to="/report" className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>＋ Добавить отчёт о работе</Link>
            <Link to="/productivity" className="btn ghost mt" style={{ width: '100%', justifyContent: 'center' }}>📊 Мой дашборд</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
