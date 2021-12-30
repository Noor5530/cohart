import AppState from "models/reducers";
import { Response } from "models/types";
import { call, put, select } from "redux-saga/effects";
import { addUserProfile } from "services/addUserProfile";
import * as loadingAction from "store/actions/loadingActions";
import * as navigationActions from "store/actions/navigationActions";
import * as snackBarAction from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";

import {
  EditProfileRequest,
  EditProfileState,
} from "../../models/actions/user";
import { UserState } from "../../models/reducers/user";

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user

interface Body {
  phone_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  location: string;
  state: string;
  country: string;
}
export default function* editProfile(action: EditProfileRequest) {
  try {
    yield put(loadingAction.enableLoading());
    const user: UserState = yield select((state: AppState) => state.user);

    //how to call api
    const data = {
      id: user._id,
      phone_number: user.phone_number,
      full_name: action.data.full_name,
      location: action.data.location,
      state: "",
      country: "",
      interests: "",
      title_stamp: user?.title_stamp ? user?.title_stamp : 3,
      first_name: action.data.first_name,
      last_name: action.data.last_name,
    };

    const apiResponse: Response<Body> = yield call(addUserProfile, data);
    //mock response
    const response: EditProfileState = {
      full_name: action.data.full_name,
      location: action.data.location,
      first_name: action.data.first_name,
      last_name: action.data.last_name,
      username: action.data.username
    };
    
    if (apiResponse?.data.statusCode === 200) {
      yield put(userActions.editProfileResponse(response));
      yield put(loadingAction.disableLoading());
      yield call(navigationActions.navigateToTopic, undefined);
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
