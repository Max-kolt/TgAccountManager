import { AxiosResponse } from "axios";
import { apiInstance } from "./axios";

export const get_tg_accounts = (): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse<AccountTableInfo[]>>("/tg/get_all");
};

export const get_tg_accounts_count = (): Promise<AxiosResponse> => {
  return apiInstance.get<AxiosResponse<AccountTableInfo[]>>("/tg/get_count");
};

export const add_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.post("/tg/add_account", body);
};

export const confirm_account = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.put("/tg/confirm_account", body);
};
