import React, { useState, useEffect } from 'react';
import '../styles/WebsiteStatusPage.css';
import {
  fetchWebsites,
  updateWebsite,
  deleteWebsite,
  Website,
} from '../api/websiteApi'; // Import API functions

const WebsiteStatusPage: React.FC = () => {
  const userId = 1; // Assuming logged-in userId is 1

  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch websites for the logged-in user
  useEffect(() => {
    fetchWebsites(userId)
      .then((data) => setWebsites(data))
      .catch((error) => setMessage(error.message));
  }, [userId]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWebsiteId = parseInt(event.target.value, 10);
    const website =
      websites.find((site) => site.id === selectedWebsiteId) || null;
    setSelectedWebsite(website);
    setMessage(null); // Clear message when selecting a new website
  };

  const handlePublish = () => {
    if (selectedWebsite) {
      if (selectedWebsite.isPublished) {
        setMessage(`${selectedWebsite.title} is already published.`);
      } else {
        // Add sample deployment URL
        const deploymentUrl = 'https://example.com'; // Sample URL for deployment
        updateWebsite(selectedWebsite.id, deploymentUrl)
          .then(() => {
            setWebsites((prevState) =>
              prevState.map((website) =>
                website.id === selectedWebsite.id
                  ? { ...website, isPublished: true, deploymentUrl }
                  : website
              )
            );
            setMessage(
              `${selectedWebsite.title} has been published successfully!`
            );
          })
          .catch((error) => setMessage(error.message));
      }
    }
  };

  const handleUnpublish = () => {
    if (selectedWebsite) {
      if (!selectedWebsite.isPublished) {
        setMessage(`${selectedWebsite.title} is not published.`);
      } else {
        const deploymentUrl = null; // Setting deploymentUrl to null to unpublish
        updateWebsite(selectedWebsite.id, deploymentUrl)
          .then(() => {
            setWebsites((prevState) =>
              prevState.map((website) =>
                website.id === selectedWebsite.id
                  ? { ...website, isPublished: false, deploymentUrl }
                  : website
              )
            );
            setMessage(
              `${selectedWebsite.title} has been unpublished successfully!`
            );
          })
          .catch((error) => setMessage(error.message));
      }
    }
  };

  const handleDelete = () => {
    if (selectedWebsite) {
      deleteWebsite(selectedWebsite.id)
        .then(() => {
          setWebsites((prevState) =>
            prevState.filter((website) => website.id !== selectedWebsite.id)
          );
          setMessage(`${selectedWebsite.title} has been deleted successfully!`);
          setSelectedWebsite(null); // Clear the selected website
        })
        .catch((error) => setMessage(error.message));
    }
  };

  return (
    <div className="website-status-container">
      <h2>Website Status Management</h2>
      {message && <div className="message">{message}</div>}{' '}
      {/* Display message */}
      <div className="website-dropdown-container">
        <select
          value={selectedWebsite ? selectedWebsite.id : ''}
          onChange={handleSelectChange}
        >
          <option value="">Select a website</option>
          {websites.map((website) => (
            <option key={website.id} value={website.id}>
              {website.title} -{' '}
              {website.isPublished ? 'Published' : 'Not Published'}
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
        <button onClick={handleDelete} disabled={!selectedWebsite}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WebsiteStatusPage;
