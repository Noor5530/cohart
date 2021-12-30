import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export interface FOLLOW_DATA {
  recipient_id: string | number,
  sender_id: string | number,
  make_connection?: boolean
}


export const sendConnectionRequest = (data: FOLLOW_DATA) => {
  return apiClient.post(ApiConfig.SEND_REQUEST, data);
}
