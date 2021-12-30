import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getYourConnectionsRequest = (data: object) => {
  return apiClient.post(ApiConfig.YOUR_CONNECTIONS, data);
}
