import * as appAction from './appAction';
import * as loadingAction from './loadingActions';
import * as navigationActions from './navigationActions';
import * as snackBarAction from './snackBarAction';
import * as userActions from './userActions';

// export action creators
export const ActionCreators = Object.assign(
  {},
  appAction,
  userActions,
  loadingAction,
  snackBarAction,
  navigationActions,
);
