import { AxiosResponse } from "axios";
import { apiTelegramInstance } from "./axios";

export const start_subscription_func = <T>(body: T): Promise<AxiosResponse> => {
  return apiTelegramInstance.post("/telegram/actions/sub_process", body);
};

export const get_subscription = (): Promise<AxiosResponse> => {
  return apiTelegramInstance.get("/telegram/actions/process");
};

export const cancel_subscription = (id: string): Promise<AxiosResponse> => {
  return apiTelegramInstance.post(`/telegram/actions/${id}/process_cancel`);
};

