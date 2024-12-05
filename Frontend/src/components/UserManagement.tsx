import React, { useEffect, useState } from 'react';
import '../styles/UserManagement.css';
import UserForm from './UserForm';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Account'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSubmitUser = (user: {
    firstName: string;
    lastName: string;
    email: string;
    id?: number;
  }) => {
    if (user.id) {
      // Update existing user
      setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
    } else {
      // Add new user
      setUsers([
        ...users,
        { ...user, id: users.length > 0 ? users[users.length - 1].id + 1 : 1 },
      ]);
    }
    setFormVisible(false);
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <button className="add-user-btn" onClick={handleAddUser}>
        Add User
      </button>

      {isFormVisible && (
        <UserForm
          onSubmit={handleSubmitUser}
          initialValues={
            editingUser || { firstName: '', lastName: '', email: '' } // Empty values for new user
          }
        />
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
