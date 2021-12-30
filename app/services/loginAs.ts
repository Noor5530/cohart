import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const loginAs = (data: object) => {
  return apiClient.post(ApiConfig.LOGIN_AS, data);
}
