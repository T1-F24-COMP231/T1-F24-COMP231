import React from 'react';
import NavBar from '../nav-bar/nav-bar';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateWebsite = () => {
    navigate('/website-builder');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
 <NavBar></NavBar>
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">My Dashboard</span>
          </div>
        </nav>
      </div>

      <div className="container mt-4 text-center">
        <h1>Welcome to the Dashboard</h1>
        <p>Here’s where your main content goes!</p>
      </div>

      <button
        onClick={handleCreateWebsite}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#066fd1',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        title="Create New Website"
      >
        +
      </button>
    </div>
  );
};

export default DashboardPage;
