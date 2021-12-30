import { Posts, Response } from "models/types";
import { call, put, all } from "redux-saga/effects";
import { getAllPosts as fetchALLPost } from "services/getAllPosts";
import { getPostDetail } from "services/getPostDetail";
import * as appAction from "store/actions/appAction";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";

/* Redux saga class
 * logins the user into the app
 * requires full_name and password.
 * un - full_name
 * pwd - password
 */
// import { delay } from 'redux-saga';
// Our worker Saga that logins the user
export default function* getAllPost(action) {
  try {
    yield put(loadingAction.enableAppLoading());
    let response: Response<Posts[]>;

    // Handle post with deeplink
    if (action?.data?.postId) {
      yield put(appAction.getAllPostsResponse([]));
      const [postDeepLinkResponse, allPostResponse] = yield all([
        call(getPostDetail, {
          post_id: action.data.postId,
          user_id: action.data.user_id,
        }),
        call(fetchALLPost, {
          user_id: action.data.user_id,
          page: action.data.page,
        }),
      ]);

      let statusCode;
      if (
        allPostResponse.status === 200 &&
        postDeepLinkResponse.status === 200
      ) {
        statusCode = 200;
        response = {
          data: {
            statusCode,
            data: [
              postDeepLinkResponse.data.data,
              ...allPostResponse.data.data,
            ],
          },
        };
      } else {
        statusCode = allPostResponse.status;
        response = {
          data: {
            statusCode,
            data: [],
          },
        };
      }
      yield put(appAction.finishDeeplinkRequest());
    } else {
      //how to call api
      response = yield call(fetchALLPost, action.data);
    }

    if (response.data.statusCode === 200) {
      yield put(appAction.getAllPostsResponse(response.data.data));
    } else {
      yield put(snackBarAction.enableSnackBar());
    }
    yield put(loadingAction.disableAppLoading());
  } catch (error) {
    yield put(appAction.finishDeeplinkRequest());
    yield put(snackBarAction.enableSnackBar());
    yield put(loadingAction.disableAppLoading());
  } finally {
    yield put(appAction.finishDeeplinkRequest());
  }
}
