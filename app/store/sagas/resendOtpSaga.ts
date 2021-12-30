import { IRequestOtpState, IRequestOtpResponseState } from 'models/actions/user';
import { call, put } from 'redux-saga/effects';
import {ISendOTPCodeByPhoneNumber, 
    ISendOTPCodeToByEmail } from 'services/otpCodeService';
import * as loadingAction from 'store/actions/loadingActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as otpService from 'services/otpCodeService';
import { RequestOTPType } from 'enums/request_otp_type';


export default function* resendOtpSaga(action: IRequestOtpState) {
    try {
        yield put(loadingAction.enableLoading());
        const { data } = action;

        let requestOtpResponse:  IRequestOtpResponseState;
        if (data.request_otp_type == RequestOTPType.PhoneNumber) {

            const requestOtpWithPhoneNumberBody : ISendOTPCodeByPhoneNumber = {
                phone_number: data.phone_number,
                registration_id: data.registration_id
            };
            requestOtpResponse = yield call(otpService.sendOtpCodeByPhoneNumber, requestOtpWithPhoneNumberBody);

        } 
        else {

            const requestOtpWithEmailBody: ISendOTPCodeToByEmail = {
                data: {
                    user_id: data.user_id
                }
            };
            requestOtpResponse = yield call(otpService.sendOtpCodeByEmail, requestOtpWithEmailBody);
        } 

        // console.log('REQUEST RESEND OTP => ' + JSON.stringify(requestOtpResponse))

        const { data: responseData } = requestOtpResponse;

        if (responseData.statusCode === 200) {

            yield put(loadingAction.disableLoading());
            yield put(snackBarAction.enableSnackBar('Code has been sent'));
        } 
        else if (responseData.statusCode === 500) {
            yield put(loadingAction.disableLoading());
        } 
        else {
            yield put(loadingAction.disableLoading());
        }

    } catch (error) {
        yield put(snackBarAction.enableSnackBar());
        yield put(loadingAction.disableLoading());
    }
}


