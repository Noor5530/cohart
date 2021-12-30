import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getUserInformation = (data: any) => {
  return apiClient.get(ApiConfig.USER_INFO, { params: data });
}
