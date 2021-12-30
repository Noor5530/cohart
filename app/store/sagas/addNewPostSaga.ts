/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
import { call, put, select } from 'redux-saga/effects';
import * as appAction from 'store/actions/appAction';
import * as loadingAction from 'store/actions/loadingActions';
import { reset } from 'store/actions/navigationActions';
import * as snackBarAction from 'store/actions/snackBarAction';

import AppState from '../../models/reducers/';

// import { delay } from 'redux-saga';

// import loginUser from 'app/services/loginUser';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* newPost(action) {
  try {
    yield put(loadingAction.enableLoading());
    const data = yield select((state: AppState) => state.app.userPost);
    const response =
      data !== undefined ? [...data, action.data] : [action.data];
    //how to call api
    //const response = yield call(loginUser, action.full_name, action.password);
    //mock response
    yield put(loadingAction.disableLoading());

      yield put(loadingAction.disableLoading());

      yield put(appAction.addNewPostResponse(response));
      // yield put(loadingAction.disableLoading());
      yield call(reset);

  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableLoading());
  }
}
