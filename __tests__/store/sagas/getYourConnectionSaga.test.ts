import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as getConnectUser from 'services/getConnectUser';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import getYourConnectionSaga from "store/sagas/getYourConnectionSaga";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_YOUR_CONNECTIONS_REQUEST,
    data: dataPayload,
};
test("getPendingRequest - should enable/disable  after   api success 200 with connected users", async () => {
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
            body: { my_connected_users: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForYourConnection = jest
        .spyOn(getConnectUser, "getConnectUser")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getYourConnectionSaga, payload).toPromise();

    expect(mockForYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForYourConnection.mockClear();
});
test("getPendingRequest - should enable/disable  after   api success 200 and body without connected users", async () => {
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

    const mockForGetYourConnection = jest
        .spyOn(getConnectUser, "getConnectUser")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getYourConnectionSaga, payload).toPromise();

    expect(mockForGetYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetYourConnection.mockClear();
});
test("getPendingRequest - should enable/disable  after   api success 200 and body without connected users", async () => {
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
            statusCode: 201,
        },
        status: 201,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForYourConnection = jest
        .spyOn(getConnectUser, "getConnectUser")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getYourConnectionSaga, payload).toPromise();

    expect(mockForYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForYourConnection.mockClear();
});
test("getConnectUser  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getYourConnectionSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("getConnectUser  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getYourConnectionSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    gen.next();

    expect(gen.next().done).toBeTruthy();

});

