/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'lib/createReducer';
import { ILoading } from 'models/reducers/loading';
import * as types from 'store/actions/types';

const initialState: ILoading = {
  isLoginLoading: false,
  isAppLoading: false,
  logOutAPiCalling: false,
};

const loadingReducer = createReducer(initialState, {
  [types.ENABLE_LOADER](state: ILoading) {
    return { ...state, isLoginLoading: true };
  },
  [types.DISABLE_LOADER](state: ILoading) {
    return { ...state, isLoginLoading: false };
  },
  [types.ENABLE_APP_LOADER](state: ILoading) {
    return { ...state, isAppLoading: true };
  },
  [types.DISABLE_APP_LOADER](state: ILoading) {
    return { ...state, isAppLoading: false };
  },
  [types.LOG_OUT_API_LOADING](
    state: ILoading,
    action: { type: string; payload: boolean }
  ) {
    return { ...state, logOutAPiCalling: action.payload };
  },
  [types.LOGOUT]() {
    return initialState;
  },
});
export default loadingReducer;
