import loginSaga from "store/sagas/loginSaga";
import { AxiosResponse } from "axios";
import { runSaga } from "redux-saga";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { put } from "redux-saga/effects";
import * as types from "store/actions/types";
import * as loginUser from 'services/loginUser';
import * as createUserWithMail from 'services/createUserWithMail';
import { enableSnackBar } from "store/actions/snackBarAction";

// if with create code  then createUserWithMail
test("loginUser - should enable/disable  after   api success 200 with login users data", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
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

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

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

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(1);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 200 with login users data", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { user_data: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { user_data: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(2);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 200 with login users with posts", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { posts: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { posts: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(3);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 201 with login users with posts", async () => {
    const dispatched: any[] = [];
    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };

    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 201,
            data: { posts: [] }
        },
        status: 201,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 201,
            data: { posts: [] }
        },
        status: 201,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(4);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

test("loginUser - should enable/disable  after   api success 400 with login users with posts", async () => {
    const dispatched: any[] = [];
    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };

    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: { posts: [] }
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: { posts: [] }
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(5);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

test("loginUser - should enable/disable  after   api success 400 with login users with posts", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 204,
            data: { posts: [] }
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 204,
            data: { posts: [] }
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(6);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

// else with create code  then createUserWithMail

test("loginUser - should enable/disable  after   api success 200 with login users data", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: false,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
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

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

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

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(6);

    expect(mockForLoginUser).toBeCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 200 with login users data", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { user_data: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { user_data: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(7);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 200 with login users with posts", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { posts: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 200,
            data: { posts: [] }
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(8);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[2]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});
test("loginUser - should enable/disable  after   api success 201 with login users with posts", async () => {
    const dispatched: any[] = [];
    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };

    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 201,
            data: { posts: [] }
        },
        status: 201,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 201,
            data: { posts: [] }
        },
        status: 201,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(9);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

test("loginUser - should enable/disable  after   api success 400 with login users with posts", async () => {
    const dispatched: any[] = [];
    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };

    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: { posts: [] }
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 400,
            data: { posts: [] }
        },
        status: 400,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(10);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

test("loginUser - should enable/disable  after   api success 400 with login users with posts", async () => {
    const dispatched: any[] = [];

    let dataPayload: any = {
        id: 1111111,
        createWithCode: true,

    };
    const payload = {
        type: types.LOGIN_AS_REQUEST,
        data: dataPayload,
    };
    const fakeStore = {
        getState: () => ({
            user: { _id: 111111111111111 },
            app: { portfolio: [{ _id: 1111 }] },
        }),
        dispatch: (action: any) => dispatched.push(action),
    };

    //api call for login User WithMail
    const mockResponse: AxiosResponse = {
        data: {
            statusCode: 204,
            data: { posts: [] }
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForCreateUserWithMail = jest
        .spyOn(createUserWithMail, "createUserWithMail")
        .mockImplementation(() => Promise.resolve(mockResponse));

    //for loginUser api response

    const mockUserWorkResponse: AxiosResponse = {
        data: {
            statusCode: 204,
            data: { posts: [] }
        },
        status: 204,
        statusText: "",
        headers: undefined,
        config: {},
    };

    const mockForLoginUser = jest
        .spyOn(loginUser, "loginUser")
        .mockImplementation(() => Promise.resolve(mockUserWorkResponse));

    await runSaga(fakeStore, loginSaga, payload).toPromise();
    expect(mockForCreateUserWithMail).toBeCalledTimes(11);

    expect(mockForLoginUser).toBeCalledTimes(0);

    expect(dispatched[0]).toEqual({ type: "ENABLE_LOADER" });
    expect(dispatched[1]).toEqual({ type: "DISABLE_LOADER" });

    mockForLoginUser.mockClear();
});

//catch error

test("loginUser  - should  disable loading on error", async () => {

    const gen = cloneableGenerator(loginSaga)();

    gen.next();

    let error = { response: "" };

    expect(gen.throw(error).value).toEqual(
        put(enableSnackBar())
    );
    gen.next();
    gen.next();

    expect(gen.next().done).toBeTruthy();

});