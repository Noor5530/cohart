import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export interface FOLLOW_DATA {
  user_id: string | number,
  follower_id: string | number,
  unfollow: boolean
}


export const followUser = (data: FOLLOW_DATA) => {
  return apiClient.post(ApiConfig.FOLLOW_USER, data);
}
