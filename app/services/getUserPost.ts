import ApiConfig from "config/api-config";
import { apiClient } from "services/client";
import { UserState } from "models/reducers/user";
import { AxiosResponse } from "axios";

export type Post = {
  _id: string | number;
  user_id: string | number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  tags: string;
  processing_status: string;
  post_image: string;
  post_file: string;
  jw_media_id: string;
  jw_media_url: string;
  jw_media_thumb: string;
  post_type: string;
  is_hide: boolean;
  created_by: UserState;
  glow_count: number;
  is_featured: boolean;
};

type Body = {
  page: number;
  page_size: number;
  user_id: number;
};
type Response = {
  data: Post[];
  statusCode: string | number;
};
export function getUserPost(
  data: Body
): Promise<AxiosResponse<Response>> {
  return apiClient.get(ApiConfig.FETCH_USER_POST, { params: data });
}
