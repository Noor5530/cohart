import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

type GetFansListParams = {
  user_id: string | number;
  search_key: string;
  page?: number;
  page_size?: number;
};
export function getFansList(data: GetFansListParams) {
  return apiClient.get(ApiConfig.GET_FANS_LIST, {
    params: data,
  });
}
