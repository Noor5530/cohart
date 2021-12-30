/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
import { Posts, Response } from "models/types";
import { call, put, select } from "redux-saga/effects";
import { fetchUserWork } from "services/fetchUserWork";
import { getUserPost } from "services/getUserPost";
import * as appAction from "store/actions/appAction";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";

import AppState from "../../models/reducers";
import { UserState } from "../../models/reducers/user";

// import { delay } from 'redux-saga';
// import loginUser from 'app/services/loginUser';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* newPost() {
  try {
    yield put(loadingAction.enableAppLoading());
    const user: UserState = yield select((state: AppState) => state.user);

    //  let phoneNumber:string = yield select((state: AppState) => state.user.phone_number);
    //  let response = data != undefined ? [...data, action.data] : [action.data];
    //how to call api
    const data = {
      start_page: 1,
      user_id: user._id,
      self_user: true,
    };
    const response: Response<Posts[]> = yield call(getUserPost, data);
    const userWork: Response<Posts[]> = yield call(fetchUserWork, data);

    yield put(loadingAction.disableAppLoading());

    if (response.data.statusCode === 200) {
      yield put(appAction.getUserPostsResponse(response.data.data));
    }
    if (userWork.data.statusCode === 200) {
      yield put(appAction.fetchUserWorkResponse(userWork.data.data));
    } else {
      throw new Error("");
    }
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableAppLoading());
  }
}
