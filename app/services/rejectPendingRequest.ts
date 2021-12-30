import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const rejectPendingRequest = (data: object) => {
  return apiClient.post(ApiConfig.DENY_REQUEST, data);
}
