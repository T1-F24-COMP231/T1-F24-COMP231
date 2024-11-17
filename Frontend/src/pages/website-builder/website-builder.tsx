import React from 'react';

const WebsiteBuilder: React.FC = () => {
  return (
    <iframe
      src="http://localhost:8080"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="GrapesJS Editor"
    />
  );
};

export default WebsiteBuilder;
