/**
 *  Redux saga class init
 */
import { all, takeLatest } from 'redux-saga/effects';

import * as types from '../actions/types';
import acceptCommunityGuideLinesSaga from './acceptCommunityGuideLinesSaga';
import acceptPendingRequestSaga from './acceptPendingRequestSaga';
import addNewGroup from './addNewGroup';
import addNewPostSaga from './addNewPostSaga';
import editProfileSaga from './addProfileSaga';
import deletePostSaga from './deletePostSaga';
import deleteWorkSaga from './deleteWorkSaga';
import fetchAllGroupSaga from './fetchAllGroupSaga';
import getAllPostSaga from './getAllPostSaga';
import getSavedWorkSaga from './getMySavedWorkSaga';
import getPendingRequestSaga from './getPendingRequestSaga';
import getSuggestedConnectionCategoriesSaga from './getSuggestedConnectionCategoriesSaga';
import getSuggestedConnectionSaga from './getSuggestedConnectionSaga';
import getUserPostSaga from './getUserPostSaga';
import getYourConnectionSaga from './getYourConnectionSaga';
import loginAsRequestSaga from './loginAsRequestSaga';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';
import rejectPendingRequestSaga from './rejectPendingRequestSaga';
import saveTopicSaga from './saveTopicSaga';
import requestOtpSaga from './requestOtpSaga';
import updatePhoneNumberSaga from './updatePhoneNumberSaga';
import updateProfileSaga from './updateProfileSaga';
import updateUserInformationSaga from './updateUserInformationSaga';
import uploadBackGroundImageSaga from './uploadBackGroundImageSaga';
import viewTutorialSaga from './viewTutorialSaga';
import resendOtpSaga from './resendOtpSaga';
import getUserInformationSaga from './getUserInformationSaga';


export default function* watch() {
    yield all([
        takeLatest(types.REQUEST_RESEND_OTP, resendOtpSaga),
        takeLatest(types.REQUEST_OTP_FOR_LOGIN, requestOtpSaga),
        takeLatest(types.LOGIN_REQUEST, loginSaga),
        takeLatest(types.PROFILE_DATA_REQUEST, editProfileSaga),
        takeLatest(types.USER_TOPICS_REQUEST, saveTopicSaga),
        takeLatest(types.ADD_NEW_POST_REQUEST, addNewPostSaga),
        takeLatest(types.UPDATE_PROFILE_DATA_REQUEST, updateProfileSaga),
        takeLatest(
            types.UPDATE_USER_INFORMATION_REQUEST,
            updateUserInformationSaga,
        ),
        takeLatest(
            types.REQUEST_GET_USER,
            getUserInformationSaga
        ),
        takeLatest(types.GET_ALL_POST_REQUEST, getAllPostSaga),
        takeLatest(types.GET_USER_POST_REQUEST, getUserPostSaga),
        takeLatest(types.GET_YOUR_CONNECTIONS_REQUEST, getYourConnectionSaga),
        takeLatest(types.GET_MY_WORK_REQUEST, getSavedWorkSaga),

        takeLatest(
            types.GET_SUGGESTION_CATEGORIES_REQUEST,
            getSuggestedConnectionCategoriesSaga,
        ),
        takeLatest(
            types.GET_SUGGESTED_CONNECTIONS_REQUEST,
            getSuggestedConnectionSaga,
        ),
        takeLatest(types.GET_PENDING_REQUEST_REQUEST, getPendingRequestSaga),
        takeLatest(
            types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
            acceptPendingRequestSaga,
        ),
        takeLatest(types.FETCH_USER_GROUP_REQUEST, fetchAllGroupSaga),
        takeLatest(types.ADD_GROUP_REQUEST, addNewGroup),
        takeLatest(
            types.UPLOAD_BACKGROUND_IMAGE_REQUEST,
            uploadBackGroundImageSaga,
        ),
        takeLatest(
            types.REJECT_PENDING_REQUEST_REQUEST,
            rejectPendingRequestSaga,
        ),
        takeLatest(
            types.ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
            acceptCommunityGuideLinesSaga,
        ),
        takeLatest(types.CHANGE_NUMBER_REQUEST, updatePhoneNumberSaga),
        takeLatest(types.VIEW_TUTORIAL_REQUEST, viewTutorialSaga),
        takeLatest(types.DELETE_POST_REQUEST, deletePostSaga),
        takeLatest(types.DELETE_USER_WORK_REQUEST, deleteWorkSaga),
        takeLatest(types.LOGIN_AS_REQUEST, loginAsRequestSaga),
        takeLatest(types.LOG_OUT_REQUEST, logoutSaga),
    ]);
}
