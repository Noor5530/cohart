import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getSuggestedConnectionsCategories = (data: object) => {
  return apiClient.post(ApiConfig.GET_SUGGEST_TAGS, data);
}
