import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const updateBioProfile = (data: object) => {
  return apiClient.post(ApiConfig.UPDATE_BIO_PROFILE, data);
}
