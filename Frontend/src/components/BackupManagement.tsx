import React, { useState } from 'react';
import '../styles/BackupManagement.css';

const BackupManagement: React.FC = () => {
  // Sample state for backup details (this would normally come from an API)
  const [backupDetails, setBackupDetails] = useState<any>({
    lastBackupDate: '2024-12-01',
    status: 'Completed',
  });

  const handleBackup = () => {
    // This would trigger the backup process via an API call
    console.log('Starting new backup...');
  };

  const handleRestore = () => {
    // This would trigger the restore process via an API call
    console.log('Restoring from last backup...');
  };

  return (
    <div className="backup-management">
      <h1>Backup and Restore System Data</h1>

      <div className="backup-details">
        <h3>Last Backup Details</h3>
        <p>
          <strong>Date:</strong> {backupDetails.lastBackupDate}
        </p>
        <p>
          <strong>Status:</strong> {backupDetails.status}
        </p>
      </div>

      <div className="backup-actions">
        <button className="btn btn-backup" onClick={handleBackup}>
          Create New Backup
        </button>
        <button className="btn btn-restore" onClick={handleRestore}>
          Restore from Last Backup
        </button>
      </div>
    </div>
  );
};

export default BackupManagement;
