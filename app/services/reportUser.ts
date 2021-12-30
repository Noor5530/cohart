import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';
export interface REPORT_DATA {
  reported_by_id: string | number,
  reported_user_id: string | number,
  report_option: number,
}

export const reportUser = (data: REPORT_DATA) => {
  return apiClient.post(ApiConfig.REPORT_USER, data);
}

