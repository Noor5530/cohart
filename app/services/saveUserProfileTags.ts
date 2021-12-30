import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export interface ISaveTags {
   id: string;
   mediums: string[] | undefined;
   moods: string[] | undefined;
   tags: string[] | undefined;
}

export default function saveUserProfileTags(data: ISaveTags) {
  return apiClient.post(ApiConfig.SAVE_USER_PROFILE_TAGS, data);
}
