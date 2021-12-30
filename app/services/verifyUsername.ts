import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const verifyUsername = (data: object) => {
  return apiClient.post(ApiConfig.VERIFY_USERNAME, data);
}
