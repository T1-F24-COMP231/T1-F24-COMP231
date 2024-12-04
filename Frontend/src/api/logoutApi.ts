import axios from "axios";

// Base URL of your API
const API_BASE_URL = "https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Auth";

// Logout function
export const logoutAdmin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include auth token in headers
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Unable to log out. Please try again.");
    }
  }
};
