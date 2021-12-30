import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export default function saveUserWork(data: object) {
  return apiClient.post(ApiConfig.SAVE_USER_WORK, data);
}
