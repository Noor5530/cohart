import { call, put } from 'redux-saga/effects';
import { updateUserView } from 'services/updateUserView';
import * as userActions from 'store/actions/userActions';
import { ViewTutorialRequest } from '../../models/actions/user';
import { LogOutRequestEnum } from "models/actions/user";
export default function* uploadBackGroundImageSaga(
  action: ViewTutorialRequest
) {
  try {
    const apiResponse: {
      data: {
        statusCode: number;
        data: object;
      };
    } = yield call(updateUserView, action.data);
    if (apiResponse.data.statusCode === 200) {
      yield put(userActions.viewTutorialResponse());
    }
  } catch (error: any) {
    if (error?.response?.status == 401) {
      yield put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire));
    }
  }
}
