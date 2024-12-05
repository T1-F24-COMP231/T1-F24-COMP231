import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Account');
  return response.data;
};
