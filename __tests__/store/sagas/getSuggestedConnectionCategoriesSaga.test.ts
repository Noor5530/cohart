import getSuggestedConnectionCategoriesSaga from "store/sagas/getSuggestedConnectionCategoriesSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getSuggestedConnectionsCategories from 'services/getSuggestedConnectionsCategories';
import { enableSnackBar } from "store/actions/snackBarAction";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_SUGGESTION_CATEGORIES_REQUEST,
    data: dataPayload,
};
test("getSuggestedConnectionsCategories - should enable/disable  after   api success 200", async () => {
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
            data: { suggested_tags: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForGetSuggestedConnectionCategories = jest
        .spyOn(getSuggestedConnectionsCategories, "getSuggestedConnectionsCategories")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionCategoriesSaga, payload).toPromise();

    expect(mockForGetSuggestedConnectionCategories).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetSuggestedConnectionCategories.mockClear();
});
test("getSuggestedConnectionsCategories - should enable/disable  after   api success 200 without data", async () => {
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
            data: ''
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForDeleteRequest = jest
        .spyOn(getSuggestedConnectionsCategories, "getSuggestedConnectionsCategories")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionCategoriesSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});

test("getSuggestedConnectionsCategories - should enable/disable  after   api error with status code", async () => {
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
        .spyOn(getSuggestedConnectionsCategories, "getSuggestedConnectionsCategories")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionCategoriesSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});
test("getSuggestedConnectionsCategories - should enable/disable  after   api error with status code is not available", async () => {
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
        .spyOn(getSuggestedConnectionsCategories, "getSuggestedConnectionsCategories")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getSuggestedConnectionCategoriesSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();


    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    // expect(dispatched[1]).toEqual(put(enableSnackBar()));
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});


test("getSuggestedConnectionsCategories  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getSuggestedConnectionCategoriesSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("getSuggestedConnectionsCategories  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getSuggestedConnectionCategoriesSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});