import { Posts, Response } from 'models/types';
import { call, put } from 'redux-saga/effects';
import { getConnectUser } from 'services/getConnectUser';
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
export default function* getYourConnectionsSaga(action: any) {
  try {
    yield put(loadingAction.enableAppLoading());
    //how to call api
    const response: Response<Posts[]> = yield call(getConnectUser, action.data);
    if (response.data.statusCode === 200) {
      yield put(loadingAction.disableAppLoading());
      if (Array.isArray(response?.data?.body.my_connected_users)) {
        yield put(
          appAction.getYourConnectionResponse(
            response.data.body.my_connected_users
          )
        );
      } else {
        yield put(appAction.getYourConnectionResponse([]));
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
