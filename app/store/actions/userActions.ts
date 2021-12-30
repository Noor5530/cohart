import {
  ChangeNumberRequest,
  ChangeNumberResponse,
  EditProfileRequest,
  EditProfileResponse,
  ILoginRequestState,
  ILoginResponseState,
  IRequestOtpPayload,
  IRequestOtpState,
  IResponse,
  SaveUserTopicRequest,
  SaveUserTopicResponse,
  UpdateProfile,
  UpdateProfileDataRequest,
  UserTopicsState,
  ViewTutorialBody,
  ViewTutorialResponse,
  EditProfileState,
  LogoutRequest,
  LogOutRequestEnum,
  IGetUserInformationState,
} from "models/actions/user";
import {
  UpdateProfileDataResponse,
  ViewTutorialRequest,
} from "../../models/actions/user";
import * as types from "./types";

/*
 * Reducer actions related with login
 */

export function resendOtp(data: IRequestOtpPayload): IRequestOtpState {
  return {
    type: types.REQUEST_RESEND_OTP,
    data,
  };
}

export function requestOtp(data: IRequestOtpPayload): IRequestOtpState {
  return {
    type: types.REQUEST_OTP_FOR_LOGIN,
    data,
  };
}

export function requestLogin(data: {
  phone_number: number | string;
}): ILoginRequestState {
  return {
    type: types.LOGIN_REQUEST,
    data,
  };
}

export function requestGetUserInformation(data: { user_id: string | number }): IGetUserInformationState {
  return {
    type: types.REQUEST_GET_USER,
    data,
  };
}

export function onGetUserResponse(response: IResponse): ILoginResponseState {
  return {
    type: types.GET_USER_RESPONSE,
    response: response,
  };
}

export function onLoginResponse(response: IResponse): ILoginResponseState {
  return {
    type: types.LOGIN_RESPONSE,
    response: response,
  };
}

export function editProfileResponse(
  response: EditProfileState
): EditProfileResponse {
  return {
    type: types.PROFILE_DATA_RESPONSE,
    response,
  };
}

export function editProfileRequest(data: EditProfileState): EditProfileRequest {
  return {
    type: types.PROFILE_DATA_REQUEST,
    data,
  };
}
export function saveTopicResponse(
  response: Array<UserTopicsState>
): SaveUserTopicResponse {
  return {
    type: types.USER_TOPICS_RESPONSE,
    response,
  };
}

export function saveTopicRequest(data: object): SaveUserTopicRequest {
  return {
    type: types.USER_TOPICS_REQUEST,
    data,
  };
}
export function uploadImage(image: string): {
  type: string;
  data: { image: string };
} {
  return {
    type: types.UPLOAD_AVATAR,
    data: {
      image: image,
    },
  };
}
export function saveArtWorkDataRequest(data: any) {
  return {
    type: types.SAVE_ART_WORK_DATA_REQUEST,
    data,
  };
}

export function saveArtWorkDataResponse(response: any) {
  return {
    type: types.SAVE_ART_WORK_DATA_RESPONSE,
    response,
  };
}

export function updateProfileDataRequest(
  data: UpdateProfile
): UpdateProfileDataResponse {
  return {
    type: types.UPDATE_PROFILE_DATA_REQUEST,
    data,
  };
}

export function updateProfileDataResponse(
  response: UpdateProfile
): UpdateProfileDataRequest {
  return {
    type: types.UPDATE_PROFILE_DATA_RESPONSE,
    response,
  };
}

export function updateUserInformationRequest(
  data: UpdateProfile
): UpdateProfileDataResponse {
  return {
    type: types.UPDATE_USER_INFORMATION_REQUEST,
    data,
  };
}

export function updateUserInformationResponse(
  response: UpdateProfile
): UpdateProfileDataRequest {
  return {
    type: types.UPDATE__USER_INFORMATION_RESPONSE,
    response,
  };
}
export function acceptCommunityGuideLines() {
  return {
    type: "ACCEPT_GUIDELINES",
  };
}

export function uploadBackGroundImageRequest(data: object) {
  return {
    type: types.UPLOAD_BACKGROUND_IMAGE_REQUEST,
    data,
  };
}

export function uploadBackGroundImageResponse(response: object) {
  return {
    type: types.UPLOAD_BACKGROUND_IMAGE_RESPONSE,
    response,
  };
}

export function acceptCommunityGuideLinesRequest() {
  return {
    type: types.ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
  };
}

export function acceptCommunityGuideLinesResponse() {
  return {
    type: types.ACCEPT_COMMUNITY_GUIDE_LINES_RESPONSE,
  };
}
export function changeNumberRequest(data: {
  user_id: string;
  current_phone_number: number | string;
  new_phone_number: string;
}): ChangeNumberRequest {
  return {
    type: types.CHANGE_NUMBER_REQUEST,
    data: data,
  };
}

export function changeNumberResponse(response: {
  phone_number: string;
}): ChangeNumberResponse {
  return {
    type: types.CHANGE_NUMBER_RESPONSE,
    response: response,
  };
}

export function viewTutorialRequest(
  data: ViewTutorialBody
): ViewTutorialRequest {
  return {
    type: types.VIEW_TUTORIAL_REQUEST,
    data: data,
  };
}

export function viewTutorialResponse(): ViewTutorialResponse {
  return {
    type: types.VIEW_TUTORIAL_RESPONSE,
  };
}

export function deletePost(data: object): {
  type: string;
  data: object;
} {
  return {
    type: types.DELETE_POST_REQUEST,
    data,
  };
}

export function deleteWork(data: object): {
  type: string;
  data: object;
} {
  return {
    type: types.DELETE_USER_WORK_REQUEST,
    data,
  };
}
export function loginAsRequest(data: object): {
  type: string;
  data: object;
} {
  return {
    type: types.LOGIN_AS_REQUEST,
    data,
  };
}
export function logOutRequest(
  from: LogOutRequestEnum = LogOutRequestEnum.clickButton
): LogoutRequest {
  return {
    type: types.LOG_OUT_REQUEST,
    from: from,
  };
}

export function logOutApiLoading(data: boolean): {
  type: string;
  payload: boolean;
} {
  return {
    type: types.LOG_OUT_API_LOADING,
    payload: data,
  };
}