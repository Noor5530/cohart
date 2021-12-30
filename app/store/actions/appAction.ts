import { GetAllPostRequest, GetAllPostResponse } from 'models/actions/app';
import { Posts } from 'models/types';

import * as types from './types';

export function addNewPostRequest(data: any) {
  return {
    type: types.ADD_NEW_POST_REQUEST,
    data,
  };
}

export function addNewPostResponse(response: any) {
  return {
    type: types.ADD_NEW_POST_RESPONSE,
    response,
  };
}

export function getAllPostsRequest(data: any): GetAllPostRequest {
  return {
    type: types.GET_ALL_POST_REQUEST,
    data,
  };
}

export function startDeeplinkRequest() {
  return {
    type: types.START_DEEPLINK_REQUEST
  };
}

export function finishDeeplinkRequest() {
  return {
    type: types.FINISH_DEEPLINK_REQUEST
  };
}

export function getAllPostsResponse(response: Posts[]): GetAllPostResponse {
  return {
    type: types.GET_ALL_POST_RESPONSE,
    response,
  };
}

export function getUserPostsRequest(): GetAllPostRequest {
  return {
    type: types.GET_USER_POST_REQUEST,
  };
}

export function getUserPostsResponse(response: Posts[]): GetAllPostResponse {
  return {
    type: types.GET_USER_POST_RESPONSE,
    response,
  };
}
export function getYourConnectionRequest(data: any) {
  return {
    type: types.GET_YOUR_CONNECTIONS_REQUEST,
    data,
  };
}

export function getYourConnectionResponse(response: any) {
  return {
    type: types.GET_YOUR_CONNECTIONS_RESPONSE,
    response,
  };
}
export function getSuggestedConnectionsRequest(data: any) {
  return {
    type: types.GET_SUGGESTED_CONNECTIONS_REQUEST,
    data,
  };
}

export function getSuggestedConnectionsResponse(response: any) {
  return {
    type: types.GET_SUGGESTED_CONNECTIONS_RESPONSE,
    response,
  };
}
export function getPendingRequestRequest(data: any) {
  return {
    type: types.GET_PENDING_REQUEST_REQUEST,
    data,
  };
}

export function getPendingRequestResponse(response: any) {
  return {
    type: types.GET_PENDING_REQUEST_RESPONSE,
    response,
  };
}

export function getSuggestionConnectionCategoriesRequest(data: any) {
  return {
    type: types.GET_SUGGESTION_CATEGORIES_REQUEST,
    data,
  };
}

export function getSuggestionConnectionCategoriesResponse(response: any) {
  return {
    type: types.GET_SUGGESTION_CATEGORIES_RESPONSE,
    response,
  };
}

export function fetchUserWorkRequest() {
  return {
    type: types.FETCH_USER_WORK_REQUEST,
  };
}

export function fetchUserWorkResponse(response: any) {
  return {
    type: types.FETCH_USER_WORK_RESPONSE,
    response,
  };
}

export function getAcceptPendingRequest(data: any) {
  return {
    type: types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
    data,
  };
}

export function rejectPendingRequest(data: any) {
  return {
    type: types.REJECT_PENDING_REQUEST_REQUEST,
    data,
  };
}

export function addNewGroupRequest(data: any) {
  return {
    type: types.ADD_GROUP_REQUEST,
    data,
  };
}

export function addNewGroupResponse(response: any) {
  return {
    type: types.ADD_GROUP_REQUEST,
    response,
  };
}

export function addUserInGroupRequest(data: any) {
  return {
    type: types.ADD_GROUP_USER_REQUEST,
    data,
  };
}

export function addUserInGroupResponse(response: any) {
  return {
    type: types.ADD_GROUP_USER_RESPONSE,
    response,
  };
}

export function getAllUserGroupRequest(data: any) {
  return {
    type: types.FETCH_USER_GROUP_REQUEST,
    data,
  };
}

export function getAllUserGroupResponse(response: any) {
  return {
    type: types.FETCH_GROUP_USER_RESPONSE,
    response,
  };
}

export function getSavedWorkRequest(data: object) {
  return {
    type: types.GET_MY_WORK_REQUEST,
    data,
  };
}

export function getSavedWorkResponse(response: object) {
  return {
    type: types.GET_MY_WORK_RESPONSE,
    response,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function socketEvent(response: any) {
  return {
    type: types.TOGGLE_SOCKET_EVENT,
    response,
  };
}
