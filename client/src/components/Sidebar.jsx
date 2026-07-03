import { NavLink } from 'react-router-dom';
import { company } from '../data/store';

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
