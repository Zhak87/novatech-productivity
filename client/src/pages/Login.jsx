import { useState } from 'react';
import { login, company, getEmployees } from '../data/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demo = getEmployees().find(e => e.full_name === 'Диана Смагулова') || getEmployees()[1];

  const submit = e => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.error) setError(res.error);
    // при успехе App перерисуется через useAuth и покажет приложение
  };

  const fillDemo = () => { setEmail(demo.email); setPassword('novatech'); };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'grid', placeItems: 'center', padding: 20 }}>
      <div className="card" style={{ width: 400, maxWidth: '100%' }}>
        <div className="logo" style={{ padding: '0 0 18px' }}>
          <span className="mark">{company.logo}</span>
          <span>{company.name}<small>Productivity Platform</small></span>
        </div>
        <h3 style={{ marginTop: 0 }}>Вход в систему</h3>

        <form onSubmit={submit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} autoFocus
              onChange={e => setEmail(e.target.value)} placeholder="d.smagulova@novatech.kz" />
          </div>
          <div className="field">
            <label>Пароль</label>
            <input type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {error && (
            <div className="badge red" style={{ display: 'block', padding: '10px 12px', marginBottom: 14 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center' }}>
            Войти
          </button>
        </form>

        <div className="mt center" style={{ fontSize: 13 }}>
          <p className="muted" style={{ marginBottom: 8 }}>
            Демо-доступ: email любого сотрудника, пароль <strong>novatech</strong>
          </p>
          <button className="btn ghost" onClick={fillDemo} style={{ width: '100%', justifyContent: 'center' }}>
            Заполнить демо-аккаунтом ({demo.full_name})
          </button>
        </div>
      </div>
    </div>
  );
}
