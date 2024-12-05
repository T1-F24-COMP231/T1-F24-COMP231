import axios from "axios";

const API_BASE_URL = "https://be-webbuilder-cra2hcbuapebdpfp.canadacentral-01.azurewebsites.net/Subscription";

const getAuthToken = () => localStorage.getItem("authToken");

export const getSubscriptionDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || "Failed to fetch subscription details");
  }
};

export const cancelSubscription = async (userId: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cancel`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || "Failed to cancel subscription");
  }
};

export const renewSubscription = async (userId: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/renew`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || "Failed to renew subscription");
  }
};

export const addBillingDetails = async (billingData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/billing`, billingData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || "Failed to add billing details");
  }
};
