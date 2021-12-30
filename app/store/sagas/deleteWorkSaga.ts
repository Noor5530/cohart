import { Posts, Response } from 'models/types';
import { call, put, select } from 'redux-saga/effects';
import { deleteWork } from "services/deleteWork";
import * as appAction from 'store/actions/appAction';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';

import AppState from '../../models/reducers';
import { UserState } from '../../models/reducers/user';

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
// import loginUser from 'app/services/loginUser';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* newPost(action) {
  try {
    yield put(loadingAction.enableLoading());
    const portfolio: UserState = yield select(
      (state: AppState) => state.app.portfolio
    );

    //  let phoneNumber:string = yield select((state: AppState) => state.user.phone_number);
    //  let response = data != undefined ? [...data, action.data] : [action.data];
    //how to call api
    const response: Response<Posts[]> = yield call(deleteWork, action.data);
    yield put(loadingAction.disableLoading());

    //mock response
    if (response.data.statusCode === 200) {
      const data = portfolio?.filter(
        (item) => item?._id !== action.data?.work_id
      );
      yield put(appAction.fetchUserWorkResponse(data));
    } else {
      throw new Error("");
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
