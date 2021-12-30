import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const fetchALLGroup = (data: any) => {
  return apiClient.post(ApiConfig.FETCH_GROUP_USER, data);
}
