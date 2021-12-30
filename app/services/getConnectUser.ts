import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getConnectUser = (data: object) => {
  return apiClient.post(ApiConfig.YOUR_CONNECTIONS, data);
}
