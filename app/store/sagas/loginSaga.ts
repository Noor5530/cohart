// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@segment/analytics-react-native';
import { ILoginRequestState, IResponse } from 'models/actions/user';
import { Posts, Response } from 'models/types';
import { call, put, select } from 'redux-saga/effects';
import { createUserWithMail } from 'services/createUserWithMail';
import { getUserInformation } from 'services/getUserInformation';
import { loginUser } from 'services/loginUser';
import * as appAction from 'store/actions/appAction';
import * as loadingAction from 'store/actions/loadingActions';
import * as navigationActions from 'store/actions/navigationActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';

import AppState from '../../models/reducers';

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
// Our worker Saga that logins the user
// const getFmcToken = async () => {
//     let token = await AsyncStorage.getItem('@fcm_token');
//     return token;
// };
type UserData = {
  statusCode: string | number;
  user_data: IResponse;
  posts: Posts[];
  token: string;
};
export default function* loginAsync(action: ILoginRequestState) {
    try {
        yield put(loadingAction.enableLoading());
        const token: string = yield select(
            (state: AppState) => state.user.token,
        );
        console.log('token', token);
        let response: Response<UserData>;
        //how to call api
        if (action?.data?.createWithCode) {
            response = yield call(createUserWithMail, {
                sms_code: action?.data?.code?.toString().replace(/,/g, ''),
                phone_number: action?.data?.phone_number,
                country_code: action?.data?.country_code,
                number: action?.data?.number,
                registration_id: token ? token : '',
            });
        } else {
            response = yield call(loginUser, {
                sms_code: action?.data?.code?.toString().replace(/,/g, ''),
                phone_number: action?.data?.phone_number,
                country_code: action?.data?.country_code,
                number: action?.data?.number,
                registration_id: token,
            });
        }
        //mock response
        const data: IResponse = {
            id: 1,
            phone_number: action?.data?.phone_number,
        };
        if (response?.data?.statusCode === 200 && response?.data?.data) {
            AsyncStorage.setItem("token", response?.data?.data?.token);
            const responseGetUser: Response<UserData> = yield call(getUserInformation, 
                {id: response.data.data.user_data._id});
            if (response?.data?.data.user_data) {
                analytics.identify(response.data.data.user_data._id, {
                  data: response.data.data.user_data,
                  phone_number: response.data.data.user_data?.phone_number
                    ? response.data.data.user_data?.phone_number
                    : "",
                  internal_user: response.data.data.user_data?.internal_user
                    ? response.data.data.user_data?.internal_user
                    : false,
                });
            }

            if(responseGetUser?.data?.statusCode === 200 && responseGetUser?.data?.data) {
                const detailsUserInfo = {
                    ...response.data.data.user_data,
                    ...responseGetUser?.data?.data
                }
                yield put(userActions.onLoginResponse(detailsUserInfo));
            } else {
                yield put(userActions.onLoginResponse(data));
            }

            if (response?.data?.data?.posts) {
                appAction.getAllPostsResponse(response.data.data.posts);
            }
            yield put(loadingAction.disableLoading());

    } else if (response?.data?.statusCode == 201) {
      yield put(loadingAction.disableLoading());
      yield call(navigationActions.navigateToForgotSignUp, undefined);
    } else if (response?.data?.statusCode == 400) {
      yield put(loadingAction.disableLoading());
      yield put(snackBarAction.enableSnackBar("Invalid sms code"));
    } else {
      yield put(loadingAction.disableLoading());
      yield put(snackBarAction.enableSnackBar());
    }
  } catch (error) {
    yield put(snackBarAction.enableSnackBar());
    yield put(loadingAction.disableLoading());
  }
}
