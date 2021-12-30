import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getPendingRequest = (data: object) => {
  return apiClient.post(ApiConfig.PENDING_REQUEST, data);
}
