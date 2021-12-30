import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function saveProfileImage(data: object) {
    return apiClient.post(ApiConfig.SAVE_PROFILE_IMAGE, data);
}
