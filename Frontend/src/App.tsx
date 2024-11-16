// App.tsx (React component)
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import UserListPage from './components/admin/UserListPage';
import SystemMonitorPage from './components/admin/SystemMonitorPage';
import ProfilePage from './components/ProfilePage';
import WebsiteStatusPage from './components/WebsiteStatusPage';
import './styles/App.css'; // Include your CSS file here

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navigation-bar">
          <h1 className="app-title">Website Builder Dashboard</h1>
          <ul className="nav-links">
            <li><Link to="/users">User List</Link></li>
            <li><Link to="/system-monitor">System Monitor</Link></li>
            <li><Link to="/profile">Profile Management</Link></li>
            <li><Link to="/website-status">Website Status</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/users" element={<UserListPage />} />
            <Route path="/system-monitor" element={<SystemMonitorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/website-status" element={<WebsiteStatusPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 Website Builder Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
