import deletePostSaga from "store/sagas/deletePostSaga";
import * as deletePost from "services/deletePost";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import * as snackBarAction from "store/actions/snackBarAction";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";

test("deletePendingRequest - should enable and disable loading after   api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: 1111111,
  };
  const payload = {
    type: types.DELETE_POST_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      // user: { _id: 111111111111111 },
      app: { userPost: [{ _id: 1111 }] },
    }),
    dispatch: (action) => dispatched.push(action),
  };
  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 200,
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForDeleteRequest = jest
    .spyOn(deletePost, "deletePost")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, deletePostSaga, payload).toPromise();

  expect(mockForDeleteRequest).toBeCalled();

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  mockForDeleteRequest.mockClear();
});

test("deletePendingRequest - should enable and disable loading after   api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: 1111111,
  };
  const payload = {
    type: types.DELETE_POST_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { userPost: [{ _id: 1111 }] },
    }),
    dispatch: (action) => dispatched.push(action),
  };
  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 400,
    },
    status: 400,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForDeleteRequest = jest
    .spyOn(deletePost, "deletePost")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, deletePostSaga, payload).toPromise();

  expect(mockForDeleteRequest).toBeCalled();

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[3]).toEqual({ type: "DISABLE_LOADER" });

  mockForDeleteRequest.mockClear();
});
test("deletePendingRequest  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(deletePostSaga)(payload);

  gen.next();

  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});

test("deletePendingRequest  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(deletePostSaga)(payload);

  gen.next();

  let error = { response: "" };
  expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
