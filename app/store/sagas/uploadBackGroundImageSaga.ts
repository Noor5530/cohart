import { call, put } from 'redux-saga/effects';
import { getSignUrl } from 'services/getSingUrl';
import { uploadBackGroundImage } from 'services/uploadBackGroundImage';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as userActions from 'store/actions/userActions';
import { uploadImage } from 'services/uploadImage';
import { UpdateUserInformationRequest } from '../../models/actions/user';
import { LogOutRequestEnum } from "models/actions/user";


export default function* uploadBackGroundImageSaga(
  action: UpdateUserInformationRequest
) {
  try {
    yield put(loadingAction.enableLoading());
    const s3Url: {
      data: {
        statusCode: number;
        data: object;
      };
    } = yield call(getSignUrl, {
      file_name: action.data.image_name,
      content_type: action.data.image_type,
    });
    const data = {
      url: s3Url.data.data,
      ...action.data,
    };
    yield call(uploadImage, data);
    const apiResponse: {
      data: {
        statusCode: number;
        data: object;
      };
    } = yield call(uploadBackGroundImage, {
      ...action.data,
      background_image: s3Url.data.data.split("?")[0],
    });

    if (apiResponse.data.statusCode === 200) {
      yield put(
        userActions.uploadBackGroundImageResponse(apiResponse.data.data)
      );
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
