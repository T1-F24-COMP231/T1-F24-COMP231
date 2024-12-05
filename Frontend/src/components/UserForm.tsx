import React, { useState } from 'react';
import '../styles/UserForm.css';

interface UserFormProps {
  onSubmit: (user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }) => void;
  initialValues?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
  };
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
  },
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Narrowing the type to HTMLInputElement for checkboxes
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked, // Use `checked` for checkboxes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Use `value` for other inputs
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    } = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
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
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName ? 'input-error' : ''}
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName ? 'input-error' : ''}
        />
        {errors.lastName && (
          <span className="error-message">{errors.lastName}</span>
        )}
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="isAdmin">Is Admin</label>
        <input
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">
        {formData.firstName ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
