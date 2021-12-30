import AppState from "models/reducers";
import { call, put, select } from "redux-saga/effects";
import { logout } from "services/logout";
import * as appAction from "store/actions/appAction";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";
import { LogoutRequest } from "models/actions/user";
import * as userActions from "store/actions/userActions";
import AsyncStorage from "@react-native-community/async-storage";
export default function* logOut(data: LogoutRequest) {
  console.log("data", data);

  try {
    AsyncStorage.removeItem("token");

    const userId: object = yield select((state: AppState) => state.user._id);
    const loginAs: object = yield select(
      (state: AppState) => state.user.loginAs
    );
    const isLoggedIn: object = yield select(
      (state: AppState) => state.user.isLoggedIn
    );
    const logOutAlreadyCall: boolean = yield select(
      (state: AppState) => state.loading.logOutAPiCalling
    );
    console.log("logOutAlreadyCall", logOutAlreadyCall);

    if (loginAs) {
      yield put(appAction.logOut());
    } else if (!logOutAlreadyCall) {
      yield put(userActions.logOutApiLoading(true));
      if (data.from != "tokenExpire") {
        yield put(loadingAction.enableLoading());
      } //how to call api
      const response: {
        data: {
          statusCode: number;
        };
      } = yield call(logout, {
        user_id: userId,
      });
      yield put(userActions.logOutApiLoading(false));
      if (response.data.statusCode === 200) {
        yield put(appAction.logOut());
      }
      yield put(loadingAction.disableLoading());
    } else if (isLoggedIn) {
      yield put(appAction.logOut());
    }
  } catch (error) {
    yield put(appAction.logOut());
    yield put(loadingAction.disableLoading());
    yield put(snackBarAction.enableSnackBar());
  }
}
