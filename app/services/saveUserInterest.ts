import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const saveUserInterest = (data: object) => {
  return apiClient.post(ApiConfig.SAVE_USER_INTEREST, data);
}
