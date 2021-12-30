import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const deleteWork = (data: Object) => {
  return apiClient.post(ApiConfig.DELETE_WORK, data);
}
