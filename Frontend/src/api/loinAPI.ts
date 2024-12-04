import axios from "axios";

const API_BASE_URL = "https://localhost:7226/Auth"; // Replace with your API base URL

interface LoginRequestModel {
  email: string;
  password: string;
}

export const loginAdmin = async (data: LoginRequestModel) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Unable to reach the server.");
    }
  }
};
