import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import WebsiteManagementDashboard from './components/management-dashboard/WebsiteManagementDashboard';
import WebsiteDetails from './components/management-dashboard/WebsiteDetails'; // Import WebsiteDetails
import WebsiteBuilder from './components/WebsiteBuilder';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import './styles/App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import BackupManagement from './components/backup-management/BackupManagement'; // Import BackupManagement component

import './styles/App.css';

const App: React.FC = () => {
  const handleUserFormSubmit = (user: {
    name: string;
    email: string;
    role: string;
    id?: number;
  }) => {
    console.log('User submitted:', user);
    // You can send this data to a backend or use it elsewhere in your app
  };

  return (
    <>
      <div className="page">
        <NavBar />
        <div className="page-wrapper">
          <div className="page-body mt-0">
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/website-builder" element={<WebsiteBuilder />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/system-monitor" element={<SystemMonitorPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/website-status" element={<WebsiteStatusPage />} />
              {/* New Routes */}
              <Route
                path="/management-dashboard"
                element={<WebsiteManagementDashboard />}
              />
              <Route path="/website/:id" element={<WebsiteDetails />} />
              {/* Added route for backup management */}
              <Route path="/backup-management" element={<BackupManagement />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
