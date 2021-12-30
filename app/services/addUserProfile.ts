import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const addUserProfile = (data: object) => {
  return apiClient.post(ApiConfig.ADD_USER_PROFILE, data);
}
