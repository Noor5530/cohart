import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const acceptPendingRequest = (data: object) => {
  return apiClient.post(ApiConfig.ACCEPT_PENDING_REQUEST, data);
}
