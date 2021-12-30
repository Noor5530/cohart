import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export interface FOLLOW_DATA {
  current_user_id: string | number,
  profile_user_id: string | number,
}

export function followStatus(data: object) {
  return apiClient.get(ApiConfig.GET_FOLLOW_STATUS, { params: data });
}

