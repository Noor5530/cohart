import { REQUEST_OTP_FOR_LOGIN, REQUEST_RESEND_OTP } from 'store/actions/types';
import { IRequestOtpPayload, IRequestOtpState } from 'models/actions/user';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils'
import * as loadingAction from 'store/actions/loadingActions';
import * as otpService from 'services/otpCodeService';
import { AxiosResponse } from 'axios';
import { ISendOTPCodeByPhoneNumber, sendOtpCodeByPhoneNumber } from 'services/otpCodeService';
import { runSaga } from 'redux-saga';
import * as snackBarAction from 'store/actions/snackBarAction';
import { RequestOTPType } from 'enums/request_otp_type';
import resendOtpSaga from 'store/sagas/resendOtpSaga';

/*
//    REQUEST OTP WITH USER CODE
*/

test('request resend otp with phone number - should enable and disable loading after calling request OTP api success 200',
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
        type: REQUEST_RESEND_OTP,
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
      }, resendOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByPhoneNumber).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByPhoneNumber.mockClear();

})

test('request resend otp with phone number - should enable and disable loading after calling request OTP api failure 400', async () => {
    const dispatched: any[] = [];

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
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
      }, resendOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByPhoneNumber).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByPhoneNumber.mockClear();

})

test('request resend otp with phone number - should show and hide loading with response 200', async () => {

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

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211'
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(put(snackBarAction.enableSnackBar('Code has been sent')));

    expect(gen.next().done).toBeTruthy();
})

test('request resend otp with phone number - with response 400', async () => {

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
        type: REQUEST_RESEND_OTP,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request resend otp with phone number  - should disable loading if request OTP got unknown error (500)', async () => {

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
        user_code: '12345',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request resend otp with phone number - should disable loading and show snack bar if got unexpected exception', async () => {

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.PhoneNumber,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: ISendOTPCodeByPhoneNumber = {
        phone_number: '787092211',
    }
    expect(gen.next().value).toEqual(call(sendOtpCodeByPhoneNumber, requestOtpBody));

    expect(gen.throw({exception: 'unexpected exception'}).value).toEqual(put(snackBarAction.enableSnackBar()));

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();

})

/*
//    REQUEST OTP WITH PHONE NUMBER
*/
test('request resend otp with email - should enable and disable loading after calling request OTP api success 200',
    async () => {

    const dispatched: any[] = [];
    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.Email,
        user_id: 'user_id_test',
        non_formatted_phone_number: '',
        country_code: '84',

    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
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

    const mockSendOtpCodeByEmail = jest.spyOn(otpService, 'sendOtpCodeByEmail')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, resendOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByEmail).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByEmail.mockClear();
})

test('request resend otp with email -should enable and disable loading after calling request OTP api failure 400', async () => {
    const dispatched: any[] = [];

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.Email,
        phone_number: '787092211',
        user_code: '',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
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

    const mockSendOtpCodeByEmail = jest.spyOn(otpService, 'sendOtpCodeByEmail')
        .mockImplementation(() => Promise.resolve(mockResponse));

    await runSaga({
        dispatch: (action: any) => dispatched.push(action),
      }, resendOtpSaga, payload).toPromise();


    expect(mockSendOtpCodeByEmail).toHaveBeenCalledTimes(1);

    expect(dispatched[0]).toEqual({ type: 'ENABLE_LOADER' });

    expect(dispatched[1]).toEqual({ type: 'DISABLE_LOADER' });

    mockSendOtpCodeByEmail.mockClear();
})

test('request resend otp with email - and show snackbar with message with response 200', async () => {

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
        request_otp_type: RequestOTPType.Email,
        user_id: 'user_id_test',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: otpService.ISendOTPCodeToByEmail = {
        data: {
            user_id: 'user_id_test',
        }
    }
    expect(gen.next().value).toEqual(call(otpService.sendOtpCodeByEmail, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next(true).value).toEqual(put(snackBarAction.enableSnackBar('Code has been sent')));

    expect(gen.next().done).toBeTruthy();
})

test('request send otp with email - disable loading with response 400', async () => {

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
        request_otp_type: RequestOTPType.Email,
        user_id: 'user_id_test',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: otpService.ISendOTPCodeToByEmail = {
        data: {
            user_id: 'user_id_test',
        }
    }
    expect(gen.next().value).toEqual(call(otpService.sendOtpCodeByEmail, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request resend otp with email - should disable loading if got unknown error (500)', async () => {

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
        request_otp_type: RequestOTPType.Email,
        user_id: 'user_id_test',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_OTP_FOR_LOGIN,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: otpService.ISendOTPCodeToByEmail = {
        data: {
            user_id: 'user_id_test',
        }
    }
    expect(gen.next().value).toEqual(call(otpService.sendOtpCodeByEmail, requestOtpBody));

    expect(gen.next(mockResponse).value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();
})

test('request resend otp with email - should disable loading and show snack bar if got unexpected exception', async () => {

    const dataPayload : IRequestOtpPayload = {
        request_otp_type: RequestOTPType.Email,
        user_id: 'user_id_test',
        non_formatted_phone_number: '',
        country_code: '84'
    };

    const payload : IRequestOtpState = {
        type: REQUEST_RESEND_OTP,
        data: dataPayload
    };

    const gen = cloneableGenerator(resendOtpSaga)(payload);
    let next = gen.next();
    expect(next.value).toEqual(put(loadingAction.enableLoading()));

    const requestOtpBody: otpService.ISendOTPCodeToByEmail = {
        data: {
            user_id: 'user_id_test'
        }
    }
    expect(gen.next().value).toEqual(call(otpService.sendOtpCodeByEmail, requestOtpBody));

    expect(gen.throw({exception: 'unexpected exception'}).value).toEqual(put(snackBarAction.enableSnackBar()));

    expect(gen.next().value).toEqual(put(loadingAction.disableLoading()));

    expect(gen.next().done).toBeTruthy();

})
