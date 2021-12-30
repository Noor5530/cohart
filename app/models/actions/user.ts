import { ITag } from "models/reducers/user";

export interface IRequestOtpPayload {
  phone_number?: string;
  user_code?: string;
  user_id?: string;
  non_formatted_phone_number?: string;
  country_code: string;
  request_otp_type: string;
    registration_id?: string;
    resend_sms?: boolean
}

export interface IRequestOtpState {
  type: string;
  data: IRequestOtpPayload;
}

export interface IRequestOtpResponseState {
  data: {
    data: any;
    statusCode: number;
  };
}
export interface IGetUserInformationState {
  type: string;
  data: { user_id: string | number };
}

export interface ILoginRequestState {
  type: string;
  data: { phone_number: string | number };
}

export interface IResponse {
  full_name?: string;
  location?: string;
  phone_number?: number | string;
  token?: string;
  interests?: string;
  cover_image?: string;
  subtitle?: string;
  badge?: string;
  contactInfo?: string;
  meet_me_at?: string;
  last_spotted?: string;
  currently?: string;
  affiliations?: string;
  bio?: string;
  user_interests?: string;
  tags: string[];
  accepted_guideline: boolean;
  loginAs?: boolean;
  seen_me_at?: string,
  user_moods: ITag[],
  user_mediums: ITag[],
  user_tags: ITag[]
}

export interface ILoginResponseState {
  type: string;
  response: IResponse;
}

export interface ProfileState {
  full_name: string;
  location: string;
  phone_number?: number | string;
  token?: string;
  interests?: string[];
  cover_image?: string;
  subtitle?: string;
  badge?: string;
  contactInfo?: string;
  meet_me_at?: string[];
  last_spotted?: string;
  currently?: string;
  affiliations?: string;
  bio?: string;
  title_stamp: number;
  twitter: string;
  website: string;
  instagram: string;
  post_view: boolean;
  bio_view: boolean;
  affliation_view: boolean;
  portfolio_view: boolean;
  last_spotted_view: boolean;
  meet_me_at_view: boolean;
  currently_view: boolean;
  accepted_guideline: boolean;
  first_name: string;
  last_name: string;
  previous_logged_in: boolean;
  signup_complete: boolean;
  username: string;
}

export interface EditProfileRequest {
  data: EditProfileState;
  type: string;
}

export interface EditProfileResponse {
  response: EditProfileState;
  type: string;
}

export interface UserTopicsState {
  id: string | number;
  name: string;
}

export interface SaveUserTopicRequest {
  data: any;
  type: string;
}

export interface SaveUserTopicResponse {
  response: any;
  type: string;
}

export type UpdateUserInformation = Pick<
  ProfileState,
  | "location"
  | "interests"
  | "subtitle"
  | "full_name"
  | "contactInfo"
  | "title_stamp"
>;

export type UpdateProfile = Pick<
  ProfileState,
  | "affiliations"
  | "cover_image"
  | "contactInfo"
  | "currently"
  | "meet_me_at"
  | "last_spotted"
  | "bio"
  | "title_stamp"
  | "website"
  | "twitter"
  | "instagram"
  | "affliation_view"
  | "bio_view"
  | "currently_view"
  | "last_spotted_view"
  | "meet_me_at_view"
  | "portfolio_view"
  | "post_view"
>;
export type EditProfileState = Pick<
  ProfileState,
  "first_name" | "last_name" | "location" | "full_name" | "username"
>;
export interface UpdateProfileDataRequest {
  data: UpdateProfile;
  type: string;
}

export interface UpdateProfileDataResponse {
  response: UpdateProfile;
  type: string;
}
export interface UpdateUserInformationRequest {
  data: UpdateUserInformation;
  type: string;
}

export interface UpdateUserInformationResponse {
  response: UpdateUserInformation;
  type: string;
}
export interface ChangeNumberRequest {
  type: string;
  data: {
    user_id: string;
    current_phone_number: string | number;
    new_phone_number: string;
  };
}

export interface ChangeNumberResponse {
  type: string;
  response: {
    phone_number: string;
  };
}
export type ViewTutorialBody = {
  id: string;
  view_type: string;
  view_state: boolean;
};
export interface ViewTutorialRequest {
  type: string;
  data: ViewTutorialBody;
}

export interface ViewTutorialResponse {
  type: string;
}

export enum LogOutRequestEnum {
  tokenExpire = "tokenExpire",
  clickButton = "",
}
export interface LogoutRequest {
  type: string;
  from: LogOutRequestEnum;
}