import { AxiosResponse } from "axios";
import { apiTelegramInstance } from "./axios";

// Get requests
export const get_tg_accounts = (): Promise<AxiosResponse> => {
  return apiTelegramInstance.get<AxiosResponse>("/telegram/accounts/get_all");
};

export const get_tg_account = (login: string): Promise<AxiosResponse> => {
  return apiTelegramInstance.get<AxiosResponse>(
    `/telegram/accounts/get_by_login/${login}`
  );
};

export const get_tg_accounts_count = (): Promise<AxiosResponse> => {
  return apiTelegramInstance.get<AxiosResponse>("/telegram/accounts/get_count");
};

export const get_tg_account_chats = (login: string): Promise<AxiosResponse> => {
  return apiTelegramInstance.get<AxiosResponse>(
    `/telegram/accounts/get_chats/${login}`
  );
};

// Post requests
export const add_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiTelegramInstance.post("/telegram/accounts/add_account", body);
};

export const send_tg_message = <T>(body: T): Promise<AxiosResponse> => {
  return apiTelegramInstance.post("/telegram/accounts/send_message", body);
};

// Put requests
export const confirm_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiTelegramInstance.put("/telegram/accounts/confirm_account", body);
};
