import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function sentReferral(data: any) {
  return apiClient.post(ApiConfig.REFERRAL, data);
}

export { sentReferral };
