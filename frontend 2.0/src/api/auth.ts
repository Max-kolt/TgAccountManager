import { AxiosResponse } from "axios";
import { apiInstance } from "./axios";

export const login_api = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.post("/auth/login", body);
};

export const check_api = (): Promise<AxiosResponse> => {
  return apiInstance.get("/auth/check");
};
