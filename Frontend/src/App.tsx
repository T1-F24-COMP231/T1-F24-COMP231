import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WebsiteBuilder from './components/WebsiteBuilder';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import AdminLogin from './components/admin/AdminLogin';
import CustomerLogin from './components/customer/CustomerLogin';
import WebsiteManagementDashboard from './components/management-dashboard/WebsiteManagementDashboard';
import WebsiteDetails from './components/management-dashboard/WebsiteDetails';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import BackupManagement from './components/BackupManagement'; // Import BackupManagement component
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { token, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (isAdmin) {
      window.location.href = '/admin/login';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="page">
      {token && <NavBar onLogout={handleLogout} isAdmin={isAdmin} />}
      <div className="page-wrapper">
        <div className="page-body mt-0">
          <Routes>
            {/* Base Route: Redirect based on login status */}
            <Route
              path="/"
              element={
                <Navigate to={token ? '/dashboard' : '/login'} replace />
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/website-builder"
              element={
                token ? <WebsiteBuilder /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/users"
              element={
                token ? <UserListPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/system-monitor"
              element={
                token ? <SystemMonitorPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/profile"
              element={
                token ? <ProfilePage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/website-status"
              element={
                token ? <WebsiteStatusPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/management-dashboard"
              element={
                token ? (
                  <WebsiteManagementDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/website/:id"
              element={
                token ? <WebsiteDetails /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={token ? '/dashboard' : '/login'} replace />
              }
            />
            <Route
              path="/backup-management"
              element={
                token ? (
                  <BackupManagement />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
