import React, { useState, useEffect } from 'react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditableProfileFormProps {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  clearOldPassword: boolean;
  toggleEdit: any;
}

const EditableProfileForm: React.FC<EditableProfileFormProps> = ({
  profile,
  onSave,
  clearOldPassword,
  toggleEdit,
}) => {
  const [formData, setFormData] = useState<Profile>(profile);

  useEffect(() => {
    if (clearOldPassword) {
      setFormData((prevState) => ({
        ...prevState,
        password: '', 
      }));
    } else {
      setFormData(profile); 
    }
  }, [profile, clearOldPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData); 
  };

  const handleDiscard = () => {
    setFormData(profile); 
  };

  const handleToggleEdit = () => {
    toggleEdit();
  };

  return (
    <form className="profile-form">
      <div className="form-row">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password fields */}
      <div className="form-row">
        <label htmlFor="password">Old Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password || ''} 
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword || ''} 
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="button-group">
        <button type="button" className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
        <button type="button" className="discard-btn" onClick={handleDiscard}>
          Discard Changes
        </button>
        <button className="btn btn-secondary" onClick={handleToggleEdit}>
          Cancel Edit
        </button>
      </div>
    </form>
  );
};

export default EditableProfileForm;
