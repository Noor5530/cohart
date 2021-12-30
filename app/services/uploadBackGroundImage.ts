import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const uploadBackGroundImage = (data: object) => {
  return apiClient.post(ApiConfig.UPDATE_BACKGROUND_IMAGE, data);
}
