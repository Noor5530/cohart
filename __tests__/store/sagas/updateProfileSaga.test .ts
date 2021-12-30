import updateProfileSaga from "store/sagas/updateProfileSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";
import *  as updateBioProfile from 'services/updateBioProfile';
import { enableSnackBar } from "store/actions/snackBarAction";

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.UPDATE_PROFILE_DATA_REQUEST,
    data: dataPayload,
};
test("updateBioProfile - should enable/disable  after   api success 200", async () => {
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

    const mockForupdateBioProfile = jest
        .spyOn(updateBioProfile, "updateBioProfile")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateProfileSaga, payload).toPromise();

    expect(mockForupdateBioProfile).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForupdateBioProfile.mockClear();
});
test("updateBioProfile - should enable/disable  after   api success 201", async () => {
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

    const mockForupdateBioProfile = jest
        .spyOn(updateBioProfile, "updateBioProfile")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateProfileSaga, payload).toPromise();

    expect(mockForupdateBioProfile).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForupdateBioProfile.mockClear();
});
test("updateBioProfile - should enable/disable  after   api success 204", async () => {
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

    const mockForupdateBioProfile = jest
        .spyOn(updateBioProfile, "updateBioProfile")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, updateProfileSaga, payload).toPromise();

    expect(mockForupdateBioProfile).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForupdateBioProfile.mockClear();
});


test("updateBioProfile  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(updateProfileSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("updateBioProfile  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(updateProfileSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});