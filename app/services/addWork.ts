import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const createPost = (data: any, config: any) => {
  return apiClient.post(ApiConfig.ADD_WORK, {
    data,
    config,
  });
}
