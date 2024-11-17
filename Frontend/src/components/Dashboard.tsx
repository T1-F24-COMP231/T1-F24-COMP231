import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateWebsite = () => {
    navigate('/website-builder');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <button
        onClick={handleCreateWebsite}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '20px',
          backgroundColor: '#443a3c',
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
        <span className="text-pink">+</span>
      </button>
    </div>
  );
};

export default Dashboard;
