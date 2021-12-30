import logoutSaga from "store/sagas/logoutSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as logout from 'services/logout';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as appAction from "store/actions/appAction";
import * as loadingAction from "store/actions/loadingActions";

const dataPayload: any = {
  id: 1111111,

};
const payload = {
  type: types.LOG_OUT_REQUEST,
  data: dataPayload,
};
test("logoutSaga - should enable/disable  after   api suces with status code 200 and loginas true", async () => {
  const dispatched: any[] = [];


  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111, loginAs: true },
      app: {
        portfolio: [{ _id: 1111, loginAs: true },
        ]
      },
      loading: {
        logOutAPiCalling: false
      }

    }),
    dispatch: (action: any) => dispatched.push(action),
  };


  //for logoutSaga api response

  const mockUserWorkResponse: AxiosResponse = {
    data: {
      statusCode: 200,
      data: []
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForlogout = jest
    .spyOn(logout, "logout")
    .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

  await runSaga(fakeStore, logoutSaga, payload).toPromise();
  expect(mockForlogout).toBeCalledTimes(0);


  expect(dispatched[0]).toEqual({ type: "LOG_OUT" });
  // expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

  mockForlogout.mockClear();
});
test("logoutSaga - should enable/disable  after   api suces with status code 200 and loginas false", async () => {
  const dispatched: any[] = [];

  const fakeStore = {
    getState: () => ({
      user: { _id: 111111111111111, loginAs: false },
      app: {
        portfolio: [{ _id: 1111, loginAs: false }],
      },
      loading: {
        logOutAPiCalling: false,
      },
    }),
    dispatch: (action: any) => dispatched.push(action),
  };

  //for logoutSaga api response

  const mockUserWorkResponse: AxiosResponse = {
    data: {
      statusCode: 200,
      data: [],
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockForlogout = jest
    .spyOn(logout, "logout")
    .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

  await runSaga(fakeStore, logoutSaga, payload).toPromise();
  expect(mockForlogout).toBeCalled();

  expect(dispatched[1]).toEqual({ type: "ENABLE_LOADER" });
  expect(dispatched[3]).toEqual({ type: "LOG_OUT" });

  mockForlogout.mockClear();
});

test("logoutSaga  - should  disable loading on error", async () => {
  const gen = cloneableGenerator(logoutSaga)(payload);
  gen.next();

  expect(gen.throw("").value).toEqual(put(appAction.logOut()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));
  expect(gen.next().value).toEqual(put(enableSnackBar()));
  expect(gen.next().done).toBeTruthy();
});
