import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";

const authInterpretor = (config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

export const apiInstance = axios.create({
  baseURL: `http://0.0.0.0:8080/api/v1`,
});

apiInstance.interceptors.request.use(authInterpretor);
apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      useAuth().logOut;
    } else {
      return Promise.reject(error);
    }
  }
);
