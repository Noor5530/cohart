import addNewPostSaga from "store/sagas/addNewPostSaga";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import * as snackBarAction from "store/actions/snackBarAction";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";

test("AddGroupRequest - should enable and disable loading on Add post", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
  };
  const payload = {
    type: types.ADD_NEW_POST_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { userPost: [] },
    }),
    dispatch: (action) => dispatched.push(action),
  };

  await runSaga(fakeStore, addNewPostSaga, payload).toPromise();

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });
});

test("AddNewPost  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.ADD_NEW_POST_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(addNewPostSaga)(payload);

  gen.next();

  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});

test("AddNewPost  - should  enable snack bar on error ", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.ADD_NEW_POST_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(addNewPostSaga)(payload);

  gen.next();

  let error = { response: "" };
  expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
