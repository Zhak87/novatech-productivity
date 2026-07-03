// Демо-данные компании "NovaTech" (см. PRD раздел 6).
// Используются как для frontend-демо (GitHub Pages), так и как источник для seed-скрипта бэкенда.

// Детерминированный псевдо-рандом, чтобы очки были стабильны между сборками
function scoreFor(seed, base, spread) {
  const x = Math.sin(seed * 999.13) * 10000;
  const frac = x - Math.floor(x);
  return Math.round(base + frac * spread);
}

// Аватар-плейсхолдер (DiceBear, без внешних зависимостей в рантайме приложения)
export function avatarUrl(name) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&fontWeight=600`;
}

const raw = [
  // Департамент продаж
  { dept: 'Департамент продаж', service: '— (руководство)', name: 'Айгерим Сатпаева', position: 'Руководитель департамента продаж', role: 'department_head' },
  { dept: 'Департамент продаж', service: 'Служба B2B продаж', name: 'Данияр Оспанов', position: 'Руководитель службы B2B', role: 'team_lead' },
  { dept: 'Департамент продаж', service: 'Служба B2B продаж', name: 'Мадина Кульжанова', position: 'Менеджер по продажам', role: 'employee' },
  { dept: 'Департамент продаж', service: 'Служба B2B продаж', name: 'Ерлан Тасбулатов', position: 'Менеджер по продажам', role: 'employee' },
  { dept: 'Департамент продаж', service: 'Служба B2B продаж', name: 'Дильназ Абдрахманова', position: 'Junior Sales Manager', role: 'employee' },
  { dept: 'Департамент продаж', service: 'Служба B2C продаж', name: 'Асель Нурлановна', position: 'Руководитель службы B2C', role: 'team_lead' },
  { dept: 'Департамент продаж', service: 'Служба B2C продаж', name: 'Тимур Жаксыбеков', position: 'Менеджер по продажам', role: 'employee' },
  { dept: 'Департамент продаж', service: 'Служба B2C продаж', name: 'Сабина Каримова', position: 'Менеджер по продажам', role: 'employee' },

  // Департамент маркетинга
  { dept: 'Департамент маркетинга', service: '— (руководство)', name: 'Бекзат Ильясов', position: 'Руководитель департамента маркетинга', role: 'department_head' },
  { dept: 'Департамент маркетинга', service: 'Служба digital-маркетинга', name: 'Жанна Мусаева', position: 'Руководитель digital-маркетинга', role: 'team_lead' },
  { dept: 'Департамент маркетинга', service: 'Служба digital-маркетинга', name: 'Алия Токтарова', position: 'SMM-менеджер', role: 'employee' },
  { dept: 'Департамент маркетинга', service: 'Служба digital-маркетинга', name: 'Нурсултан Бекенов', position: 'Таргетолог', role: 'employee' },
  { dept: 'Департамент маркетинга', service: 'Служба digital-маркетинга', name: 'Камила Сериккызы', position: 'Контент-менеджер', role: 'employee' },
  { dept: 'Департамент маркетинга', service: 'Служба бренд-маркетинга', name: 'Руслан Дюсенов', position: 'Руководитель бренд-маркетинга', role: 'team_lead' },
  { dept: 'Департамент маркетинга', service: 'Служба бренд-маркетинга', name: 'Аружан Балтабаева', position: 'Бренд-менеджер', role: 'employee' },
  { dept: 'Департамент маркетинга', service: 'Служба бренд-маркетинга', name: 'Санжар Оралбаев', position: 'Дизайнер', role: 'employee' },

  // Департамент разработки (IT)
  { dept: 'Департамент разработки (IT)', service: '— (руководство)', name: 'Виктор Ким', position: 'Руководитель IT-департамента', role: 'department_head' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Frontend', name: 'Алмас Жумабеков', position: 'Frontend Team Lead', role: 'team_lead' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Frontend', name: 'Диана Смагулова', position: 'Frontend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Frontend', name: 'Артём Литвиненко', position: 'Frontend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Frontend', name: 'Гульнур Ахметова', position: 'Junior Frontend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Backend', name: 'Павел Сергеев', position: 'Backend Team Lead', role: 'team_lead' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Backend', name: 'Марат Байжанов', position: 'Backend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Backend', name: 'Айдана Мукатова', position: 'Backend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба Backend', name: 'Ислам Нурпеисов', position: 'Junior Backend Developer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба QA', name: 'Ольга Дмитриева', position: 'QA Team Lead', role: 'team_lead' },
  { dept: 'Департамент разработки (IT)', service: 'Служба QA', name: 'Жасулан Кенжебаев', position: 'QA Engineer', role: 'employee' },
  { dept: 'Департамент разработки (IT)', service: 'Служба QA', name: 'Валентина Ли', position: 'QA Engineer', role: 'employee' },

  // Департамент HR
  { dept: 'Департамент HR', service: '— (руководство)', name: 'Гульмира Сарсенова', position: 'Руководитель HR-департамента', role: 'department_head' },
  { dept: 'Департамент HR', service: 'Служба подбора персонала', name: 'Асхат Нургалиев', position: 'Руководитель подбора', role: 'team_lead' },
  { dept: 'Департамент HR', service: 'Служба подбора персонала', name: 'Динара Жандарбекова', position: 'HR Recruiter', role: 'employee' },
  { dept: 'Департамент HR', service: 'Служба подбора персонала', name: 'Алина Пак', position: 'HR Recruiter', role: 'employee' },
  { dept: 'Департамент HR', service: 'Служба обучения и развития', name: 'Ботагоз Кабдулова', position: 'Руководитель L&D', role: 'team_lead' },
  { dept: 'Департамент HR', service: 'Служба обучения и развития', name: 'Ержан Смаилов', position: 'L&D Specialist', role: 'employee' },

  // Департамент финансов
  { dept: 'Департамент финансов', service: '— (руководство)', name: 'Марина Волкова', position: 'Руководитель финансового департамента', role: 'department_head' },
  { dept: 'Департамент финансов', service: 'Служба бухгалтерии', name: 'Светлана Ким', position: 'Главный бухгалтер', role: 'team_lead' },
  { dept: 'Департамент финансов', service: 'Служба бухгалтерии', name: 'Наталья Ефимова', position: 'Бухгалтер', role: 'employee' },
  { dept: 'Департамент финансов', service: 'Служба бухгалтерии', name: 'Дархан Утеулиев', position: 'Бухгалтер', role: 'employee' },
  { dept: 'Департамент финансов', service: 'Служба финансового анализа', name: 'Рустем Алдабергенов', position: 'Руководитель фин. анализа', role: 'team_lead' },
  { dept: 'Департамент финансов', service: 'Служба финансового анализа', name: 'Карина Джаксыбекова', position: 'Финансовый аналитик', role: 'employee' },
];

function translit(name) {
  const map = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',' ':'.' };
  return name.toLowerCase().split('').map(c => map[c] ?? c).join('');
}

// CEO
export const ceo = {
  id: 'emp_0001',
  full_name: 'Ержан Абенов',
  position: 'Генеральный директор',
  department: '—',
  service: '—',
  role: 'ceo',
  email: 'e.abenov@novatech.kz',
  hire_date: '2019-01-15',
  avatar_url: avatarUrl('Ержан Абенов'),
  productivity: { day_score: 91, week_score: 88, month_score: 90, rank_in_service: 1 },
};

// Сборка сотрудников с id и очками
export const employees = [ceo, ...raw.map((r, i) => {
  const seed = i + 5;
  const day = scoreFor(seed, 55, 45);
  const week = Math.round((day + scoreFor(seed + 1, 50, 45)) / 2);
  const month = Math.round((week + scoreFor(seed + 2, 55, 40)) / 2);
  const first = r.name.split(' ')[0].toLowerCase();
  const last = r.name.split(' ')[1] || '';
  return {
    id: `emp_${String(i + 2).padStart(4, '0')}`,
    full_name: r.name,
    position: r.position,
    department: r.dept,
    service: r.service,
    role: r.role,
    email: `${translit(first)[0]}.${translit(last)}@novatech.kz`,
    hire_date: `202${2 + (i % 4)}-0${1 + (i % 9)}-1${i % 9}`,
    avatar_url: avatarUrl(r.name),
    productivity: {
      day_score: Math.min(100, day),
      week_score: Math.min(100, week),
      month_score: Math.min(100, month),
      rank_in_service: 0,
    },
  };
})];

// Проставляем ранги внутри службы (по недельному скору)
const byService = {};
employees.forEach(e => {
  const key = e.department + '|' + e.service;
  (byService[key] ||= []).push(e);
});
Object.values(byService).forEach(list => {
  list.sort((a, b) => b.productivity.week_score - a.productivity.week_score);
  list.forEach((e, idx) => { e.productivity.rank_in_service = idx + 1; });
});

// Уникальные департаменты и службы
export const departments = [...new Set(raw.map(r => r.dept))];
export const services = [...new Set(raw.map(r => r.dept + ' / ' + r.service))];

// Цели
export const goals = [
  { goal_id: 'g_company_01', level: 'company', title: 'Рост выручки на 25% в 2026 году', progress: 58, owner: 'CEO', deadline: '2026-12-31' },
  { goal_id: 'g_company_02', level: 'company', title: 'NPS платформы ≥ 40', progress: 44, owner: 'CEO', deadline: '2026-09-30' },
  { goal_id: 'g_team_it', level: 'team', title: 'Релиз новой платформы продуктивности', progress: 72, owner: 'Виктор Ким', deadline: '2026-08-15' },
  { goal_id: 'g_team_sales', level: 'team', title: 'Закрыть 120 B2B-сделок за квартал', progress: 63, owner: 'Айгерим Сатпаева', deadline: '2026-09-30' },
  { goal_id: 'g_team_mkt', level: 'team', title: 'Рост охвата в соцсетях +40%', progress: 51, owner: 'Бекзат Ильясов', deadline: '2026-10-31' },
  { goal_id: 'g_2201', level: 'personal', title: 'Редизайн личного кабинета', progress: 65, owner: 'Диана Смагулова', deadline: '2026-07-31' },
  { goal_id: 'g_2202', level: 'personal', title: 'Покрытие тестами 80%', progress: 48, owner: 'Жасулан Кенжебаев', deadline: '2026-08-20' },
];

// Тренд продуктивности (для графиков) — 7 точек
export function trendFor(employee, period = 'week') {
  const base = employee.productivity[`${period}_score`] || 70;
  const labels = period === 'day'
    ? ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00']
    : period === 'week'
      ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      : ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'];
  return labels.map((label, i) => {
    const s = Math.sin((employee.id.charCodeAt(6) + i) * 1.7) * 12;
    return { label, score: Math.max(20, Math.min(100, Math.round(base + s))) };
  });
}

export const company = { name: 'NovaTech', logo: '🚀' };
