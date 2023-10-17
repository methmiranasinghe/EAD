import axios from 'axios';

const instance = axios.create();

// Function to make HTTP requests using Axios
const apiCall = async (method, url, data = null, headers = {}) => {
  try {
    const response = await instance({
      method,
      url,
      data,
      headers,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors here (e.g., network errors, status codes)
    console.log('Api Call ',error)
    throw error;
  }
};

export default apiCall;