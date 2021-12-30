import { UserState } from 'models/reducers/user';
import { call, put, select } from 'redux-saga/effects';
import { updateBioProfile } from 'services/updateBioProfile';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';

import { UpdateProfileDataRequest } from '../../models/actions/user';
import AppState from '../../models/reducers';

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
import { LogOutRequestEnum } from "models/actions/user";

// Our worker Saga that logins the user
export default function* editProfile(action: UpdateProfileDataRequest) {
  try {
    yield put(loadingAction.enableLoading());
    const user: UserState = yield select((state: AppState) => state.user);
    const data = {
      id: user._id,
      phone_number: user.phone_number,
      bio: action.data.bio,
      meet_me_at: action.data.meet_me_at?.toString(),
      last_spotted: action.data.last_spotted?.toString(),
      currently: action.data.currently?.toString(),
      affiliations: action.data.affiliations?.toString(),
      twitter: action.data.twitter,
      website: action.data.website,
      instagram: action.data.instagram,
      post_view: action.data.post_view,
      bio_view: action.data.bio_view,
      affliation_view: action.data.affliation_view,
      portfolio_view: action.data.portfolio_view,
      last_spotted_view: action.data.last_spotted_view,
      meet_me_at_view: action.data.meet_me_at_view,
      currently_view: action.data.currently_view,
    };
    const apiResponse: {
      data: {
        statusCode: number;
        body: object;
      };
    } = yield call(updateBioProfile, data);

    //how to call api
    //const response = yield call(loginUser, action.full_name, action.password);
    //mock response
    if (apiResponse.data.statusCode === 200) {
      yield put(userActions.updateProfileDataResponse(action.data));
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
