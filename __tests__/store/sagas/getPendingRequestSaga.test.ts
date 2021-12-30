import getPendingRequestSaga from "store/sagas/getPendingRequestSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getPendingRequest from 'services/getPendingRequest';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_PENDING_REQUEST_REQUEST,
    data: dataPayload,
};
test("getPendingRequest - should enable/disable  after   api success 200", async () => {
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
            body: []
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForDeleteRequest = jest
        .spyOn(getPendingRequest, "getPendingRequest")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getPendingRequestSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});


test("getPendingRequest - should enable/disable  after   api success 200 without body", async () => {
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
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetPendingRequest = jest
        .spyOn(getPendingRequest, "getPendingRequest")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getPendingRequestSaga, payload).toPromise();

    expect(mockForGetPendingRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetPendingRequest.mockClear();
});

test("getPendingRequest - should enable/disable  after   api error with status code", async () => {
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
        .spyOn(getPendingRequest, "getPendingRequest")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getPendingRequestSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    // expect(dispatched[1]).toEqual(put(enableSnackBar()));
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});
test("getPendingRequest - should enable/disable  after   api error with status code is not available", async () => {
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
        .spyOn(getPendingRequest, "getPendingRequest")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getPendingRequestSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    // expect(dispatched[1]).toEqual(put(enableSnackBar()));
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});


test("getPendingRequest  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getPendingRequestSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("getPendingRequest  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getPendingRequestSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});