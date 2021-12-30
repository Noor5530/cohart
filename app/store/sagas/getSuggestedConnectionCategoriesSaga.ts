import { Posts, Response } from 'models/types';
import { call, put, select } from 'redux-saga/effects';
import { getSuggestedConnectionsCategories } from 'services/getSuggestedConnectionsCategories';
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
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
// Our worker Saga that logins the user
export default function* getSuggestedConnectionCategorySaga() {
  try {
    yield put(loadingAction.enableAppLoading());
    //how to call api
    const user: UserState = yield select((state: AppState) => state.user);

    const response: Response<Posts[]> = yield call(
      getSuggestedConnectionsCategories,
      {
        user_id: user._id,
      }
    );
    if (response.data.statusCode === 200) {
      yield put(loadingAction.disableAppLoading());
      if (Array.isArray(response.data.data.suggested_tags)) {
        yield put(
          appAction.getSuggestionConnectionCategoriesResponse(
            response.data.data.suggested_tags
          )
        );
      } else {
        yield put(appAction.getSuggestionConnectionCategoriesResponse([]));
      }
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableAppLoading());
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableAppLoading());
  }
}
