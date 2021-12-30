import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';
export interface BLOCK_DATA {
  user_id: string | number,
  blocked_user_id: string | number,
}

export const blockUser = (data: BLOCK_DATA) => {
  return apiClient.post(ApiConfig.BLOCK_USER, data);
}

