import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export default function createPrefineryUser(data: any) {
  return apiClient
    .post(ApiConfig.CREATE_PREFINERY_USER, data)
    .then((res) => res.data);
}
