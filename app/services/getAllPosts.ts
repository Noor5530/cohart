import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getAllPosts = (data: Object) => {
  return apiClient.post(ApiConfig.FETCH_POSTS, data);
}
