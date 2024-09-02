import { AxiosResponse } from "axios";
import { apiUserInstance } from "./axios";

export const login_api = <T>(body: T): Promise<AxiosResponse> => {
  return apiUserInstance.post("/auth/login", body);
};
