import { REQUEST_OTP_FOR_LOGIN } from 'store/actions/types';
import { IRequestOtpPayload, IRequestOtpState } from 'models/actions/user';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils'
import * as loadingAction from 'store/actions/loadingActions';
import requestOtpSaga from 'store/sagas/requestOtpSaga';
import * as navigationActions from 'store/actions/navigationActions';
import * as otpService from 'services/otpCodeService';
import { AxiosResponse } from 'axios';
import { ISendOTPCodeByUserCode, sendOtpCodeByUserCode, ISendOTPCodeByPhoneNumber, sendOtpCodeByPhoneNumber } from 'services/otpCodeService';
import { runSaga } from 'redux-saga';
import * as snackBarAction from 'store/actions/snackBarAction';
import { RequestOTPType } from 'enums/request_otp_type';

/*
//    REQUEST OTP WITH USER CODE
*/

test('request otp with user code - should enable and disable loading after calling request OTP api success 200',
    async () => {

    const dispatched: any[] = [];

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 200
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const mockSendOtpCodeByUserCode = jest.spyOn(otpService, 'sendOtpCodeByUserCode')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, requestOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByUserCode).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByUserCode.mockClear();

})

test('request otp with user code -should enable and disable loading after calling request OTP api failure 400', async () => {
    const dispatched: any[] = [];

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 400
        },
        status: 400,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const mockSendOtpCodeByUserCode = jest.spyOn(otpService, 'sendOtpCodeByUserCode')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, requestOtpSaga, payload).toPromise();

    expect(mockSendOtpCodeByUserCode).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByUserCode.mockClear();

})

test('request otp with user code - should navigate to OTP verification screen with response 200', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 200
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByUserCode = {
        phone_number: '787092211',
        user_code: '12345',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByUserCode, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(call(navigationActions.navigateToOtpVerification, {
        data: {
            email: 'khang@cohart.co',
            country_code: "84",
            number: "",
            phone_number: "787092211",
        }
    }));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with user code - should navigate user to waiting list with response 400', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 400
        },
        status: 400,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByUserCode = {
        phone_number: '787092211',
        user_code: '12345',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByUserCode, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(call(navigationActions.navigateToSignUp));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with user code - should disable loading if request OTP got unknown error (500)', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 500
        },
        status: 500,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByUserCode = {
        phone_number: '787092211',
        user_code: '12345',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByUserCode, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with user code - should disable loading and show snack bar if got unexpected exception', async () => {

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.UserCode,
        phone_number: '787092211',
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByUserCode = {
        phone_number: '787092211',
        user_code: '12345',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByUserCode, requestOtpBody));

    expect(gen.throw({exception: 'unexpected exception'}).value).toEqual(put(snackBarAction.enableSnackBar()));

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();

})

/*
//    REQUEST OTP WITH PHONE NUMBER
*/
test('request otp with phone number - should enable and disable loading after calling request OTP api success 200',
    async () => {

    const dispatched: any[] = [];
    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 200
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const mockSendOtpCodeByPhoneNumber = jest.spyOn(otpService, 'sendOtpCodeByPhoneNumber')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, requestOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByPhoneNumber).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByPhoneNumber.mockClear();
})

test('request otp with phone number -should enable and disable loading after calling request OTP api failure 400', async () => {
    const dispatched: any[] = [];

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 400
        },
        status: 400,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const mockSendOtpCodeByPhoneNumber = jest.spyOn(otpService, 'sendOtpCodeByPhoneNumber')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, requestOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByPhoneNumber).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByPhoneNumber.mockClear();
})

test('request otp with phone number - should navigate to OTP verification screen with response 200', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 200
        },
        status: 200,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: otpService.ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(call(navigationActions.navigateToOtpVerification, {
        data: {
            email: 'khang@cohart.co',
            country_code: "84",
            number: "",
            phone_number: "787092211",
        }
    }));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with phone number - should navigate user to waiting list with response 400', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 400
        },
        status: 400,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211'
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(call(navigationActions.navigateToSignUp));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with phone number - should disable loading if request OTP got unknown error (500)', async () => {

    const mockResponse : AxiosResponse = {
        data: {
            data: {
                email: 'khang@cohart.co'
            },
            statusCode: 500
        },
        status: 500,
        statusText: '',
        headers: undefined,
        config: {}
    }

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211'
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request otp with phone number - should disable loading and show snack bar if got unexpected exception', async () => {

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(requestOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211'
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.throw({exception: 'unexpected exception'}).value).toEqual(put(snackBarAction.enableSnackBar()));

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();

})
