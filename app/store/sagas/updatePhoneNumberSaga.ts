import { ChangeNumberRequest, LogOutRequestEnum } from "models/actions/user";
import { call, put } from "redux-saga/effects";
import { updatePhoneNumber } from "services/updatePhoneNumber";
import * as loadingAction from "store/actions/loadingActions";
import * as navigationActions from "store/actions/navigationActions";
import * as snackBarAction from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';

// import loginUser from 'app/services/loginUser';
// Our worker Saga that logins the user
export default function* editProfile(action: ChangeNumberRequest) {
  try {
    yield put(loadingAction.enableLoading());
    const apiResponse: {
      data: {
        statusCode: number;
      };
    } = yield call(updatePhoneNumber, action.data);
    if (apiResponse.data.statusCode === 200) {
      yield put(
        userActions.changeNumberResponse({
          phone_number: action.data.new_phone_number,
        })
      );
      yield put(loadingAction.disableLoading());
      yield put(snackBarAction.enableSnackBar("Number updated successfully"));

      yield call(navigationActions.reset, undefined);
    } else if (apiResponse.data.statusCode === 201) {
      yield put(loadingAction.disableLoading());
      yield put(
        snackBarAction.enableSnackBar(apiResponse?.data?.body.toString())
      );
    } else {
      yield put(loadingAction.disableLoading());
      yield put(
        snackBarAction.enableSnackBar(apiResponse?.data?.data.toString())
      );
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
