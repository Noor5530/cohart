import ApiConfig from 'config/api-config';
import { apiClient } from 'services/client';

export interface ISendOTPCodeByUserCode {
    user_code?: string;
    phone_number?: string;
    registration_id?: string;
}

export const sendOtpCodeByUserCode = (data: ISendOTPCodeByUserCode) => {
  return apiClient.post(ApiConfig.SEND_CODE, data);
}

export interface ISendOTPCodeByPhoneNumber {
    phone_number : string | undefined;
    registration_id?: string;
}

export const sendOtpCodeByPhoneNumber = (data: ISendOTPCodeByPhoneNumber) => {
    return apiClient.post(ApiConfig.CODE_VERIFICATION_FOR_LOGIN, data);
}

export interface ISendOTPCodeToByEmail {
    data: {
        user_id: string | undefined;
    }
}

export const sendOtpCodeByEmail = (data: ISendOTPCodeToByEmail) => {
    return apiClient.post(ApiConfig.SEND_CODE_VIA_EMAIL, data.data);
}

