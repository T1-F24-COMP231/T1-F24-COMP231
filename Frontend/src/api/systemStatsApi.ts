// API call function
import axios from 'axios';

export const fetchSystemStats = async () => {
  try {
    const response = await axios.get('https://localhost:7226/api/ServerHealth/stats'); // Make sure this endpoint matches your ASP.NET API route
    return response.data;
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw error;
  }
};
