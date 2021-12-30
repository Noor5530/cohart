import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export function logout(data: object) {
  return apiClient.post(ApiConfig.LOG_OUT, data);
}
