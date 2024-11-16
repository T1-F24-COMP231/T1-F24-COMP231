import React, { useEffect, useState } from 'react';
import { fetchSystemStats } from '../../api/systemStatsApi';
import styles from '../../styles/SystemMonitorPage.module.css';

type SystemStats = {
  hardwareInfo: {
    manufacturer: string;
    model: string;
  };
  cpuInfo: {
    manufacturer: string;
    brand: string;
    speed: string;
    cores: number;
    physicalCores: number;
    usage: number;
  };
  memoryUsage: number;
  diskUsage: {
    driveC: {
      used: string;
      total: string;
    };
    driveD: {
      used: string;
      total: string;
    };
  };
};

const SystemMonitorPage: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSystemStats = async () => {
      try {
        const data = await fetchSystemStats();
        setStats(data);
      } catch (err) {
        setError('Failed to fetch system stats');
      } finally {
        setLoading(false);
      }
    };

    loadSystemStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.systemMonitorContainer}>
      <h1>System Monitor</h1>
      {stats ? (
        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <h2>Hardware Information</h2>
            <p><strong>Manufacturer:</strong> {stats.hardwareInfo.manufacturer}</p>
            <p><strong>Model:</strong> {stats.hardwareInfo.model}</p>
          </div>
          <div className={styles.statBox}>
            <h2>CPU Information</h2>
            <p><strong>Manufacturer:</strong> {stats.cpuInfo.manufacturer}</p>
            <p><strong>Brand:</strong> {stats.cpuInfo.brand}</p>
            <p><strong>Speed:</strong> {stats.cpuInfo.speed}</p>
            <p><strong>Cores:</strong> {stats.cpuInfo.cores}</p>
            <p><strong>Physical Cores:</strong> {stats.cpuInfo.physicalCores}</p>
            <p><strong>Usage:</strong> {(stats.cpuInfo.usage * 100).toFixed(2)}%</p>
          </div>
          <div className={styles.statBox}>
            <h2>Main Memory Usage</h2>
            <p><strong>Usage:</strong> {stats.memoryUsage} MB</p>
          </div>
          <div className={styles.statBox}>
            <h2>Disk Usage</h2>
            <h3>Drive C:</h3>
            <p><strong>Used:</strong> {stats.diskUsage.driveC.used}</p>
            <p><strong>Total:</strong> {stats.diskUsage.driveC.total}</p>
            <h3>Drive D:</h3>
            <p><strong>Used:</strong> {stats.diskUsage.driveD.used}</p>
            <p><strong>Total:</strong> {stats.diskUsage.driveD.total}</p>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default SystemMonitorPage;
