import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export interface DELETE_DATA {
  post_id: string | number | undefined;
  id: string | number;
}

export function deletePost(data: DELETE_DATA) {
  return apiClient.post(ApiConfig.DELETE_POST, data);
}
