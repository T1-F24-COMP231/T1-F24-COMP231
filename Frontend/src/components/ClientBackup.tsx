import React, { useState } from 'react';
import '../styles/ClientBackup.css';

interface BackupRecord {
  id: number;
  date: string;
  status: string;
}

const ClientBackup: React.FC = () => {
  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([
    { id: 1, date: '2024-12-01 10:15:00', status: 'Completed' },
    { id: 2, date: '2024-12-02 14:45:00', status: 'Completed' },
  ]);

  const handleBackupNow = async () => {
    // Dummy API call
    const newBackup = {
      id: backupRecords.length + 1,
      date: new Date().toISOString(),
      status: 'In Progress',
    };
    setBackupRecords((prev) => [...prev, newBackup]);

    // Simulate API delay
    setTimeout(() => {
      setBackupRecords((prev) =>
        prev.map((record) =>
          record.id === newBackup.id
            ? { ...record, status: 'Completed' }
            : record
        )
      );
    }, 2000); // Simulating a 2-second API response delay
  };

  return (
    <div className="client-backup">
      <h2>Backup Management</h2>
      <button className="backup-button" onClick={handleBackupNow}>
        Backup Now
      </button>

      <table className="backup-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {backupRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.date}</td>
              <td className={record.status.toLowerCase()}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientBackup;
