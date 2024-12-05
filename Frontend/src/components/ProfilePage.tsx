import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api/profileApi';
import '../styles/ProfilePage.css';
import { AgGridReact } from 'ag-grid-react';
import EditableProfileForm from './EditableProfileForm';
import Loading from './Loading';

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
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = 4;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile(userId);
        setProfile(data);

        setRowData([
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        ]);
      } catch (error) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = async (updatedProfile: Profile) => {
    if (!profile) {
      alert('Profile data is not available.');
      return;
    }

    if (updatedProfile.newPassword || updatedProfile.password) {
      if (!updatedProfile.password) {
        alert('Please enter your old password to change the password.');
        return;
      }

      if (updatedProfile.password !== profile.password) {
        alert('Old password is incorrect.');
        return;
      }

      if (updatedProfile.newPassword !== updatedProfile.confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }
    }

    try {
      const profileUpdateData = {
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        oldPassword: updatedProfile.password || undefined,
        newPassword: updatedProfile.newPassword || undefined,
      };

      await updateProfile(userId, profileUpdateData);

      const updatedProfileData = await getProfile(userId);
      setProfile(updatedProfileData);

      setRowData([
        {
          firstName: updatedProfileData.firstName,
          lastName: updatedProfileData.lastName,
          email: updatedProfileData.email,
        },
      ]);

      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page-container mt-4 pt-4 container">
      <h2>Profile Management</h2>
      {!isEditing ? (
        <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={[
              {
                field: 'firstName',
                headerName: 'First Name',
                sortable: true,
                filter: true,
              },
              {
                field: 'lastName',
                headerName: 'Last Name',
                sortable: true,
                filter: true,
              },
              {
                field: 'email',
                headerName: 'Email',
                sortable: true,
                filter: true,
                width: 255,
              },
            ]}
            domLayout="autoHeight"
          />
          <button className="btn btn-primary mt-3" onClick={toggleEdit}>
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <EditableProfileForm
            profile={profile!}
            onSave={saveProfile}
            toggleEdit={toggleEdit}
            clearOldPassword={isEditing}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
