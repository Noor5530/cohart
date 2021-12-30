import { call, put } from 'redux-saga/effects';
import { addUserInformation } from 'services/addUserInformation';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';

import { UpdateUserInformationRequest } from '../../models/actions/user';
import { LogOutRequestEnum } from "models/actions/user";

export default function* editProfile(action: UpdateUserInformationRequest) {
  try {
    yield put(loadingAction.enableLoading());
    const apiResponse: {
      data: {
        statusCode: number;
        body: object;
      };
    } = yield call(addUserInformation, action.data);
    if (apiResponse.data.statusCode === 200) {
      yield put(userActions.updateUserInformationResponse(action.data));
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
