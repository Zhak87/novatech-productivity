import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Модель данных из PRD, раздел 8.
const EmployeeSchema = new Schema({
  full_name: { type: String, required: true },
  position: String,
  department: String,
  service: String,
  role: { type: String, enum: ['employee', 'team_lead', 'department_head', 'ceo', 'admin'], default: 'employee' },
  avatar_url: String,
  email: { type: String, unique: true, sparse: true },
  phone: String,
  password_hash: String,
  hire_date: String,
  manager_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
  productivity: {
    day_score: Number,
    week_score: Number,
    month_score: Number,
    rank_in_service: Number,
  },
}, { timestamps: true });

const GoalSchema = new Schema({
  level: { type: String, enum: ['personal', 'team', 'company'], required: true },
  title: { type: String, required: true },
  owner: String,
  owner_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
  progress: { type: Number, default: 0 },
  deadline: String,
  parent_goal_id: { type: Schema.Types.ObjectId, ref: 'Goal' },
}, { timestamps: true });

const ReportSchema = new Schema({
  employee_id: { type: Schema.Types.ObjectId, ref: 'Employee' },
  type: { type: String, enum: ['text', 'doc', 'excel'], default: 'text' },
  title: String,
  content: String,
  file_url: String,
  related_goal_id: { type: Schema.Types.ObjectId, ref: 'Goal' },
  progress_percent: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export const Employee = model('Employee', EmployeeSchema);
export const Goal = model('Goal', GoalSchema);
export const Report = model('Report', ReportSchema);
