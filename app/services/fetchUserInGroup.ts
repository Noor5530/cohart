import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function fetchUserINGroup(data: any) {
  return apiClient.post(ApiConfig.FETCH_USER_IN_GROUP, data);
}
