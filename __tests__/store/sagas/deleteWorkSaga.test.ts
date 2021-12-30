import deleteWorkSaga from "store/sagas/deleteWorkSaga";
import * as deleteWorks from "services/deleteWork";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";

test("deleteWorkRequest - should enable/disable  after   api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: 1111111,
  };
  const payload = {
    type: types.DELETE_USER_WORK_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { portfolio: [{ _id: 1111 }] },
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
    .spyOn(deleteWorks, "deleteWork")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, deleteWorkSaga, payload).toPromise();

  expect(mockForDeleteRequest).toBeCalled();

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  mockForDeleteRequest.mockClear();
});

test("deleteWorkRequest - should enable  after   api success 400", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: 1111111,
  };
  const payload = {
    type: types.DELETE_USER_WORK_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111 },
      app: { portfolio: [{ _id: 1111 }] },
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

  const mockForDeleteRequest = jest
    .spyOn(deleteWorks, "deleteWork")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, deleteWorkSaga, payload).toPromise();

  expect(mockForDeleteRequest).toBeCalled();

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
  expect(dispatched[3]).toEqual({ type: "DISABLE_LOADER" });

  mockForDeleteRequest.mockClear();
});

test("deleteUserWork  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.PROFILE_DATA_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(deleteWorkSaga)(payload);

  gen.next();

  let error = { response: { status: 401 } };

  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );
});
