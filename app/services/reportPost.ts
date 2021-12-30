import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';
export interface REPORT_DATA {
  post_id: string | number,
  id: string | number,
}

export default function reportPost(data: REPORT_DATA) {
  return apiClient.post(ApiConfig.REPORT_POST, data);
}

