import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee, Goal, Report } from '../models/index.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'novatech-dev-secret';

// --- Auth (FR-1) ---
router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    const exists = await Employee.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email уже используется' });
    const password_hash = await bcrypt.hash(password, 10);
    const emp = await Employee.create({ email, password_hash, full_name, role: 'employee' });
    res.status(201).json({ id: emp._id, email: emp.email });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employee.findOne({ email });
    if (!emp || !emp.password_hash) return res.status(401).json({ error: 'Неверные данные' });
    const ok = await bcrypt.compare(password, emp.password_hash);
    if (!ok) return res.status(401).json({ error: 'Неверные данные' });
    const token = jwt.sign({ id: emp._id, role: emp.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: emp._id, full_name: emp.full_name, role: emp.role } });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- Employees (FR-12, FR-13) ---
router.get('/employees', async (req, res) => {
  const { department, service, q } = req.query;
  const filter = {};
  if (department) filter.department = department;
  if (service) filter.service = service;
  if (q) filter.full_name = { $regex: q, $options: 'i' };
  const list = await Employee.find(filter).select('-password_hash').lean();
  res.json(list);
});

router.get('/employees/:id', async (req, res) => {
  const emp = await Employee.findById(req.params.id).select('-password_hash').lean();
  if (!emp) return res.status(404).json({ error: 'Не найден' });
  res.json(emp);
});

router.patch('/employees/:id', async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password_hash');
  res.json(emp);
});

// --- Goals (FR-11) ---
router.get('/goals', async (req, res) => {
  const filter = req.query.level ? { level: req.query.level } : {};
  res.json(await Goal.find(filter).lean());
});

router.post('/goals', async (req, res) => {
  res.status(201).json(await Goal.create(req.body));
});

// --- Reports (FR-6, FR-7) ---
router.get('/reports', async (req, res) => {
  const filter = req.query.employee_id ? { employee_id: req.query.employee_id } : {};
  res.json(await Report.find(filter).sort({ createdAt: -1 }).lean());
});

router.post('/reports', async (req, res) => {
  const report = await Report.create(req.body);
  // Обновление прогресса связанной цели (PRD 4.7)
  if (report.related_goal_id) {
    await Goal.findByIdAndUpdate(report.related_goal_id, { progress: report.progress_percent });
  }
  res.status(201).json(report);
});

export default router;
