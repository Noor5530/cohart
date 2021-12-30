import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export function uploadAvatar(data: object) {
  return apiClient.post(ApiConfig.UPLOAD_AVATAR, data);
}
