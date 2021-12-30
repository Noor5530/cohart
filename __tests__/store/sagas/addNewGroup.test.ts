import addNewGroupSaga from "store/sagas/addNewGroup";
import * as addNewGroupRequest from "services/addNewGroup";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";

test("AddGroupRequest - should enable and disable loading after   api success 200", async () => {
  const dispatched: any[] = [];

  const payload = {
    type: types.ADD_GROUP_REQUEST,
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
    .spyOn(addNewGroupRequest, "addNewGroup")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, addNewGroupSaga, payload).toPromise();

  expect(mockForAddGroupRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockForAddGroupRequest.mockClear();
});

test("AddGroupRequest - should enable and disable loading after   api status code 400", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };
  const payload = {
    type: types.ADD_GROUP_REQUEST,
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
    status: 400,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForAddGroupRequest = jest
    .spyOn(addNewGroupRequest, "addNewGroup")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, addNewGroupSaga, payload).toPromise();

  expect(mockForAddGroupRequest).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockForAddGroupRequest.mockClear();
});

test("acceptPendingRequest  - should  disable loading and  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: types.ADD_GROUP_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(addNewGroupSaga)(payload);


  gen.next();

  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
