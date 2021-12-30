import { call, put, select } from 'redux-saga/effects';
import { rejectPendingRequest } from 'services/rejectPendingRequest';
import * as appAction from 'store/actions/appAction';
import * as loadingAction from 'store/actions/loadingActions';
import * as navigationActions from 'store/actions/navigationActions';
import * as snackBarAction from 'store/actions/snackBarAction';

import AppState from '../../models/reducers';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

export default function* getPendingRequestSaga(action) {
  const pendingRequests: object = yield select(
    (state: AppState) => state.app.pendingRequest
  );

  try {
    yield put(loadingAction.enableLoading());
    //how to call api
    const response = yield call(rejectPendingRequest, action?.data);
    if (response.data.statusCode === 200) {
      const data = pendingRequests.filter(
        (item) => item._id !== action?.data.user_connection_id
      );
      yield put(appAction.getPendingRequestResponse(data));
    }
    yield put(loadingAction.disableLoading());

    yield call(navigationActions.navigateToCommunity, undefined);
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableLoading());
  }
}
