import { AxiosResponse } from "axios";
import { apiInstance } from "./axios";

// Get requests
export const get_tg_accounts = (): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse>("/tg/get_all");
};

export const get_tg_account = (login: string): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse>(`/tg/get_by_login/${login}`);
};

export const get_tg_accounts_count = (): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse>("/tg/get_count");
};

export const get_tg_account_chats = (login: string): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse>(`/tg/get_chats/${login}`);
};

// Post requests
export const add_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.post("/tg/add_account", body);
};

export const send_tg_message = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.post("/tg/send_message", body);
};

// Put requests
export const confirm_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.put("/tg/confirm_account", body);
};
