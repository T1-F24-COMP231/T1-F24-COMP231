// api/profileApi.ts
export const getProfile = async (userId: number) => {
  try {
    const response = await fetch(`https://localhost:7226/Account/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (
  userId: number,
  updatedProfile: {
    firstName: string;
    lastName: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
  }
) => {
  try {
    const response = await fetch(
      `https://localhost:7226/Account/update/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
