import React, { useState } from 'react';
import '../styles/UserManagement.css';
import UserForm from './UserForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
    },
  ]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
    name: string;
    email: string;
    role: string;
    id?: number;
  }) => {
    if (user.id) {
      // Update existing user
      setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
    } else {
      // Add new user
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setFormVisible(false);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <button className="add-user-btn" onClick={handleAddUser}>
        Add User
      </button>

      {isFormVisible && (
        <UserForm
          onSubmit={handleSubmitUser}
          initialValues={editingUser || { name: '', email: '', role: '' }} // Pass empty values for new user
        />
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
