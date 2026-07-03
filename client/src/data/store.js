// Слой доступа к данным + клиентская авторизация.
// Работает автономно (демо на GitHub Pages) на seed-данных.
// Правки профиля применяются к ЕДИНОМУ массиву сотрудников, поэтому видны
// и в личном кабинете, и в таблицах/лидербордах.
import { useSyncExternalStore } from 'react';
import { employees as seedEmployees, goals as seedGoals, company } from './seed';

const SESSION_KEY = 'novatech_session';        // id вошедшего сотрудника
const OVERRIDES_KEY = 'novatech_emp_overrides'; // { [id]: patch } — правки профилей
const REPORTS_KEY = 'novatech_reports';
const DEMO_PASSWORD = 'novatech';               // демо-пароль всех аккаунтов (как в seed бэкенда)

// --- Единый источник правды по сотрудникам ---
// Клонируем seed, чтобы не мутировать импортированный модуль между сборками.
const employees = seedEmployees.map(e => ({ ...e, productivity: { ...e.productivity } }));

function loadOverrides() {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}'); }
  catch { return {}; }
}
function applyOverrides() {
  const ov = loadOverrides();
  employees.forEach(e => { if (ov[e.id]) Object.assign(e, ov[e.id]); });
}
applyOverrides();

// --- Подписка для реактивности (auth + правки) ---
const listeners = new Set();
function emit() { listeners.forEach(fn => fn()); }
function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

let sessionId = localStorage.getItem(SESSION_KEY) || null;

// --- Auth ---
export function login(email, password) {
  const emp = employees.find(e => (e.email || '').toLowerCase() === String(email).trim().toLowerCase());
  if (!emp) return { error: 'Пользователь с таким email не найден' };
  if (password !== DEMO_PASSWORD) return { error: 'Неверный пароль' };
  sessionId = emp.id;
  localStorage.setItem(SESSION_KEY, emp.id);
  emit();
  return { user: emp };
}

export function logout() {
  sessionId = null;
  localStorage.removeItem(SESSION_KEY);
  emit();
}

export function getCurrentUser() {
  return employees.find(e => e.id === sessionId) || null;
}

// Хук: перерисовывает компоненты при входе/выходе/правках профиля.
export function useAuth() {
  return useSyncExternalStore(subscribe, () => sessionId);
}

// --- Employees ---
export function getEmployees() {
  return employees;
}

export function getEmployeeById(id) {
  return employees.find(e => e.id === id);
}

export function getServiceColleagues(employee) {
  return employees
    .filter(e => e.department === employee.department && e.service === employee.service)
    .sort((a, b) => b.productivity.week_score - a.productivity.week_score);
}

// Обновляет сотрудника в едином массиве + сохраняет правку.
export function updateEmployee(id, patch) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;
  Object.assign(emp, patch);
  const ov = loadOverrides();
  ov[id] = { ...(ov[id] || {}), ...patch };
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(ov));
  emit();
}

// Правки текущего профиля (используется в личном кабинете).
export function saveProfile(patch) {
  if (!sessionId) return;
  updateEmployee(sessionId, patch);
}

// --- Goals ---
export function getGoals(level) {
  return level ? seedGoals.filter(g => g.level === level) : seedGoals;
}

// --- Reports ---
export function getReports() {
  return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
}

export function addReport(report) {
  const reports = getReports();
  const entry = { id: 'rep_' + Date.now(), created_at: new Date().toISOString(), ...report };
  reports.unshift(entry);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  return entry;
}

export { company };
