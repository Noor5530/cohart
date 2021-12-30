import loginAsRequestSaga from "store/sagas/loginAsRequestSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as loginAs from 'services/loginAs';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.LOGIN_AS_REQUEST,
    data: dataPayload,
};
test("loginAs - should enable/disable  after   api success 200 with login users", async () => {
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
            data: { user_data: { _id: 1111 } }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginAsRequest = jest
        .spyOn(loginAs, "loginAs")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, loginAsRequestSaga, payload).toPromise();

    expect(mockForLoginAsRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    // expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "LOGIN_RESPONSE", "response": {
           "_id": 1111,
           "loginAs": true,
        }});
    expect(dispatched[3]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginAsRequest.mockClear();
});

test("loginAs - should enable/disable  after   api success 200 and body without login user and data ", async () => {
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
            data: { user_data: null }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetYourConnection = jest
        .spyOn(loginAs, "loginAs")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, loginAsRequestSaga, payload).toPromise();

    expect(mockForGetYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForGetYourConnection.mockClear();
});

test("loginAs - should enable/disable  after   api success 200 and data with full name", async () => {
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
            data: { user_data: { full_name: 'waseem mansha' } }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetYourConnection = jest
        .spyOn(loginAs, "loginAs")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, loginAsRequestSaga, payload).toPromise();

    expect(mockForGetYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "LOGIN_RESPONSE", "response": {
        "full_name": "waseem mansha",
        "loginAs": true,
     }});
    expect(dispatched[3]).toEqual({ type: "DISABLE_LOADER" });

    mockForGetYourConnection.mockClear();
});
test("loginAs - should enable/disable  after   api success 204 error", async () => {
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
            statusCode: 204,
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetYourConnection = jest
        .spyOn(loginAs, "loginAs")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, loginAsRequestSaga, payload).toPromise();

    expect(mockForGetYourConnection).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForGetYourConnection.mockClear();
});

test("loginAs  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(loginAsRequestSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("loginAs  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(loginAsRequestSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    gen.next();

    expect(gen.next().done).toBeTruthy();

});

