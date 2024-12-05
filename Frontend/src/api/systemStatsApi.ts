// API call function
import axios from 'axios';

export const fetchSystemStats = async () => {
  try {
    const response = await axios.get(
      'https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/api/ServerHealth/stats'
    ); // Make sure this endpoint matches your ASP.NET API route
    return response.data;
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};
