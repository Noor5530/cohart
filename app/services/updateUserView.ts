import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export const updateUserView = (data: object) => {
    return apiClient.post(ApiConfig.UPDATE_USER_VIEW, data);
}
