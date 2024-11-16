import React, { useState } from "react";
import "../styles/ProfilePage.css";
import ProfileDetails from "./ProfileDetails";
import EditableProfileForm from "./EditableProfileForm";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    oldPassword: "password", // This is the actual password you compare with
    newPassword: "",
    confirmPassword: "",
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = (updatedProfile: Profile) => {
    // Ensure the old password entered is correct
    if (updatedProfile.oldPassword !== profile.oldPassword) {
      alert("Old password is incorrect.");
      return; // Stop further execution if old password is incorrect
    }

    // Check if new password and confirm password match
    if (updatedProfile.newPassword !== updatedProfile.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Update the profile state with the new password
    setProfile({
      ...updatedProfile,
      oldPassword: updatedProfile.newPassword, // Set the oldPassword to the newPassword
    });

    alert("Password changed successfully!"); // Success message
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="profile-page-container">
      <h1>Profile Management</h1>

      <div className="profile-page">
        {isEditing ? (
          <div>
            <h2>Edit Profile</h2>
            <EditableProfileForm
              profile={profile}
              onSave={saveProfile}
              clearOldPassword={isEditing} // Clear old password if in edit mode
            />
            <button className="cancel-edit-btn" onClick={toggleEdit}>
              Cancel Edit
            </button>
          </div>
        ) : (
          <div>
            <ProfileDetails profile={profile} />
            <button className="edit-profile-btn" onClick={toggleEdit}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
