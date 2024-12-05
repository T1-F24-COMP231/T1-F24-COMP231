import React, { useState, useEffect } from 'react';
import '../styles/UserManagement.css';
import UserForm from './UserForm';
import EditUserForm from './EditUserForm';
import Loading from './Loading';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
    setFormVisible(true);
  };

  const handleSubmitUser = async (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }) => {
    try {
      const response = await fetch(
        'https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Account',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create user. Status code: ${response.status}`
        );
      }

      setUsers([
        ...users,
        { ...user, id: users.length > 0 ? users[users.length - 1].id + 1 : 1 },
      ]);
    } catch (err: any) {
      console.error(err.message || 'Failed to add user.');
      alert(`Error: ${err.message || 'Unable to create user'}`);
    } finally {
      setFormVisible(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(
        `https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Account/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete user. Status code: ${response.status}`
        );
      }

      // Update the state to reflect the deletion
      setUsers(users.filter((user) => user.id !== id));
    } catch (err: any) {
      console.error(err.message || 'Failed to delete user.');
      alert(`Error: ${err.message || 'Unable to delete user'}`);
    }
  };

  const handleEditUser = (user: User) => {
    setFormVisible(true);
    setEditingUser(user);
  };

  const handleCancelForm = () => {
    setFormVisible(false);
  };

  const handleEditUserSubmit = async (user: User) => {
    if (!editingUser) return;

    try {
      const response = await fetch(
        `https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Account/${editingUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update user. Status code: ${response.status}`
        );
      }

      // Update the state with the new user data
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? { ...u, ...user } : u))
      );
    } catch (err: any) {
      console.error(err.message || 'Failed to update user.');
      alert(`Error: ${err.message || 'Unable to update user'}`);
    } finally {
      setFormVisible(false);
      setEditingUser(null);
    }
  };

  return (
    <div className="user-management container mt-4">
      <h2>User Management</h2>
      {loading ? (
        <Loading /> // Display the loading spinner
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
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
                      onClick={() => handleEditUser(user)} // Edit user action
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)} // Call handleDeleteUser with the user's ID
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="add-user-btn" onClick={handleAddUser}>
            Add User
          </button>

          {isFormVisible && (
            <UserForm onSubmit={handleSubmitUser} onCancel={handleCancelForm} />
          )}
          {isFormVisible && editingUser && (
            <EditUserForm
              user={editingUser}
              onSubmit={handleEditUserSubmit} // Updated to handleEditUserSubmit
              onCancel={handleCancelForm}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;
