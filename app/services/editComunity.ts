import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function deleteGroup(data: object) {
  return apiClient.post(ApiConfig.EDIT_GROUP, data);
}
