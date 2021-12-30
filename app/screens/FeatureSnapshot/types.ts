import { UserState } from "models/reducers/user";
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

type user = {};

export interface FeatureSnapshotProps {
  item: Post;
}
