import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function signUP(email: string) {
  return apiClient.post(ApiConfig.SIGN_UP, { email: email });
}
