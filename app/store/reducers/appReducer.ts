/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { IAppState } from "models/reducers/app";
import * as types from "store/actions/types";

const initialState: IAppState = {
  posts: [],
  userPost: [],
  yourConnections: [],
  suggestedConnections: [],
  pendingRequest: [],
  suggestedConnectionsCategories: [],
  portfolio: [],
  friendsGroup: [],
  savedWork: [],
  live_data: null,
  processingDeeplink: false,
};

const appReducer = (
  state = initialState,
  action: { type: string; response: object }
) => {
  switch (action.type) {
    
    case types.LOGIN_RESPONSE: {
      return initialState;
    }
    case types.ADD_NEW_POST_RESPONSE: {
      return {
        ...state,
        userPost: action.response,
      };
    }
    case types.START_DEEPLINK_REQUEST: {
      return {
        ...state,
        processingDeeplink: true
      };
    }
    case types.FINISH_DEEPLINK_REQUEST: {
      return {
        ...state,
        processingDeeplink: false
      };
    }
    case types.GET_USER_POST_RESPONSE: {
      return {
        ...state,
        userPost: action.response,
      };
    }
    case types.GET_ALL_POST_RESPONSE: {
      return {
        ...state,
        posts: action.response,
      };
    }
    case types.GET_YOUR_CONNECTIONS_RESPONSE: {
      return {
        ...state,
        yourConnections: action.response,
      };
    }
    case types.GET_SUGGESTED_CONNECTIONS_RESPONSE: {
      return {
        ...state,
        suggestedConnections: action.response,
      };
    }
    case types.FETCH_USER_WORK_RESPONSE: {
      return {
        ...state,
        portfolio: action.response,
      };
    }
    case types.GET_SUGGESTION_CATEGORIES_RESPONSE: {
      return {
        ...state,
        suggestedConnectionsCategories: action.response,
      };
    }
    case types.GET_PENDING_REQUEST_RESPONSE: {
      return {
        ...state,
        pendingRequest: action.response,
      };
    }
    case types.GET_MY_WORK_RESPONSE: {
      return {
        ...state,
        savedWork: action.response,
      };
    }
    case types.FETCH_GROUP_USER_RESPONSE: {
      return {
        ...state,
        friendsGroup: action.response,
      };
    }
    case types.TOGGLE_SOCKET_EVENT: {
      return {
        ...state,
        live_data: action.response,
      };
    }
    case types.LOGIN_AS_REQUEST: {
      return initialState;
    }
    case types.LOG_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
