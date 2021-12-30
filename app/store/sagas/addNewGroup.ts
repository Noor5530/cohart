import AppState from 'models/reducers';
import { Response } from 'models/types';
import { call, put, select } from 'redux-saga/effects';
import { addNewGroup } from "services/addNewGroup";
import * as appAction from "store/actions/appAction";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";

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
export default function* addNewGroupSaga(action: any) {
  try {
    yield put(loadingAction.enableLoading());
    const friendsGroup: any[] = yield select(
      (state: AppState) => state.app.friendsGroup
    );
    const response: Response<any[]> = yield call(addNewGroup, action.data);

    if (response.data.statusCode === 200) {
      const data = [response.data.data, ...friendsGroup];
      yield put(appAction.getAllUserGroupResponse(data));
      yield put(loadingAction.disableLoading());
    } else if (response.data.statusCode == 400) {
      yield put(snackBarAction.enableSnackBar(response.data.data.toString()));
    }
    yield put(loadingAction.disableLoading());
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableLoading());
  }
}
