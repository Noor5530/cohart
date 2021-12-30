import { useIsFocused, useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import ChangePhoneNumber from 'assets/ChangePhoneNumber.png';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import PhoneTextInput from 'components/PhoneModel';
import ApiConfig from 'config/api-config';
import { iconColor, profileColor, textColor } from 'config/colors';
import useFetch from 'hooks/useFetch';
import { isIphone } from 'lib/isIphone';
import AppState from 'models/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';

import { appFonts } from '../../components/text';
import { enableSnackBar } from '../../store/actions/snackBarAction';
import { changeNumberRequest } from '../../store/actions/userActions';
import styles from './styles';

const ChangeNumber = () => {
    const phone_number = useSelector(
        (state: AppState) => state.user.phone_number,
    );
    const user = useSelector((state: AppState) => state.user);

    const [code, setCode] = useState('');
    const userId = useSelector((state: AppState) => state.user._id);
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = React.useState('');
    const [error, setError] = useState('');
    const [codeError, setSetCodeError] = useState('');

    const [isUpdateNumber, setIsUpdateNumber] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {
      state: { status, data: sendCodeResponse },
      refetch: sendCode,
    } = useFetch<any>(ApiConfig.SEND_SMS_FOR_NUMBER_CHANGE, {
      method: "POST",
      data: {
        old_phone_number: phone_number,
        new_phone_number: updatedPhoneNumber,
      },
    });

    useEffect(() => {
        if (!isFocused) {
            setNumber('');
            setUpdatedPhoneNumber('');
            setError('');
            setIsUpdateNumber(false);
            setCode('');
            setSetCodeError('');
        }
    }, [isFocused]);

    const onSubmit = () => {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

        if (regex.test(updatedPhoneNumber)) {
            setError('');
            Alert.alert('Change Number', 'Are you sure ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        //      setIsUpdateNumber(true);
                        sendCode({
                            data: {
                                old_phone_number: phone_number,
                                new_phone_number: updatedPhoneNumber,
                            },
                        });
                    },
                },
            ]);
        } else {
            setError('Please enter valid Number');
        }
    };

    useEffect(() => {
        if (status == 'fetching') {
            dispatch(enableLoading());
        } else if (status == 'fetched' && sendCodeResponse.statusCode === 200) {
            setIsUpdateNumber(true);
            dispatch(disableLoading());
        } else if (status !== 'init') {
            dispatch(disableLoading());
            setError(sendCodeResponse?.data ? sendCodeResponse?.data : '');

            dispatch(enableSnackBar(sendCodeResponse?.data));
        }
    }, [status, sendCodeResponse]);
    const onSavedNumber = () => {
        if (code == sendCodeResponse.data.sms_code) {
            analytics.track('Changed_phone_number', {
                new_phone_number: updatedPhoneNumber,
                current_phone_number: phone_number,
                user_id: userId,
                sms_code: code,
            });
            dispatch(
                changeNumberRequest({
                    new_phone_number: updatedPhoneNumber,
                    current_phone_number: phone_number,
                    user_id: userId,
                    sms_code: code,
                    country_code: updatedPhoneNumber.slice(0, -number.length),
                    number: number,
                }),
            );
        } else {
            setSetCodeError('Code is not valid');
        }
    };
    const textInputRef = useRef();
    return (
        <View style={styles.container} key="changeNumber">
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />
            <Header
                style={{
                    width: '100%',
                    paddingTop: isIphone(),
                    borderBottomColor: iconColor,
                    borderBottomWidth: 1.5,
                }}
                onPressStar={() => {
                    if (isUpdateNumber) {
                        setIsUpdateNumber(false);
                    } else {
                        navigation.goBack();
                    }
                }}
                textStyle={{
                    color: iconColor,
                    fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                }}
                back
                color={iconColor}
            />
            <HeaderHeading
                drawer={false}
                title={'Change\nPhone #'}
                icon={ChangePhoneNumber}
            />
            <KeyboardAwareScrollView
                style={styles.mainContainer}
                contentContainerStyle={{ paddingBottom: hp('10') }}>
                <View style={styles.changeNumberContainer}>
                    {!isUpdateNumber && (
                        <>
                            <Text style={styles.heading}>Current Number</Text>
                            <View style={styles.numberInput}>
                                <View
                                    style={[
                                        styles.countryContainerStyle,
                                        { justifyContent: 'center' },
                                    ]}>
                                    <Text style={styles.codeTextStyle}>
                                        {user?.country_code
                                            ? user?.country_code
                                            : ''}
                                    </Text>
                                </View>
                                <TextInput
                                    maxLength={14}
                                    editable={false}
                                    value={
                                        user?.user_number
                                            ? user?.user_number
                                            : ''
                                    }
                                    style={[
                                        styles.textInput,
                                        { paddingLeft: 15 },
                                    ]}
                                />
                            </View>
                        </>
                    )}
                    {isUpdateNumber && (
                        <Text style={[styles.heading, { textAlign: 'center' }]}>
                            Please enter verification code we sent to your
                            mobile
                        </Text>
                    )}
                    <Text style={styles.heading}>New Number</Text>

                    <PhoneTextInput
                        ref={textInputRef}
                        defaultCode={'US'}
                        defaultValue={number}
                        onChangeFormattedText={text => {
                            setUpdatedPhoneNumber(text);
                        }}
                        maxLength={20}
                        value={number}
                        textInputStyle={styles.textInput}
                        textContainerStyle={styles.textContainer}
                        countryContainerStyle={styles.countryContainerStyle}
                        codeTextStyle={styles.codeTextStyle}
                        containerStyle={styles.inputContainerStyle}
                        placeholder="xxxxxxxxxx"
                        disableArrowIcon={true}
                        layout="second"
                        onChangeText={text => {
                            setNumber(text);
                            setError('');
                        }}
                    />
                    {error !== '' && (
                        <Text style={{ color: iconColor, fontSize: 12 }}>
                            {error}
                        </Text>
                    )}
                </View>
                {isUpdateNumber && (
                    <>
                        <TextInput
                            value={code}
                            onChangeText={text => {
                                setSetCodeError('');
                                setCode(text);
                            }}
                            maxLength={6}
                            placeholder={'XXXXXX'}
                            style={[
                                styles.textInput,
                                {
                                    marginTop: hp(5),

                                    borderWidth: 2,
                                    borderColor: iconColor,
                                    width: '50%',
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    borderRadius: 14.4067,
                                },
                            ]}
                        />
                        {codeError !== '' && (
                            <Text
                                style={{
                                    paddingTop: 5,
                                    textAlign: 'center',
                                    color: iconColor,
                                    fontSize: 12,
                                }}>
                                {codeError}
                            </Text>
                        )}
                        <Text
                            style={[
                                styles.heading,
                                {
                                    textAlign: 'center',
                                    paddingBottom: 0,
                                    paddingTop: 10,
                                },
                            ]}>
                            Didn’t receive it?{' '}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                sendCode({
                                    data: {
                                        old_phone_number: phone_number,
                                        new_phone_number: updatedPhoneNumber,
                                    },
                                });
                            }}>
                            <Text
                                onPress={() => {
                                    sendCode({
                                        data: {
                                            old_phone_number: phone_number,
                                            new_phone_number:
                                                updatedPhoneNumber,
                                        },
                                    });
                                }}
                                style={[
                                    styles.heading,
                                    {
                                        paddingVertical: 5,
                                        textAlign: 'center',
                                        color: profileColor,
                                    },
                                ]}>
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                {isUpdateNumber ? (
                    <TouchableOpacity
                        onPress={onSavedNumber}
                        style={styles.button}>
                        <Text style={styles.bottonText}>Verify</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onSubmit} style={styles.button}>
                        <Text style={styles.bottonText}>CHANGE</Text>
                    </TouchableOpacity>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
export default React.memo(ChangeNumber);
