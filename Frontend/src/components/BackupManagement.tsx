import React, { useState } from 'react';

const BackupManagement: React.FC = () => {
  const [backupDetails, setBackupDetails] = useState<any>({
    lastBackupDate: '2024-12-01',
    status: 'Completed',
  });

  const handleBackup = () => {
    console.log('Starting new backup...');
  };

  const handleRestore = () => {
    console.log('Restoring from last backup...');
  };

  return (
    <div className="container mt-4 pt-4">
      <h2 className="mb-4">Backup and Restore System Data</h2>
      <div className="card shadow-sm p-4">
        <h4 className="text-primary">Last Backup Details</h4>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Date:</strong> {backupDetails.lastBackupDate}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Status:</strong> {backupDetails.status}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="btn btn-primary me-3" onClick={handleBackup}>
          Create New Backup
        </button>
        <button className="btn btn-outline-primary" onClick={handleRestore}>
          Restore from Last Backup
        </button>
      </div>
    </div>
  );
};

export default BackupManagement;
