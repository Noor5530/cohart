import { ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST } from "store/actions/types";
import acceptCommunityGuideLinesSaga from "store/sagas/acceptCommunityGuideLinesSaga";
import * as acceptCommunityGuideLines from "services/acceptCommunityGuideLines";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import * as snackBarAction from "store/actions/snackBarAction";
import { put } from "redux-saga/effects";
import * as loadingAction from "store/actions/loadingActions";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

/*
//    ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST
*/

test("acceptCommunityGuideLinesData - should enable and disable loading after acceptCommunityGuideLinesData  api success 200", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };
  const payload = {
    type: ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
    data: dataPayload,
  };
  const fakeStore = {
    getState: () => ({ user: { _id: 111111111111111 } }),
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

  const mockSendForAcceptGuideLines = jest
    .spyOn(acceptCommunityGuideLines, "acceptCommunityGuideLines")
    .mockImplementation(() => Promise.resolve(mockResponse));

  await runSaga(fakeStore, acceptCommunityGuideLinesSaga, payload).toPromise();

  expect(mockSendForAcceptGuideLines).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

  mockSendForAcceptGuideLines.mockClear();
});

test("acceptCommunityGuideLinesData - should enable and disable loading after acceptCommunityGuideLinesData  api success 400", async () => {
  const dispatched: any[] = [];

  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
    data: dataPayload,
  };

  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 100,
    },
    status: 200,
    statusText: "",
    headers: undefined,
    config: {},
  };

  const mockSendForAcceptGuideLines = jest
    .spyOn(acceptCommunityGuideLines, "acceptCommunityGuideLines")
    .mockImplementation(() => Promise.resolve(mockResponse));

  const fakeStore = {
    getState: () => ({ user: { _id: 111111111111111 } }),
    dispatch: (action) => dispatched.push(action),
  };

  await runSaga(fakeStore, acceptCommunityGuideLinesSaga, payload).toPromise();

  expect(mockSendForAcceptGuideLines).toHaveBeenCalledTimes(1);

  expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

  mockSendForAcceptGuideLines.mockClear();
});

test("acceptCommunityGuideLinesData - should enable and disable loading on exception   ", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(acceptCommunityGuideLinesSaga)(payload);
  gen.next();

  let error = { response: { status: 401 } };
  expect(gen.throw(error).value).toEqual(
    put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
  );
  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
test("acceptCommunityGuideLinesData - should  logout on unauthorized", async () => {
  const dataPayload: any = {
    id: "1111111111",
    accepted_guideline: true,
  };

  const payload = {
    type: ACCEPT_COMMUNITY_GUIDE_LINES_REQUEST,
    data: dataPayload,
  };

  const gen = cloneableGenerator(acceptCommunityGuideLinesSaga)(payload);
  gen.next();

  expect(gen.next().value).toEqual(put(loadingAction.enableLoading()));

  let error = { exception: "message" };
  expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

  expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

  expect(gen.next().done).toBeTruthy();
});
