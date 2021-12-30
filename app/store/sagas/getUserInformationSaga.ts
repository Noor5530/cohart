
import { IGetUserInformationState, IResponse } from 'models/actions/user';
import { Response } from 'models/types';
import { call, put } from 'redux-saga/effects';
import { getUserInformation } from 'services/getUserInformation';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';


type UserProfileData = {
  statusCode: string | number;
  data: {
      data: IResponse;
  }
};
export default function* getUserInformationSaga(action: IGetUserInformationState) {
    try {
        yield put(loadingAction.enableLoading());

        const responseGetUser: Response<UserProfileData> = yield call(getUserInformation, 
            {id: action.data.user_id});

        if(responseGetUser?.data?.statusCode === 200 && responseGetUser?.data?.data) {
            const userDetails: IResponse = responseGetUser.data.data;
            yield put(userActions.onGetUserResponse(userDetails));
        } 
        yield put(loadingAction.disableLoading());
    } catch (ex) {
        yield put(loadingAction.disableLoading());
        yield put(snackBarAction.enableSnackBar());
    }
}
