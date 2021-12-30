import getSuggestedConnectionSaga from "store/sagas/getSuggestedConnectionSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getSuggestedConnections from 'services/getSuggestedConnections';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_SUGGESTED_CONNECTIONS_REQUEST,
    data: dataPayload,
};
test("getSuggestedConnections - should enable/disable  after   api success 200 with body", async () => {
    const dispatched: any[] = [];


    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            body: { suggested_users: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetSuggestedConnection = jest
        .spyOn(getSuggestedConnections, "getSuggestedConnections")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionSaga, payload).toPromise();

    expect(mockForGetSuggestedConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetSuggestedConnection.mockClear();
});
test("getSuggestedConnections - should enable/disable  after   api success 200 without body", async () => {
    const dispatched: any[] = [];


    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            body: ''
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForDeleteRequest = jest
        .spyOn(getSuggestedConnections, "getSuggestedConnections")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});

test("getSuggestedConnections - should enable/disable  after   api error with status code", async () => {
    const dispatched: any[] = [];


    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
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
        .spyOn(getSuggestedConnections, "getSuggestedConnections")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});
test("getSuggestedConnections - should enable/disable  after   api error with status code is not available", async () => {
    const dispatched: any[] = [];


    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };
    const mockResponse: AxiosResponse = {
        data: {
            // statusCode: 400,
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForDeleteRequest = jest
        .spyOn(getSuggestedConnections, "getSuggestedConnections")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    // expect(dispatched[1]).toEqual(put(enableSnackBar()));
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});


test("getSuggestedConnections  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getSuggestedConnectionSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("getSuggestedConnections  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getSuggestedConnectionSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    gen.next();

    expect(gen.next().done).toBeTruthy();

});