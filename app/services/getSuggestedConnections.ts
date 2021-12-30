import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getSuggestedConnections = (data: object) => {
  return apiClient.post(ApiConfig.SUGGESTED_CONNECTIONS, data);
}
