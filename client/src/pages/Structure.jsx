import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../data/store';
import { departments } from '../data/seed';

function Node({ label, role, onClick, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = !!children;
  return (
    <div>
      <div className="tree-item" onClick={() => (hasChildren ? setOpen(o => !o) : onClick?.())}>
        {hasChildren && <span>{open ? '▾' : '▸'}</span>}
        <span>{label}</span>
        {role && <span className="role">· {role}</span>}
      </div>
      {open && children && <div className="tree-node">{children}</div>}
    </div>
  );
}

export default function Structure() {
  const navigate = useNavigate();
  const all = getEmployees();
  const ceo = all.find(e => e.role === 'ceo');

  const servicesByDept = dept => {
    const emps = all.filter(e => e.department === dept);
    return [...new Set(emps.map(e => e.service))];
  };

  return (
    <div>
      <div className="page-head">
        <h1>🏢 Структура компании</h1>
        <p>Интерактивная орг-схема: CEO → департаменты → службы → сотрудники. Кликните по узлу.</p>
      </div>

      <div className="card">
        <Node label={`👑 ${ceo.full_name}`} role={ceo.position} defaultOpen>
          {departments.map(dept => {
            const head = all.find(e => e.department === dept && e.role === 'department_head');
            return (
              <Node key={dept} label={`🏢 ${dept}`} role={head ? `Head: ${head.full_name}` : ''}>
                {servicesByDept(dept).filter(s => !s.includes('руководство')).map(svc => {
                  const lead = all.find(e => e.department === dept && e.service === svc && e.role === 'team_lead');
                  const members = all.filter(e => e.department === dept && e.service === svc && e.role === 'employee');
                  return (
                    <Node key={svc} label={`📁 ${svc}`} role={lead ? `Lead: ${lead.full_name}` : ''}>
                      {lead && (
                        <div className="tree-item" onClick={() => navigate(`/employees/${lead.id}`)}>
                          👤 {lead.full_name} <span className="role">· {lead.position}</span>
                        </div>
                      )}
                      {members.map(m => (
                        <div key={m.id} className="tree-item" onClick={() => navigate(`/employees/${m.id}`)}>
                          👤 {m.full_name} <span className="role">· {m.position}</span>
                        </div>
                      ))}
                    </Node>
                  );
                })}
              </Node>
            );
          })}
        </Node>
      </div>
    </div>
  );
}
