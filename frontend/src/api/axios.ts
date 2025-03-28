import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";

const authInterpretor = (config: any) => {
  const token = localStorage.getItem("site");
  if (token) config.headers.AccessToken = `Bearer ${token}`;
  return config;
};

export const apiUserInstance = axios.create({
  baseURL: `http://185.189.13.249:8043/api/v1`,
  // baseURL: `http://0.0.0.0:8081/api/v1`,
});

apiUserInstance.interceptors.request.use(authInterpretor);
apiUserInstance.interceptors.response.use(
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

export const apiTelegramInstance = axios.create({
  baseURL: `http://185.189.13.249:8052/api/v1`,
  // baseURL: `http://0.0.0.0:8080/api/v1`
});
apiUserInstance.interceptors.request.use(authInterpretor);
apiUserInstance.interceptors.response.use(
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
