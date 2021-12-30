import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const getPostDetail = (data: any) => {
  return apiClient.post(ApiConfig.POST_DETAIL, 
    data,
  );
}
