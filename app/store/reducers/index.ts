/*
 * combines all th existing reducers
 */
import { combineReducers } from 'redux';

import appReducer from './appReducer';
import loadingReducer from './loadingReducer';
import snackBarReduces from './snackBarReduces';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  snackBar: snackBarReduces,
  user: userReducer,
  loading: loadingReducer,
  app: appReducer,
});
export default rootReducer;
