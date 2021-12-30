import { Posts, Response } from 'models/types';
import { call, put } from 'redux-saga/effects';
import { getSavedWork } from 'services/getSavedWork';
import * as appAction from 'store/actions/appAction';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* getSavedWorkSaga(action) {
  try {
    yield put(loadingAction.enableAppLoading());
    //how to call api
    const response: Response<Posts[]> = yield call(getSavedWork, action.data);
    if (response.data.statusCode === 200) {
      yield put(loadingAction.disableAppLoading());
      if (Array.isArray(response.data.data)) {
        yield put(appAction.getSavedWorkResponse(response.data.data));
      }
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableAppLoading());
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }

    yield put(loadingAction.disableAppLoading());
  }
}
