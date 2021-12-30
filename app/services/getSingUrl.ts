import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getSignUrl = (data: any) => {
  return apiClient.post(ApiConfig.GET_SIGN_URL, data);
}
