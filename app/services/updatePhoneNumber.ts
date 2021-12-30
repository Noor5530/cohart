import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const updatePhoneNumber = (data: object) => {
  return apiClient.post(ApiConfig.CHANGE_NUMBER, data);
}
