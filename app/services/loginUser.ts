import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const loginUser = (data: object) => {
  return apiClient.post(ApiConfig.LOGIN, data);
}
