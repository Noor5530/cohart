import viewTutorialSaga from "store/sagas/viewTutorialSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as userActions from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import * as types from "store/actions/types";
import *  as updateUserView from 'services/updateUserView';

const dataPayload: any = {
    id: 1111111,
};
const payload = {
    type: types.VIEW_TUTORIAL_REQUEST,
    data: dataPayload,
};
test("updateUserView - should enable/disable  after   api success 200", async () => {
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

    const mockForupdateUserView = jest
        .spyOn(updateUserView, "updateUserView")
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga(fakeStore, viewTutorialSaga, payload).toPromise();

    expect(mockForupdateUserView).toBeCalled();

    expect(dispatched[0]).toEqual({ type: "VIEW_TUTORIAL_RESPONSE" });
    // expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForupdateUserView.mockClear();
});


test("viewTutorial - should  disable loading and  logout on unauthorized", async () => {

    const gen = cloneableGenerator(viewTutorialSaga)(payload);

    gen.next();

    let error = { response: { status: 401 } };

    expect(gen.throw(error).value).toEqual(
        put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
    );
});

