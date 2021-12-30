import getMySavedWorkSaga from "store/sagas/getMySavedWorkSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getSavedWork from 'services/getSavedWork';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_MY_WORK_REQUEST,
    data: dataPayload,
};
test("getSavedWork - should enable/disable  after   api success 200", async () => {
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
            data: []
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetMySavedWork = jest
        .spyOn(getSavedWork, "getSavedWork")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getMySavedWorkSaga, payload).toPromise();

    expect(mockForGetMySavedWork).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetMySavedWork.mockClear();
});


test("getSavedWork - should enable/disable  after   api error", async () => {
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
        .spyOn(getSavedWork, "getSavedWork")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getMySavedWorkSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});

test("getSavedWork  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getMySavedWorkSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("getSavedWork  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getMySavedWorkSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});