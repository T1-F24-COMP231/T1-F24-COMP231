import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('https://localhost:7226/Account');
  return response.data;
};
