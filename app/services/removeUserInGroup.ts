import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function addUserInGroup(data: object) {
  return apiClient.post(ApiConfig.REMOVE_USER_IN_GROUP, data);
}
