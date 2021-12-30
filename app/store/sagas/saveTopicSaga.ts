import { call, put, select } from 'redux-saga/effects';
import { saveUserInterest } from 'services/saveUserInterest';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';

import { SaveUserTopicRequest } from '../../models/actions/user';
import AppState from '../../models/reducers';
import { UserState } from '../../models/reducers/user';

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* saveTopicSaga(action: SaveUserTopicRequest) {

  console.log('Save topic saga ....');
  try {
    yield put(loadingAction.enableLoading());
    const user: UserState = yield select((state: AppState) => state.user);

    const data = {
      id: user._id,
      phone_number: user.phone_number,
      interests: action.data.toString(),
    };

    //how to call api
    const apiResponse: {
      data: {
        statusCode: number;
        body: object;
      };
    } = yield call(saveUserInterest, data);
    yield put(loadingAction.disableLoading());

    //mock response
    if (apiResponse.data.statusCode === 200) {
      yield put(userActions.saveTopicResponse(action.data));
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
