import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/styles/WebsiteManagement.css';

interface Website {
  id: number;
  name: string;
  url: string;
}

const WebsiteManagementDashboard: React.FC = () => {
  const navigate = useNavigate();

  const websites: Website[] = [
    { id: 1, name: 'Portfolio Site', url: 'https://portfolio.com' },
    { id: 2, name: 'E-Commerce Store', url: 'https://shoponline.com' },
  ];

  return (
    <div className="website-management-dashboard">
      <h1>Your Websites</h1>
      <div className="website-list">
        {websites.map((website) => (
          <div
            key={website.id}
            className="website-card"
            onClick={() =>
              navigate(`/website/${website.id}`, { state: website })
            }
          >
            <h3>{website.name}</h3>
            <p>{website.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteManagementDashboard;
