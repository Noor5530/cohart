import updateUserInformationSaga from "store/sagas/updateUserInformationSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";
import *  as addUserInformation from 'services/addUserInformation';
import { enableSnackBar } from "store/actions/snackBarAction";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.UPDATE_USER_INFORMATION_REQUEST,
    data: dataPayload,
};
test("addUserInformation - should enable/disable  after   api success 200", async () => {
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

    const mockForaddUserInformation = jest
        .spyOn(addUserInformation, "addUserInformation")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateUserInformationSaga, payload).toPromise();

    expect(mockForaddUserInformation).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForaddUserInformation.mockClear();
});
test("addUserInformation - should enable/disable  after   api success 201", async () => {
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

    const mockForaddUserInformation = jest
        .spyOn(addUserInformation, "addUserInformation")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateUserInformationSaga, payload).toPromise();

    expect(mockForaddUserInformation).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForaddUserInformation.mockClear();
});
test("addUserInformation - should enable/disable  after   api success 204", async () => {
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

    const mockForaddUserInformation = jest
        .spyOn(addUserInformation, "addUserInformation")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateUserInformationSaga, payload).toPromise();

    expect(mockForaddUserInformation).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForaddUserInformation.mockClear();
});


test("addUserInformation  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(updateUserInformationSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("addUserInformation  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(updateUserInformationSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});