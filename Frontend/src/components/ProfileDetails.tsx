// ProfileDetails.tsx
import React, { useState, useEffect } from "react";

interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    password:string
  }
  
  interface ProfileDetailsProps {
    profile: Profile;
  }
  
  const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
    return (
      <div className="profile-details">
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
    );
  };
  
  export default ProfileDetails;