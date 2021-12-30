import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function UpdatePostGlowCount(data: object) {
  return apiClient.post(ApiConfig.UPDATE_POST_GLOW_COUNT, data);
}
