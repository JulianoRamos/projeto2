import axios, { AxiosError, AxiosInstance } from 'axios';

export const setupApiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        window.location.href = '/error-401';
      }

      return Promise.reject(error);
    },
  );

  return api;
};
