import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const createUserWithMail = (body: object) => {
  return apiClient.post(ApiConfig.CREATE_USER_WITH_MAIL, body);
}
