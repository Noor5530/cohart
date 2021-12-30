import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export default function deleteUserWork(data: any) {
  return apiClient.post(ApiConfig.DELETE_WORK_FROM_SAGA, data);
}
