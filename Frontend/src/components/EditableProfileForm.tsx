import React, { useState, useEffect } from "react";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditableProfileFormProps {
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  clearOldPassword: boolean; // Prop to clear old password field when in edit mode
}

const EditableProfileForm: React.FC<EditableProfileFormProps> = ({
  profile,
  onSave,
  clearOldPassword,
}) => {
  const [formData, setFormData] = useState<Profile>(profile);

  useEffect(() => {
    // Reset the old password field when toggling to edit mode
    if (clearOldPassword) {
      setFormData((prevState) => ({
        ...prevState,
        oldPassword: "", // Clear the old password in the form
      }));
    } else {
      // Keep old password as is when not in edit mode
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
    onSave(formData); // Pass updated profile data to onSave
  };

  const handleDiscard = () => {
    setFormData(profile); // Reset to initial profile data
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
          disabled // Make email field read-only
        />
      </div>
      <div className="form-row">
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
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
      </div>
    </form>
  );
};

export default EditableProfileForm;
