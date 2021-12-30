import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function updateBioProfile(data: object) {
  return apiClient.post(ApiConfig.SEND_REQUEST, data);
}
