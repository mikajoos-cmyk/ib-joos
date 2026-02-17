import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeistungenPage from './pages/LeistungenPage';
import ProjektePage from './pages/ProjektePage';
import UeberUnsPage from './pages/UeberUnsPage';
import KarrierePage from './pages/KarrierePage';
import KontaktPage from './pages/KontaktPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import JobDetailPage from './pages/JobDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leistungen" element={<LeistungenPage />} />
        <Route path="/projekte" element={<ProjektePage />} />
        <Route path="/projekte/:id" element={<ProjectDetailPage />} />
        <Route path="/ueber-uns" element={<UeberUnsPage />} />
        <Route path="/karriere" element={<KarrierePage />} />
        <Route path="/karriere/:id" element={<JobDetailPage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
