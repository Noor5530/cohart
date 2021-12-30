import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getSavedWork = (data: any) => {
  return apiClient.post(ApiConfig.GET_SAVED_WORK, data);
}
