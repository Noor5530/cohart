import createReducer from "lib/createReducer";
import {
  EditProfileResponse,
  ILoginResponseState,
  IRequestOtpResponseState,
  UpdateProfileDataResponse,
  UpdateUserInformationResponse,
} from "models/actions/user";
import { UserState } from "models/reducers/user";
import * as types from "store/actions/types";

import { ChangeNumberResponse } from "../../models/actions/user";

/* Login Reducer
 * handles login states in the app
 */
const initialState: UserState = {
  isLoggedIn: false,
  _id: 0,
  phone_number: "",
  full_name: "",
  interests: [],
  cover_image: "",
  subtitle: "",
  location: "",
  badge: "Artist",
  contactInfo: "",
  meet_me_at: [],
  last_spotted: "",
  currently: "",
  affiliations: [],
  bio: "",
  isProfileCompleted: false,
  title_stamp: 3,
  twitter: "",
  website: "",
  instagram: "",
  isAcceptGuideLines: false,
  tags: [],
  background_image: "",
  post_view: true,
  portfolio_view: true,
  affliation_view: true,
  last_spotted_view: true,
  currently_view: true,
  bio_view: true,
  meet_me_at_view: true,
  username: "",
  tutorial_view: false,
  is_live: false,
  community_channel: "",
  is_admin: false,
  country_code: "",
  user_number: "",
  first_name: "",
  last_name: "",
  token: "",
  loginAs: false,
  user_profile_images: {},
  previous_logged_in: false,
  signup_complete: false,
  user_moods: [],
  user_mediums: [],
  user_tags: [],
};

const loginReducer = createReducer(initialState, {
  [types.REQUEST_OTP_FOR_LOGIN](
    state: UserState,
    action: IRequestOtpResponseState
  ) {
    console.log(action);
    return {
      ...state,
    };
  },
  [types.GET_USER_RESPONSE](state: UserState, action: ILoginResponseState) {
    return {
      ...state,
      ...action.response,  
      seen_me_at: action.response.seen_me_at,
      affiliations: action.response.affiliations_array,
    }
  },
  [types.LOGIN_RESPONSE](state: UserState, action: ILoginResponseState) {
    const data = action.response;
    const stateData = {
      token: state.token,
      ...initialState,
      ...data,
      interests: data.user_interests ? data.user_interests?.split(",") : [],
      meet_me_at: data.meet_me_at,
      seen_me_at: data.seen_me_at,
      affiliations: data.affiliations_array,
      tags: data.tags ? data.tags?.split(",") : [],
      isAcceptGuideLines: data?.accepted_guideline
        ? data?.accepted_guideline
        : false,
      isLoggedIn: true,
      previous_logged_in: true,
      loginAs: data?.loginAs ? true : false,
      user_moods: data.user_moods,
      user_mediums: data.user_mediums,
      user_tags: data.user_tags
    };
    return stateData;
  },

  [types.UPLOAD_AVATAR](state: UserState, action: any) {
    return {
      ...state,
      cover_image: action.data.image,
    };
  },
  [types.SAVE_TOKEN](state: UserState, action: any) {
    return {
      ...state,
      token: action.response,
    };
  },

  [types.PROFILE_DATA_RESPONSE](state: UserState, action: EditProfileResponse) {
    return {
      ...state,
      full_name: action.response.full_name,
      location: action.response.location,
      first_name: action.response.first_name,
      last_name: action.response.last_name,
      username: action.response.username,
    };
  },
  [types.USER_TOPICS_RESPONSE](state: UserState, action: EditProfileResponse) {
    return {
      ...state,
      interests: action.response,
      isLoggedIn: true,
      signup_complete: true,
    };
  },
  [types.UPDATE_PROFILE_DATA_RESPONSE](
    state: UserState,
    action: UpdateProfileDataResponse
  ) {
    const data = action.response;
    const stateData = {
      ...state,
      ...data,
    };
    return stateData;
  },
  [types.UPDATE__USER_INFORMATION_RESPONSE](
    state: UserState,
    action: UpdateUserInformationResponse
  ) {
    const data = action.response;
    return {
      ...state,
      full_name: data.full_name,
      tags: data.tags.split(","),
      location: data.location,
      subtitle: data.subtitle,
      contactInfo: data.contactInfo,
      username: data?.username,
      interests: data?.interests.split(","),
      previous_logged_in: data.previous_logged_in,
      signup_complete: data.signup_complete,
    };
  },
  [types.ADD_NEW_POST_RESPONSE](state: any, action: any) {
    return {
      ...state,
      posts: action.response,
    };
  },
  [types.ACCEPT_COMMUNITY_GUIDE_LINES_RESPONSE](state: any) {
    return {
      ...state,
      isAcceptGuideLines: true,
    };
  },
  [types.UPLOAD_BACKGROUND_IMAGE_RESPONSE](state: any, action: any) {
    return {
      ...state,
      background_image: action.response.background_image,
    };
  },
  [types.VIEW_TUTORIAL_REQUEST](state: UserState) {
    return {
      ...state,
      tutorial_view: true,
    };
  },
  [types.CHANGE_NUMBER_RESPONSE](
    state: UserState,
    action: ChangeNumberResponse
  ) {
    return {
      ...state,
      phone_number: action.response.phone_number,
    };
  },
  [types.LOG_OUT](state: UserState) {
    console.log('LOGOUT =====> ' + JSON.stringify(state));
    return {
      ...state,
      isLoggedIn: false,
      phone_number: "",
      full_name: "",
      interests: [],
      cover_image: "",
      subtitle: "",
      location: "",
      badge: "Artist",
      contactInfo: "",
      meet_me_at: [],
      last_spotted: "",
      currently: "",
      affiliations: [],
      bio: "",
      isProfileCompleted: false,
      title_stamp: 3,
      twitter: "",
      website: "",
      instagram: "",
      isAcceptGuideLines: false,
      tags: [],
      background_image: "",
      post_view: true,
      portfolio_view: true,
      affliation_view: true,
      last_spotted_view: true,
      currently_view: true,
      bio_view: true,
      meet_me_at_view: true,
      username: "",
      tutorial_view: false,
      is_live: false,
      community_channel: "",
      signup_complete: false,
      accepted_guideline: false,
      previous_logged_in: false,
      title: "",
    };
  },
});
export default loginReducer;
