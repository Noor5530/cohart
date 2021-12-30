import acceptPendingRequestSaga from "store/sagas/acceptPendingRequestSaga";
import * as acceptPendingRequest from "services/acceptPendingRequest";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import * as snackBarAction from "store/actions/snackBarAction";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";

test("acceptPendingRequest - should enable and disable loading after   api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    user_connection_id: 1111111,
  };
  const payload = {
    type: types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { pendingRequest: [{ _id: 1111 }] },
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

  const mockForAcceptPendingRequest = jest
    .spyOn(acceptPendingRequest, "acceptPendingRequest")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, acceptPendingRequestSaga, payload).toPromise();

  expect(mockForAcceptPendingRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockForAcceptPendingRequest.mockClear();
});
test("acceptPendingRequest - should enable and disable loading and  enable snack bar after acceptCommunityGuideLinesData  api success without 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };
  const payload = {
    type: types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { pendingRequest: [{ _id: 1111 }] },
    }),
    dispatch: (action) => dispatched.push(action),
  };
  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 300,
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForAcceptPendingRequest = jest
    .spyOn(acceptPendingRequest, "acceptPendingRequest")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, acceptPendingRequestSaga, payload).toPromise();

  expect(mockForAcceptPendingRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
  expect(dispatched[1]).toEqual({
    type: types.ENABLE_SNACK_BAR,
    data: {
      message: "Something went wrong",
    },
  });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockForAcceptPendingRequest.mockClear();
});

test("acceptPendingRequest - should enable and disable loading and  enable snack bar in any exception  ", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(acceptPendingRequestSaga)(payload);
  gen.next();
  expect(gen.next().value).toEqual(put(loadingAction.enableLoading()));
  let error = { exception: "message" };
  expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});

test("acceptPendingRequest  - should  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.GET_ACCEPT_PENDING_REQUEST_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(acceptPendingRequestSaga)(payload);
  gen.next();
  expect(gen.next().value).toEqual(put(loadingAction.enableLoading()));
  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
