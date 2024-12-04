import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WebsiteBuilder from './components/WebsiteBuilder';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import './styles/App.css';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';

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
   
      <div className="page-wrapper">
        <div className="page-body mt-0">
          <Routes>
            <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
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
