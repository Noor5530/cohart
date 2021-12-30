import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export const acceptCommunityGuideLines = (data: any) => {
  return apiClient.post(ApiConfig.UPDATE_USER_GUIDE, data);
}
