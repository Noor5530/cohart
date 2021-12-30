import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

type GetFeaturePostsPrams = {
  admin_view: boolean;
};
export function getFeaturedPosts(data: GetFeaturePostsPrams) {
  return apiClient.get(ApiConfig.GET_FEATURED_POSTS, {
    params: data,
  });
}
