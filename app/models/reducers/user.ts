export interface ITag {
  _id: string;
  title: string;
  is_active: boolean;
}


export interface UserState {
  _id: 0;
  isLoggedIn: boolean;
  phone_number: number | string;
  full_name?: string;
  invited_by_toggle: boolean;
  is_update?: boolean;
  selected_tags: string[];
  affiliations_array?: string[];
  token?: string;
  location: string;
  interests: string[];
  cover_image: string;
  subtitle: string;
  badge: string;
  contactInfo: string;
  meet_me_at: string[];
  seen_me_at: string[];
  created_at?: string[] | number | any;
  last_spotted: string;
  currently: string;
  affiliations: string[];
  bio: string;
  isProfileCompleted: boolean;
  title_stamp: number;
  instagram: string;
  website: string;
  twitter: string;
  isAcceptGuideLines: boolean;
  tags: string[];
  background_image: string;
  post_view: boolean;
  bio_view: boolean;
  affliation_view: boolean;
  portfolio_view: boolean;
  last_spotted_view: boolean;
  meet_me_at_view: boolean;
  currently_view: boolean;
  username: string;
  tutorial_view: boolean;
  is_live: boolean;
  community_channel: string;
  is_admin: false;
  user_number: string;
  country_code: string;
  first_name: string;
  last_name: string;
  loginAs: boolean;
  email: string;
  previous_logged_in: boolean;
  signup_complete: boolean;
  referral_by: {
    cover_image: string;
    full_name: string;
    first_name: string;
    last_name: string;
    last_active: number;
  }
  user_profile_images: {
    image1_original: string;
    image1_original_width: number;
    image1_original_height: number;
    image1_thumb: string;
    image1_thumb_width: number;
    image1_thumb_height: number;
    image2_original: string;
    image2_original_width: number;
    image2_original_height: number;
    image2_thumb: string;
    image2_thumb_width: number;
    image2_thumb_height: number;
    image3_original: string;
    image3_original_width: number;
    image3_original_height: number;
    image3_thumb: string;
    image3_thumb_width: number;
    image3_thumb_height: number;
    image4_original: string;
    image4_original_width: number;
    image4_original_height: number;
    image4_thumb: string;
    image4_thumb_width: number;
    image4_thumb_height: number;
    image5_original: string;
    image5_original_width: number;
    image5_original_height: number;
    image5_thumb: string;
    image5_thumb_width: number;
    image5_thumb_height: number;
    image6_original: string;
    image6_original_width: number;
    image6_original_height: number;
    image6_thumb: string;
    image6_thumb_width: number;
    image6_thumb_height: number;
  };

  user_moods: ITag[],
  user_mediums: ITag[],
  user_tags: ITag[],
}

export interface IMyTags {
  user_id: number | string;
  user_moods: ITag[] | undefined,
  user_mediums: ITag[] | undefined,
  user_tags: ITag[] | undefined,
}

