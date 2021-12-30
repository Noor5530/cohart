import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function userProfileAboutMe(data: object) {
    return apiClient.post(ApiConfig.USER_PROFILE_ABOUT_ME, data);
}
