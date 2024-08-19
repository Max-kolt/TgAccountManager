import { AxiosResponse } from "axios";
import { apiInstance } from "./axios";


export const start_subscription_func = <T>(body: T): Promise<AxiosResponse> => {
  return apiInstance.post("/tg_actions/sub_process", body);
};
