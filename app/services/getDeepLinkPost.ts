import ApiConfig from "config/api-config";
import { apiClient } from "services/client";

export default function getDeepLinkPost(postId?: string) {
  return apiClient.get(`${ApiConfig.GET_DEEPLINK_POST}?post_id=${postId}`).then(res => res.data.data);
}
