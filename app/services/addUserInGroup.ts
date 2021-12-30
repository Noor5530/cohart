import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const addUserInGroup = (data: object) => {
  return apiClient.post(ApiConfig.ADD_USER_IN_GROUP, data);
}
