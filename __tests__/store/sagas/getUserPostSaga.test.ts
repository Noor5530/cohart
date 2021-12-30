import getUserPostSaga from "store/sagas/getUserPostSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getUserPost from 'services/getUserPost';
import * as  fetchUserWork from 'services/fetchUserWork';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_USER_POST_REQUEST,
    data: dataPayload,
};
test("getUserPost - should enable/disable  after   api success 200 with body", async () => {

    const dispatched: any[] = [];
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //first api called
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
    const mockForDeleteRequest = jest
        .spyOn(getUserPost, "getUserPost")
        .mockImplementation(() => Promise.resolve(mockResponse));



    //for userWork api response

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

    const mockForUserWork = jest
        .spyOn(fetchUserWork, "fetchUserWork")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, getUserPostSaga, payload).toPromise();
    expect(mockForDeleteRequest).toBeCalledTimes(1);

    expect(mockForUserWork).toBeCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForUserWork.mockClear();

});

test("getUserPost - should enable/disable  after   api success 400 without body", async () => {

    const dispatched: any[] = [];
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //first api called
    const mockUserPostResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: []
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };
    const mockForUserPost = jest
        .spyOn(getUserPost, "getUserPost")
        .mockImplementation(() => Promise.resolve(mockUserPostResponse));



    //for userWork api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: []
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForUserWork = jest
        .spyOn(fetchUserWork, "fetchUserWork")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, getUserPostSaga, payload).toPromise();
    expect(mockForUserPost).toBeCalled();

    expect(mockForUserWork).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForUserWork.mockClear();

});
test("getUserPost  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(getUserPostSaga)(payload);

    gen.next();
    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

