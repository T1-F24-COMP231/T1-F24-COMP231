import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const WebsiteBuilder: React.FC = () => {
  const location = useLocation();
  const websiteName = location.state?.websiteName || 'New Website';

  return (<>
  <NavBar />
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with website name */}
      <header
        className="color-secondary"
        style={{
          backgroundColor: '#f8f9fa',
          padding: '10px 20px',
          borderBottom: '1px solid #dee2e6',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {`${websiteName}`}
      </header>

      {/* GrapesJS iframe */}
      <iframe
        src="http://localhost:8080"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title={`GrapesJS Editor - ${websiteName}`}
      />
    </div>
    </>
  );
};

export default WebsiteBuilder;
