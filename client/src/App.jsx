import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Productivity from './pages/Productivity';
import Goals from './pages/Goals';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import Structure from './pages/Structure';
import Settings from './pages/Settings';
import AddReport from './pages/AddReport';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/report" element={<AddReport />} />
        </Routes>
      </main>
    </div>
  );
}
