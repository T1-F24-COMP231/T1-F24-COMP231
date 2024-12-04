import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [error, setError] = useState('');

  const handleCreateWebsite = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWebsiteName('');
    setError('');
  };

  const validateWebsiteName = (name: string): boolean => {
    if (!name.trim()) {
      setError('Website name is required.');
      return false;
    }
    if (name.length > 20) {
      setError('Website name must not exceed 20 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSaveWebsite = () => {
    if (validateWebsiteName(websiteName)) {
      setShowModal(false);
      navigate('/website-builder', { state: { websiteName } });
    }
  };

  return (
<>
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  Dashboard
                </h2>
              </div>
            </div>
          </div>
        </div>
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
        <span className="color-primary">+</span>
      </button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label className='required'>Website Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website name"
              value={websiteName}
              maxLength={20}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveWebsite}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div></>
  );
};

export default Dashboard;
