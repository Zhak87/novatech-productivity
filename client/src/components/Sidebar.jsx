import { NavLink } from 'react-router-dom';
import { company, getCurrentUser, logout } from '../data/store';
import Avatar from './Avatar';

const items = [
  { to: '/', ic: '🏠', label: 'Главная', end: true },
  { to: '/profile', ic: '🧑', label: 'Личный кабинет' },
  { to: '/productivity', ic: '📊', label: 'Продуктивность' },
  { to: '/goals', ic: '🎯', label: 'Цели' },
  { to: '/employees', ic: '👥', label: 'Сотрудники' },
  { to: '/structure', ic: '🏢', label: 'Структура' },
  { to: '/settings', ic: '⚙️', label: 'Настройки' },
];

export default function Sidebar() {
  const user = getCurrentUser();
  return (
    <>
      <aside className="sidebar">
        <NavLink to="/" className="logo">
          <span className="mark">{company.logo}</span>
          <span>{company.name}<small>Productivity Platform</small></span>
        </NavLink>
        <nav>
          {items.map(it => (
            <NavLink key={it.to} to={it.to} end={it.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              <span className="ic">{it.ic}</span> {it.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="sidebar-user">
            <NavLink to="/profile" className="flex" style={{ minWidth: 0, flex: 1 }}>
              <Avatar employee={user} size={36} rank={user.productivity.rank_in_service} />
              <div style={{ minWidth: 0 }}>
                <div className="nm" style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.full_name}
                </div>
                <div className="muted" style={{ fontSize: 11 }}>{user.position}</div>
              </div>
            </NavLink>
            <button className="btn ghost" title="Выйти" onClick={logout}
              style={{ padding: '8px 10px' }}>⎋</button>
          </div>
        )}
        <div className="sidebar-foot">© 2026 NovaTech · v1.0</div>
      </aside>

      <nav className="mobile-bar">
        {items.map(it => (
          <NavLink key={it.to} to={it.to} end={it.end}
            className={({ isActive }) => (isActive ? 'active' : '')} title={it.label}>
            {it.ic}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
