import getAllPostSaga from "store/sagas/getAllPostSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as  getAllPosts from 'services/getAllPosts';
import { finishDeeplinkRequest } from "store/actions/appAction";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.GET_ALL_POST_REQUEST,
    data: dataPayload,
};
test("getAllPosts - should enable/disable  after   api success 200", async () => {
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

    const mockForGetAllPost = jest
        .spyOn(getAllPosts, "getAllPosts")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getAllPostSaga, payload).toPromise();

    expect(mockForGetAllPost).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForGetAllPost.mockClear();
});

test("getAllPosts - should enable/disable  after   api error", async () => {
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
        .spyOn(getAllPosts, "getAllPosts")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, getAllPostSaga, payload).toPromise();

    expect(mockForDeleteRequest).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_APP_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_App_LOADER" });

    mockForDeleteRequest.mockClear();
});

test("getAllPosts  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(getAllPostSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(finishDeeplinkRequest())
    );
    gen.next();
    gen.next();
    gen.next();
    expect(gen.next().done).toBeTruthy();

});