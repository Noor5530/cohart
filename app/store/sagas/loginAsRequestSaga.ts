import { ILoginRequestState, LogOutRequestEnum } from "models/actions/user";
import { Response } from "models/types";
import { call, put } from "redux-saga/effects";
import { getUserInformation } from "services/getUserInformation";
import { loginAs as loginUser } from "services/loginAs";
import * as loadingAction from "store/actions/loadingActions";
import * as navigationActions from "store/actions/navigationActions";
import * as snackBarAction from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";

import { IResponse } from "../../models/actions/user";
import { Posts } from "../../models/types";

type UserData = {
  statusCode: string | number;
  user_data: IResponse;
  posts: Posts[];
};
export default function* loginAsync(action: ILoginRequestState) {
  try {
    yield put(loadingAction.enableLoading());
    let response: Response<UserData>;
    //how to call api
    response = yield call(loginUser, action?.data);
    //mock response

    if (response?.data?.statusCode === 200 && response?.data?.data) {
      if (response?.data?.data.user_data) {
        const data = {
          ...response?.data?.data.user_data,
          loginAs: true,
        };

      const responseGetUser: Response<UserData> = yield call(getUserInformation, 
          {id: response.data.data.user_data._id});

      if(responseGetUser?.data?.statusCode === 200 && responseGetUser?.data?.data) {
          const detailsUserInfo = {
              ...response.data.data.user_data,
              ...responseGetUser?.data?.data,
              loginAs: true,
          }
          yield put(userActions.onLoginResponse(detailsUserInfo));
      } else {
          yield put(userActions.onLoginResponse(data));
      }

        yield put(userActions.onLoginResponse(data));

      } else {
        yield put(snackBarAction.enableSnackBar());
      }

      yield put(loadingAction.disableLoading());
      yield call(navigationActions.navigateToMyProfile, undefined);

      // if (response?.data?.data.user_data?.full_name) {
      //   yield call(navigationActions.navigateToDiscover, undefined);
      // } else {
      //   yield call(navigationActions.navigateToMyProfile, undefined);
      // }
    } else {
      yield put(loadingAction.disableLoading());
      yield put(snackBarAction.enableSnackBar());
    }
  } catch (error: any) {
    console.log('error ' + JSON.stringify('Error ==> ' + JSON.stringify(error)));
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableLoading());
  }
}
