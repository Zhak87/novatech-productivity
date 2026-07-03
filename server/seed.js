// Seed-скрипт (FR-15): наполняет БД демо-структурой NovaTech (39 сотрудников + цели).
// Переиспользует те же данные, что и фронтенд, из client/src/data/seed.js.
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { employees, goals } from '../client/src/data/seed.js';
import { Employee, Goal, Report } from './models/index.js';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) { console.error('❌ Укажите MONGODB_URI в .env'); process.exit(1); }
  await mongoose.connect(uri);
  console.log('✅ Подключено к MongoDB');

  await Promise.all([Employee.deleteMany({}), Goal.deleteMany({}), Report.deleteMany({})]);
  console.log('🧹 Коллекции очищены');

  // Демо-пароль для всех: "novatech" (только для учебного прототипа!)
  const password_hash = await bcrypt.hash('novatech', 10);
  const docs = employees.map(e => ({
    full_name: e.full_name,
    position: e.position,
    department: e.department,
    service: e.service,
    role: e.role,
    avatar_url: e.avatar_url,
    email: e.email,
    hire_date: e.hire_date,
    productivity: e.productivity,
    password_hash,
  }));
  await Employee.insertMany(docs);
  console.log(`👥 Добавлено сотрудников: ${docs.length}`);

  await Goal.insertMany(goals.map(g => ({
    level: g.level, title: g.title, owner: g.owner, progress: g.progress, deadline: g.deadline,
  })));
  console.log(`🎯 Добавлено целей: ${goals.length}`);

  console.log('🎉 Готово! Логин любого сотрудника — его email, пароль: novatech');
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
