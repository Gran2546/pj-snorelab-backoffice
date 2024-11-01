// api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create an Axios instance with default settings
const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variable
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need here
    },
});

// Utility function to get query parameters from the current URL
const getQueryParams = (): URLSearchParams => {
    return new URLSearchParams(window.location.search);
};

// Generic function to get data from an endpoint with optional query parameters
export const getData = async <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    try {
        const existingParams = getQueryParams(); // Get existing query params
        if (params) {
            Object.keys(params).forEach(key => existingParams.set(key, params[key])); // Add new params
        }
        const fullUrl = `${endpoint}?${existingParams.toString()}`; // Combine existing and new params
        const response: AxiosResponse<T> = await api.get(fullUrl);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};

// Generic function to post data to an endpoint with optional URL parameters
export const postData = async <T, T2>(
    endpoint: string,
    data: T2,
    params?: Record<string, string>
): Promise<T> => {
    try {
        const existingParams = getQueryParams(); // Get existing query params
        if (params) {
            Object.keys(params).forEach(key => existingParams.set(key, params[key])); // Add new params
        }

        console.log(process.env.REACT_APP_API_BASE_URL);
        const fullUrl = `${endpoint}?${existingParams.toString()}`; // Combine existing and new params

        console.log(fullUrl);
        
        const response: AxiosResponse<T> = await api.post(fullUrl, data);
        return { } as T; // Return the data from the response
    } catch (error) {
        console.error('Error posting data:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
};

// Add more functions for PUT, DELETE, etc., as needed

export default api; // Optionally export the Axios instance for direct use
