import Config from "react-native-config";

const ApiConfig = {
  BASE_URL:
    Config.BUILD === "production"
      ? "https://4qboyk0742.execute-api.us-east-1.amazonaws.com/prod/v1/"
      : "https://j7pzco1sdk.execute-api.us-east-1.amazonaws.com/staging/v1/",

  SIGN_UP: "createPrefineryUser",
  LOGIN: "updateUserWithTerm",
  ADD_USER_PROFILE: "updateCohartUser",
  SAVE_USER_INTEREST: "updateIntrests",
  UPDATE_BIO_PROFILE: "updateBio",
  UPDATE_USER_INFORMATION: "updateUserProfile",
  UPLOAD_AVATAR: "uploadImageToS3",
  CREATE_POST: "createPost",
  FETCH_POSTS: "fetchPosts",
  FETCH_USER_POSTS: "fetchPosts",
  SEND_REQUEST: "sendConnectionRequest",
  PENDING_REQUEST: "checkIncomingRequests",
  YOUR_CONNECTIONS: "getMyConnectedUsers",
  SUGGESTED_CONNECTIONS: "suggestedConnections",
  SUGGESTED_CONNECTIONS_CONNECTIONS: "getMyConnectedUsers",
  ACCEPT_PENDING_REQUEST: "acceptConnectionRequest",
  FETCH_USER_WORK: "fetchUserWorks",
  ADD_GROUP: "addGroup",
  ADD_USER_IN_GROUP: "addUserInGroup",
  FETCH_GROUP_USER: "fetchUserGroups",
  UPDATE_BACKGROUND_IMAGE: "updateBackgroundImage",
  REMOVE_USER_IN_GROUP: "deleteUserFromGroup",
  FETCH_USER_IN_GROUP: "fetchUserInGroup",
  SAVE_USER_WORK: "saveUserWork",
  GET_SAVED_WORK: "userSavedWorks",
  PREVIOUS_CHAT:
    Config.BUILD === "production"
      ? "https://6jqf47vv9d.execute-api.us-east-1.amazonaws.com/prod/previous_chat"
      : "https://gv550ke9ij.execute-api.us-east-1.amazonaws.com/staging/previous_chat",
  WEB_SOCKET_URL:
    Config.BUILD === "production"
      ? "wss://43az9ur1nl.execute-api.us-east-1.amazonaws.com/prod?"
      : "wss://4z9yv5s4t1.execute-api.us-east-1.amazonaws.com/staging?",
  CODE_VERIFICATION: "userCodeValidation",
  SEND_CODE: "sendSMS",
  CREATE_USER_WITH_MAIL: "createUserAfterTwilio",
  Notification: "getUserNotifications",
  UPDATE_USER_GUIDE: "updateUserGuide",
  ADD_WORK: "addWork",
  FOLLOW_USER: "followUser",
  GET_FOLLOW_STATUS: "followStatus",
  DELETE_GROUP: "deleteGroup",
  EDIT_GROUP: "editGroup",
  FETCH_WORKS: "fetchUserWorks",
  GET_SUGGEST_TAGS: "getSuggestedTags",
  FETCH_USER_POST: "fetchUserPosts",
  USER_INFO: "userInfo",
  DENY_REQUEST: "denyConnectionRequest",
  CHECK_IS_CONNECTED: "checkAlreadyConnected",
  DELETE_WORK_FROM_SAGA: "deleteSaveUserWork",
  GET_SAVE_WORK_DATA: "saveUserWorkData",
  SEND_FEED_BACK: "feedback",
  CHANGE_NUMBER: "updatePhoneNumber",
  UPDATE_USER_VIEW: "updateUserView",
  SEARCH_USER: "searchUser",
  EDIT_WORK: "editWork",
  DELETE_WORK: "deleteWork",
  DELETE_POST: "deletePost",
  EDIT_POST: "editPost",
  BLOCK_USER: "blockUser",
  REPORT_USER: "reportUser",
  REPORT_POST: "reportPost",
  BLOCK_POST: "blockPost",
  SEND_SMS_FOR_NUMBER_CHANGE: "sendSMSforNumberChange",
  CODE_VERIFICATION_FOR_LOGIN: "smstoVerifyLogin",
  LOGIN_AS: "loginAs",
  VERIFY_USERNAME: "verifyUsername",
  GET_SIGN_URL: "getSignedUrl",
  SEND_CODE_VIA_EMAIL: "sendCodeViaEmail",
  REFERRAL: "referral",
  UPDATE_POST_GLOW_COUNT: "UpdatePostGlowCount",
  POST_DETAIL: "postDetail",
  RESET_BADGE_COUNTER: "resetBadgeCounter",
  LOG_OUT: "logoutCleanup",
  GET_FEATURED_POSTS: "getFeaturedPosts",
  CREATE_PREFINERY_USER: "createPrefineryUser",
  SAVE_PROFILE_IMAGE: "saveProfileImage",
  USER_PROFILE_DETAILS: "userProfileDetails",
  USER_PROFILE_ABOUT_ME: 'userProfileAboutMe',
  GET_DEEPLINK_POST: 'deepLinkPost',
  ON_SAVE_POST: "saveFeaturedPost",
  USER_PROFILE_MORE: "userProfileMore",
  SAVE_USER_PROFILE_TAGS: "userProfileTags",
  GET_FANS_LIST: "getUserFollowers",
};

export default ApiConfig;