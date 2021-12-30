import { IRequestOtpState, IRequestOtpResponseState } from 'models/actions/user';
import { call, put } from 'redux-saga/effects';
import {ISendOTPCodeByUserCode, ISendOTPCodeByPhoneNumber } from 'services/otpCodeService';
import * as loadingAction from 'store/actions/loadingActions';
import * as navigationActions from 'store/actions/navigationActions';
import * as snackBarAction from 'store/actions/snackBarAction';
import * as otpService from 'services/otpCodeService';
import { RequestOTPType } from 'enums/request_otp_type';


export default function* requestOtpSaga(action: IRequestOtpState) {
    try {
        yield put(loadingAction.enableLoading());
        const { data } = action;

        let requestOtpResponse:  IRequestOtpResponseState;
        if (data.request_otp_type === RequestOTPType.UserCode) {
            const requestOtpWithUserCodeBody : ISendOTPCodeByUserCode = {
                user_code: data.user_code,
                phone_number: data.phone_number,
                registration_id: data.registration_id
            };
            requestOtpResponse = yield call(otpService.sendOtpCodeByUserCode, requestOtpWithUserCodeBody);
        } 
        
        else {
            const requestOtpWithPhoneNumberBody : ISendOTPCodeByPhoneNumber = {
                phone_number: data.phone_number,
                registration_id: data.registration_id
            };
            requestOtpResponse = yield call(otpService.sendOtpCodeByPhoneNumber, requestOtpWithPhoneNumberBody);
        }


        const { data: responseData } = requestOtpResponse;

        if (responseData.statusCode === 200) {
        
            yield put(loadingAction.disableLoading());
            yield call(navigationActions.navigateToOtpVerification, {
                data: {
                    ...requestOtpResponse.data?.data,
                    country_code: data.country_code,
                    number: data.non_formatted_phone_number,
                    phone_number: data.phone_number
                }
            })

        } else if (responseData.statusCode === 400) {
        
            yield put(loadingAction.disableLoading());
            yield call(navigationActions.navigateToSignUp);
        
        } else {

            yield put(loadingAction.disableLoading());
        }

    } catch (error) {
        yield put(snackBarAction.enableSnackBar());
        yield put(loadingAction.disableLoading());
    }
}
