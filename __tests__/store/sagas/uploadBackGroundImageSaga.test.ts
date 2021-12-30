import uploadBackGroundImageSaga from "store/sagas/uploadBackGroundImageSaga";
import * as uploadImage from "services/uploadImage";
import * as getSignUrl from 'services/getSingUrl';
import fetchblob from 'rn-fetch-blob'
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";
import *  as uploadBackGroundImage from 'services/uploadBackGroundImage';
import { enableSnackBar } from "store/actions/snackBarAction";
import { FetchBlobResponse } from 'rn-fetch-blob';
const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.UPLOAD_BACKGROUND_IMAGE_REQUEST,
    data: dataPayload,
};
test("uploadBackGroundImage - should enable/disable  after   api success 200", async () => {
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

    const mockResponseSingUrl: AxiosResponse = {
        data: {
            data: "sss?sss"
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockFetchBlocb: FetchBlobResponse = {
        data: {
            url: "",
        }
    };
    const mockSingUrl = jest
        .spyOn(getSignUrl, "getSignUrl")
        .mockImplementation(() => Promise.resolve(mockResponseSingUrl));

    const mockrRNFetchBlob = jest
        .spyOn(fetchblob, "fetch")
        .mockImplementation(jest.fn());


    const mockForRNFetchBlob = jest
        .spyOn(uploadImage, "uploadImage")
        .mockImplementation(async () => Promise.resolve(mockFetchBlocb));


    const mockForUploadBackGroundImage = jest
        .spyOn(uploadBackGroundImage, "uploadBackGroundImage")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, uploadBackGroundImageSaga, payload).toPromise();


    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForUploadBackGroundImage.mockClear();
    mockForRNFetchBlob.mockClear();
    mockrRNFetchBlob.mockClear();
    mockSingUrl.mockClear();
});
test("uploadBackGroundImage - should enable/disable  after   api success 204", async () => {
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

    const mockResponseSingUrl: AxiosResponse = {
        data: {
            data: "sss?sss"
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockFetchBlocb: FetchBlobResponse = {
        data: {
            url: "",
        }
    };
    const mockSingUrl = jest
        .spyOn(getSignUrl, "getSignUrl")
        .mockImplementation(() => Promise.resolve(mockResponseSingUrl));

    const mockrRNFetchBlob = jest
        .spyOn(fetchblob, "fetch")
        .mockImplementation(jest.fn());


    const mockForRNFetchBlob = jest
        .spyOn(uploadImage, "uploadImage")
        .mockImplementation(async () => Promise.resolve(mockFetchBlocb));


    const mockForUploadBackGroundImage = jest
        .spyOn(uploadBackGroundImage, "uploadBackGroundImage")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, uploadBackGroundImageSaga, payload).toPromise();


    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForUploadBackGroundImage.mockClear();
    mockForRNFetchBlob.mockClear();
    mockrRNFetchBlob.mockClear();
    mockSingUrl.mockClear();
});

test("uploadBackGroundImage  - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(uploadBackGroundImageSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

test("uploadBackGroundImage  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(uploadBackGroundImageSaga)(payload);

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    expect(gen.next().done).toBeTruthy();

});