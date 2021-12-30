import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function userProfileDetail(data: object) {
    return apiClient.post(ApiConfig.USER_PROFILE_DETAILS, data);
}
