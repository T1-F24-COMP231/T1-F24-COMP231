import axios from 'axios';

const BASE_URL =
  'https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/api';

export const fetchActivityLogs = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/UserActivityLog/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch activity logs'
    );
  }
};
