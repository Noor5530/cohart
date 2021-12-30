import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export default function resetBadgeCounter(data: object) {
    return apiClient.post(ApiConfig.RESET_BADGE_COUNTER, data);
}
