import axios from "axios";

// Base URL of your API
const API_BASE_URL = "https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Auth";

interface LoginRequestModel {
  email: string;
  password: string;
}

// Login function for admin
export const loginAdmin = async (data: LoginRequestModel) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error("Unable to reach the server. Please check your internet connection or contact support.");
    }
  }
};