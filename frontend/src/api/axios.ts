import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";

const authInterpretor = (config: any) => {
  const token = localStorage.getItem("site");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const apiInstance = axios.create({
  // baseURL: `http://185.189.13.249:8080/api/v1`,
  baseURL: `http://0.0.0.0:8000/api/v1`,
});

apiInstance.interceptors.request.use(authInterpretor);
apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (!error) return Promise.reject(error);
    const response = error.response;
    if (401 === response.status) {
      useAuth().logOut;
    } else {
      return Promise.reject(error);
    }
  }
);
