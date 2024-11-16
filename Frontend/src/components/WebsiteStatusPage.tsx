import React, { useState } from 'react';
import "../styles/WebsiteStatusPage.css";
interface Website {
  id: number;
  name: string;
  isPublished: boolean;
}

const WebsiteStatusPage: React.FC = () => {
  // Dummy data for websites
  const [websites, setWebsites] = useState<Website[]>([
    { id: 1, name: "Website 1", isPublished: true },
    { id: 2, name: "Website 2", isPublished: false },
    { id: 3, name: "Website 3", isPublished: true },
    { id: 4, name: "Website 4", isPublished: false },
    { id: 5, name: "Website 5", isPublished: true }
  ]);

  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWebsiteId = parseInt(event.target.value, 10);
    const website = websites.find((site) => site.id === selectedWebsiteId) || null;
    setSelectedWebsite(website);
  };

  const handlePublish = () => {
    if (selectedWebsite) {
      selectedWebsite.isPublished = true;
      setWebsites([...websites]); // Update state to reflect changes
      alert(`${selectedWebsite.name} is now published!`);
    }
  };

  const handleUnpublish = () => {
    if (selectedWebsite) {
      selectedWebsite.isPublished = false;
      setWebsites([...websites]); // Update state to reflect changes
      alert(`${selectedWebsite.name} is now unpublished!`);
    }
  };

  return (
    <div className="website-status-container">
      <h2>Website Status Management</h2>
      <div className="website-dropdown-container">
        <select
          value={selectedWebsite ? selectedWebsite.id : ""}
          onChange={handleSelectChange}
        >
          <option value="">Select a website</option>
          {websites.map((website) => (
            <option key={website.id} value={website.id}>
              {website.name} - {website.isPublished ? 'Published' : 'Not Published'}
            </option>
          ))}
        </select>
      </div>

      <div className="button-group">
        <button onClick={handlePublish} disabled={!selectedWebsite}>
          Publish
        </button>
        <button onClick={handleUnpublish} disabled={!selectedWebsite}>
          Unpublish
        </button>
      </div>
    </div>
  );
};

export default WebsiteStatusPage;
