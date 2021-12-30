import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export default function onSavePost(data: object) {
  return apiClient.post(ApiConfig.ON_SAVE_POST, data);
}
