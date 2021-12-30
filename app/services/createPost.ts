import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function createPost(data: any, config: any) {
  return apiClient.post(ApiConfig.CREATE_POST, {
    data,
    config,
  });
}
