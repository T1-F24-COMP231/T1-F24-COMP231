// ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/profileApi";  // Import the API functions
import "../styles/ProfilePage.css";
import ProfileDetails from "./ProfileDetails";
import EditableProfileForm from "./EditableProfileForm";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = 4;  // This should be dynamic based on the logged-in user's ID

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(userId);
        setProfile(data);
      } catch (error) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = async (updatedProfile: Profile) => {
    if (!profile) {
      alert("Profile data is not available.");
      return;
    }
  
    // Check if the user wants to change the password.
    if (updatedProfile.newPassword || updatedProfile.password) {
      // Ensure the old password is entered and matches the stored password
      if (!updatedProfile.password) {
        alert("Please enter your old password to change the password.");
        return;
      }
  
      if (updatedProfile.password !== profile.password) {
        alert("Old password is incorrect.");
        return;  // Stop further execution if old password is incorrect
      }
  
      // Check if new password and confirm password match
      if (updatedProfile.newPassword !== updatedProfile.confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
    }
  
    try {
      // Prepare the data to send to the backend.
      const profileUpdateData: { 
        firstName: string; 
        lastName: string; 
        email: string; 
        oldPassword?: string; 
        newPassword?: string; 
      } = {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
      };
  
      // Only include password update fields if provided
      if (updatedProfile.password && updatedProfile.newPassword) {
        profileUpdateData.oldPassword = updatedProfile.password;
        profileUpdateData.newPassword = updatedProfile.newPassword;
      } else {
        // If no password update, send the default password (from the backend).
        profileUpdateData.oldPassword = profile.password; // Safe because profile is non-null now
        profileUpdateData.newPassword = profile.password;  // Keep the password the same if not updating
      }
  
      // Call the API to update the profile
      await updateProfile(userId, profileUpdateData);
  
      // After successful update, refresh the profile data
      const updatedProfileData = await getProfile(userId);
      setProfile(updatedProfileData);  // Update the profile in state with new data
  
      alert("Profile updated successfully!");
      setIsEditing(false);  // Exit edit mode after saving
    } catch (error) {
      alert("Failed to update profile.");
    }
  };
  
  

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

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
              clearOldPassword={isEditing}
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
