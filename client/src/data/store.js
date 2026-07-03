// Слой доступа к данным. По умолчанию — локальные seed-данные (демо на GitHub Pages).
// Отчёты хранятся в localStorage, чтобы демо было интерактивным без бэкенда.
import { employees, goals as seedGoals, company } from './seed';

const REPORTS_KEY = 'novatech_reports';
const PROFILE_KEY = 'novatech_profile';

export function getEmployees() {
  return employees;
}

export function getEmployeeById(id) {
  return employees.find(e => e.id === id);
}

// «Текущий пользователь» демо — Диана Смагулова (Frontend Developer из PRD)
export function getCurrentUser() {
  const saved = localStorage.getItem(PROFILE_KEY);
  const base = employees.find(e => e.full_name === 'Диана Смагулова') || employees[1];
  if (saved) return { ...base, ...JSON.parse(saved) };
  return base;
}

export function saveProfile(patch) {
  const cur = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...cur, ...patch }));
}

// Сотрудники того же отдела/службы (для лидерборда)
export function getServiceColleagues(employee) {
  return employees
    .filter(e => e.department === employee.department && e.service === employee.service)
    .sort((a, b) => b.productivity.week_score - a.productivity.week_score);
}

export function getGoals(level) {
  return level ? seedGoals.filter(g => g.level === level) : seedGoals;
}

export function getReports() {
  return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
}

export function addReport(report) {
  const reports = getReports();
  const entry = {
    id: 'rep_' + Date.now(),
    created_at: new Date().toISOString(),
    ...report,
  };
  reports.unshift(entry);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return entry;
}

export { company };
