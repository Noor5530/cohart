import addProfileSaga from "store/sagas/addProfileSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import * as snackBarAction from "store/actions/snackBarAction";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";
import * as addUserProfile from "services/addUserProfile";

test(" - should enable and disable loading after   api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
  };
  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { friendsGroup: [] },
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

  const mockForAddGroupRequest = jest
    .spyOn(addUserProfile, "addUserProfile")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, addProfileSaga, payload).toPromise();

  expect(mockForAddGroupRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockForAddGroupRequest.mockClear();
});
test(" - should enable and disable loading after   api without success", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
  };
  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { friendsGroup: [] },
    }),
    dispatch: (action) => dispatched.push(action),
  };
  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 400,
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForAddGroupRequest = jest
    .spyOn(addUserProfile, "addUserProfile")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, addProfileSaga, payload).toPromise();

  expect(mockForAddGroupRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({
    type: types.ENABLE_SNACK_BAR,
    data: {
      message: "Something went wrong",
    },
  });
  mockForAddGroupRequest.mockClear();
});

test("AddProfileSaga  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(addProfileSaga)(payload);

  gen.next();

  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});

test("AddProfileSaga  - should  disable loading and  logout on error", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(addProfileSaga)(payload);

  gen.next();

  let error = { response: "" };
  expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
