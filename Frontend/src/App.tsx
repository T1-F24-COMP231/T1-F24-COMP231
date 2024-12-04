import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WebsiteManagementDashboard from './components/management-dashboard/WebsiteManagementDashboard';
import WebsiteDetails from './components/management-dashboard/WebsiteDetails';
import WebsiteBuilder from './components/WebsiteBuilder';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import AdminLogin from './components/admin/AdminLogin';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import './styles/App.css';

// Mock authentication function (replace with actual backend logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Check if token exists in local storage
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  const handleLogin = (token: string) => {
    localStorage.setItem('authToken', token);
    setLoggedIn(true);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
    navigate('/login'); // Redirect to login after logout
  };

  useEffect(() => {
    if (!loggedIn) navigate('/login');
  }, [loggedIn, navigate]);

  return (
    <div className="page">
      <NavBar />
      <div className="page-wrapper">
        <div className="page-body mt-0">
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/website-builder"
              element={
                <ProtectedRoute>
                  <WebsiteBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UserListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/system-monitor"
              element={
                <ProtectedRoute>
                  <SystemMonitorPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/website-status"
              element={
                <ProtectedRoute>
                  <WebsiteStatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management-dashboard"
              element={
                <ProtectedRoute>
                  <WebsiteManagementDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/website/:id"
              element={
                <ProtectedRoute>
                  <WebsiteDetails />
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
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
