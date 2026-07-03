# 🚀 NovaTech — Платформа учёта и визуализации продуктивности сотрудников

Веб-приложение по [PRD](./PRD_2.md): фиксация отчётов о работе, дашборды продуктивности
(день/неделя/месяц), игровой лидерборд с короной 👑 у лидера, цели трёх уровней
(личные / командные / компании), таблица сотрудников с фильтрами и интерактивная орг-структура.

## 🌐 Живое демо

**Frontend (GitHub Pages):** https://Zhak87.github.io/novatech-productivity/

Демо полностью интерактивно и работает автономно на встроенных seed-данных
(компания NovaTech, 39 сотрудников). Отчёты сохраняются в `localStorage` браузера.

## 🧱 Стек

| Слой | Технологии |
|---|---|
| **Frontend** | React 18, Vite, React Router, Recharts |
| **Backend** | Node.js, Express, Mongoose (JWT-авторизация, bcrypt) |
| **База данных** | MongoDB Atlas (бесплатный онлайн-кластер) |
| **Деплой** | GitHub Pages (frontend) через GitHub Actions |

## 📂 Структура репозитория

```
client/   — React-приложение (Vite)
server/   — REST API на Express + MongoDB
PRD_2.md  — исходный продуктовый документ
```

## ▶️ Запуск локально

### Frontend
```bash
cd client
npm install
npm run dev          # http://localhost:5173
```

### Backend (Express + MongoDB)
1. Создайте бесплатный кластер на [MongoDB Atlas](https://www.mongodb.com/atlas/database)
   и получите строку подключения.
2. Настройте окружение:
   ```bash
   cd server
   cp .env.example .env
   # впишите MONGODB_URI в .env
   npm install
   npm run seed         # наполнить БД демо-данными (39 сотрудников + цели)
   npm start            # API на http://localhost:4000
   ```
   Демо-логин: email любого сотрудника (напр. `d.smagulova@novatech.kz`), пароль `novatech`.

## 🔌 API (основное)

| Метод | Путь | Назначение |
|---|---|---|
| POST | `/api/auth/register` · `/api/auth/login` | Регистрация / вход |
| GET | `/api/employees?department=&q=` | Список сотрудников с фильтрами |
| GET | `/api/employees/:id` | Карточка сотрудника |
| GET/POST | `/api/goals?level=` | Цели (personal/team/company) |
| GET/POST | `/api/reports` | Отчёты о работе |

## 🚢 Деплой бэкенда

Frontend уже опубликован на GitHub Pages. Backend можно бесплатно развернуть на
[Render](https://render.com) или [Railway](https://railway.app): подключите репозиторий,
папку `server`, добавьте переменные окружения из `.env.example` и укажите
`MONGODB_URI` от MongoDB Atlas.

## ✅ Реализованные требования PRD

FR-1…FR-15 (Must): авторизация, привязка к оргструктуре, главная, сайдбар, личный кабинет,
отчёты (текст/документ/Excel), % выполнения, дашборды день/неделя/месяц, график продуктивности,
игровой лидерборд с короной, цели трёх уровней, таблица сотрудников с фильтрами, карточка
сотрудника, орг-структура, seed-данные. FR-16/FR-19 (Should): веса формулы продуктивности,
мобильная адаптивность.
