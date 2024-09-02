import { AxiosResponse } from "axios";
import { apiTelegramInstance } from "./axios";

export const start_subscription_func = <T>(body: T): Promise<AxiosResponse> => {
  return apiTelegramInstance.post("/tg_actions/sub_process", body);
};
