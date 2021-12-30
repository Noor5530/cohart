import { useRoute } from '@react-navigation/native';
import CodeTextInput from 'components/CodeTextInput';
import { RequestOTPType } from 'enums/request_otp_type';

import { IRequestOtpPayload } from 'models/actions/user';
import { LoginScreenRouteProps } from 'navigation/types';
import React from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp } from 'store/actions/userActions';

import { textColor } from '../../config/colors';
import AppState from '../../models/reducers';
import styles from './styles';

const CohartLoginCode: React.FC = () => {
    const route = useRoute<LoginScreenRouteProps>();
    const dispatch = useDispatch();

    const token = useSelector((state: AppState) => state.user.token);
    const resendOtpCodeWithPhoneNumber = () => {
        const payload : IRequestOtpPayload = {
            non_formatted_phone_number: '',
            country_code: route?.params?.data?.country_code,
            phone_number: route?.params?.data?.phone_number,
            registration_id: token,
            request_otp_type: RequestOTPType.PhoneNumber,
            resend_sms : true
        }

        dispatch(resendOtp(payload));
    };

    const resendOtpCodeWithEmail = () => {
        const payload: IRequestOtpPayload = {
          user_id: route?.params?.data.user_data?._id,
          request_otp_type: RequestOTPType.Email,
          country_code: "",
        };
        dispatch(resendOtp(payload));
    };


    return (
        <KeyboardAwareScrollView key="cohartLogin" style={{ flex: 1 }}>
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />

            <ImageBackground
                style={styles.imageBackground}
                source={require('../../assets/LoginBackGround.png')}>
                <View style={styles.container}>
                    <Text style={styles.shortText}>
                        Enter the verification code sent to your phone{' '}
                    </Text>
                    <CodeTextInput
                        createWithCode={
                            route?.params?.data?.user_code ? true : false
                        }
                        phone_number={route?.params?.data?.phone_number}
                        countryCode={route?.params?.data?.country_code}
                        number={route?.params?.data?.number}
                    />

                    <View style={styles.checkContainer}>
                        <Text style={styles.footer}>
                            {'Didn’t receive it?'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={resendOtpCodeWithPhoneNumber}>
                        <Text style={styles.buttonTitle}>
                            Resend via mobile number
                        </Text>
                    </TouchableOpacity>
                    {route?.params?.data?.user_data?.email &&
                    route?.params?.data?.user_data?.email != '' ? (
                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                { marginTop: hp('1.5') },
                            ]}
                            onPress={resendOtpCodeWithEmail}>

                            <Text style={styles.buttonTitle}>
                                Resend via registered email address
                            </Text>
                        </TouchableOpacity>
                    ) : null}

                    <Text style={styles.bottomText}>
                        Featured artist: alec demarco
                    </Text>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
};

export default React.memo(CohartLoginCode);
