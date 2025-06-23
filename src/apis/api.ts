/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const ApiClient = () => {
  const instance = axios.create();
  instance.interceptors.request.use(async (request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request.headers.Authorization = token;
      request.headers.Accept = "application/json";
    } else {
      console.warn("No token found in localStorage.");
    }
    request.baseURL = (import.meta as any).env.VITE_BASE_URL;
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorObj = error as AxiosError;
      if (errorObj.response?.status === 401) {
        const errorData = errorObj.response?.data as Record<string, string>;
        const errorMessage = errorData?.message || "Unauthorized access.";
        toast.error(errorMessage);
        window.location.href = "/";
      } else {
        const errorData = errorObj.response?.data as Record<string, string>;
        const errorMessage = errorData
          ? errorData.message || errorData.error || errorObj.message
          : "";
        if (errorMessage.length) {
          toast.error(errorMessage);
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

export default ApiClient();
