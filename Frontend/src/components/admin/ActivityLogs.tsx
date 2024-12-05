import React, { useState, useEffect } from 'react';
import { Table, Alert, Container } from 'react-bootstrap';
import { fetchActivityLogs } from '../../api/activityLogsApi';
import Loading from '../Loading';

const ActivityLogs: React.FC = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        if (userId && authToken) {
          const logs = await fetchActivityLogs(userId, authToken);
          setActivityLogs(logs);
        } else {
          throw new Error('User is not authenticated');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [userId, authToken]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Activity Logs</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Activity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activityLogs.length > 0 ? (
            activityLogs.map((log: any, index: number) => (
              <tr key={log.id || index}>
                <td>{index + 1}</td>
                <td>{log.activity}</td>
                <td>{new Date(log.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No activity logs found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ActivityLogs;
