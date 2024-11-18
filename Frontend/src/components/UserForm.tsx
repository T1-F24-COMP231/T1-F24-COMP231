import React, { useState } from 'react';
import '../styles/UserForm.css';

interface UserFormProps {
  onSubmit: (user: {
    name: string;
    email: string;
    role: string;
    id?: number;
  }) => void;
  initialValues?: { name: string; email: string; role: string; id?: number }; // id is optional
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues = { name: '', email: '', role: '' },
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    role?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; role?: string } = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? 'input-error' : ''}
        >
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        {errors.role && <span className="error-message">{errors.role}</span>}
      </div>

      <button type="submit" className="submit-button">
        {formData.id ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
