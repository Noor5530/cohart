import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const addNewGroup = (data: any) => {
  return apiClient.post(ApiConfig.ADD_GROUP, data);
}
