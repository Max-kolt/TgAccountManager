import { AxiosResponse } from "axios";
import { apiUserInstance } from "./axios";

export const get_all_users = (): Promise<AxiosResponse> => {
  return apiUserInstance.get("/users/get_all");
};

export const create_user = <T>(body: T): Promise<AxiosResponse> => {
  return apiUserInstance.post("/users/create", body);
};

export const delete_user = (name: string): Promise<AxiosResponse> => {
  return apiUserInstance.delete(`/users/delete/${name}`);
};

export const change_user_password = <T>(
  name: string,
  body: T
): Promise<AxiosResponse> => {
  return apiUserInstance.put(`/users/change_password/${name}`, body);
};
