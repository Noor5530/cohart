import { call, delay, put, select } from "redux-saga/effects";
import { acceptCommunityGuideLines } from "services/acceptCommunityGuideLines";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";

import AppState from "models/reducers";
import { UserState } from "models/reducers/user";

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';

// import loginUser from 'app/services/loginUser';
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* acceptCommunityGuideLinesSaga() {
  try {
    yield delay(1300);

    yield put(loadingAction.enableLoading());
    const user: UserState = yield select((state: AppState) => state.user);
    //how to call api
    //const response = yield call(loginUser, action.full_name, action.password);
    //mock response

    const data = {
      id: user._id,
      accepted_guideline: true,
    };
    const apiResponse: {
      data: {
        statusCode: number;
        data: object;
      };
    } = yield call(acceptCommunityGuideLines, data);
    if (apiResponse.data.statusCode === 200) {
      yield put(userActions.acceptCommunityGuideLinesResponse());
      yield put(loadingAction.disableLoading());
    } else {
      yield put(loadingAction.disableLoading());
      yield put(snackBarAction.enableSnackBar());
    }
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableLoading());
  }
}
