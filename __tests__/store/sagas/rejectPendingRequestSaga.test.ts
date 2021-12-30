import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as rejectPendingRequest from 'services/rejectPendingRequest';
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import rejectPendingRequestSaga from "store/sagas/rejectPendingRequestSaga";
import * as loadingAction from "store/actions/loadingActions";
import * as snackBarAction from "store/actions/snackBarAction";


test("rejectPendingRequest - should enable and disable loading after   api success 200", async () => {
    const dispatched: any[] = [];

    const dataPayload: any = {
        user_connection_id: 1111111,
    };
    const payload = {
        type: types.REJECT_PENDING_REQUEST_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { pendingRequest: [{ _id: 1111 }] },
        }),
        dispatch: (action) => dispatched.push(action),
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

    const mockForrejectPendingRequest = jest
        .spyOn(rejectPendingRequest, "rejectPendingRequest")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, rejectPendingRequestSaga, payload).toPromise();

    expect(mockForrejectPendingRequest).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });

    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForrejectPendingRequest.mockClear();
});

test("rejectPendingRequest - should enable and disable loading and  enable snack bar in any exception  ", async () => {
    const dataPayload: any = {
        id: "1111111111",
        accepted_guideline: true,
    };

    const payload = {
        type: types.REJECT_PENDING_REQUEST_REQUEST,
        data: dataPayload,
    };

    const gen = cloneableGenerator(rejectPendingRequestSaga)(payload);
    gen.next();
    expect(gen.next().value).toEqual(put(loadingAction.enableLoading()));
    let error = { exception: "message" };
    expect(gen.throw(error).value).toEqual(put(snackBarAction.enableSnackBar()));

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
});

test("rejectPendingRequest  - should  logout on unauthorized", async () => {
    const dataPayload: any = {
        id: "1111111111",
        accepted_guideline: true,
    };

    const payload = {
        type: types.REJECT_PENDING_REQUEST_REQUEST,
        data: dataPayload,
    };

    const gen = cloneableGenerator(rejectPendingRequestSaga)(payload);
    gen.next();
    expect(gen.next().value).toEqual(put(loadingAction.enableLoading()));
    let error = { response: { status: 401 } };
    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
});
