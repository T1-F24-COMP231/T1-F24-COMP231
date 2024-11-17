import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WebsiteBuilder from './components/WebsiteBuilder';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import './styles/App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
    <div className="page">
      <NavBar></NavBar>
      <div className="page-wrapper">
      <div className="page-body mt-0">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/website-builder" element={<WebsiteBuilder />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/system-monitor" element={<SystemMonitorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/website-status" element={<WebsiteStatusPage />} />
      </Routes>
      </div>
      <Footer></Footer>
      </div>
      </div>
    </>
  );
};

export default App;
