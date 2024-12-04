import React from "react";
import { useLocation } from "react-router-dom";
import "../../../src/styles/WebsiteDetails.css";

interface Website {
  id: number;
  name: string;
  url: string;
}

const WebsiteDetails: React.FC = () => {
  const location = useLocation();
  const website: Website = location.state as Website;

  return (
    <div className="website-details">
      <h1>Details for {website.name}</h1>
      <p><strong>Website URL:</strong> {website.url}</p>
      <p><strong>Website ID:</strong> {website.id}</p>
      {/* will add other details and editing functionality */}
    </div>
  );
};

export default WebsiteDetails;
