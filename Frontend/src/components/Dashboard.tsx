import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateWebsite = () => {
    navigate('/website-builder');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="container mt-4 text-center text-purple">
        <h1>Welcome to the Dashboard</h1>
      </div>
      <button
        onClick={handleCreateWebsite}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#ae3ec9',
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

export default Dashboard;
