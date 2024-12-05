import axios from 'axios';

const API_BASE_URL =
  'https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net';

export const fetchSystemStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ServerHealth/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};
