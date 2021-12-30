import { useIsFocused } from '@react-navigation/native';
import ChangePhoneNumber from 'assets/ChangePhoneNumber.png';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import PhoneTextInput from 'components/PhoneModel';
import { iconColor, textColor } from 'config/colors';
import { isIphone } from 'lib/isIphone';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsRequest } from 'store/actions/userActions';

import { appFonts } from '../../components/text';
import AppState from '../../models/reducers';
import styles from './styles';

const LoginAs = () => {
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = React.useState('');
    const [error, setError] = useState('');
    const userId = useSelector((state: AppState) => state.user._id);
    // const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            setNumber('');
            setUpdatedPhoneNumber('');
            setError('');
        }
    }, [isFocused]);

    const onSubmit = () => {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

        if (regex.test(updatedPhoneNumber)) {
            setError('');
            Alert.alert('Login', 'Are you sure ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(
                            loginAsRequest({
                                admin_user_id: userId,
                                createWithCode: false,
                                phone_number: updatedPhoneNumber,
                                country_code: updatedPhoneNumber.slice(
                                    0,
                                    -number.length,
                                ),
                                number: number,
                            }),
                        );
                    },
                },
            ]);
        } else {
            setError('Please enter valid Number');
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
                textStyle={{
                    color: iconColor,
                    fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                }}
                back
                color={iconColor}
            />
            <HeaderHeading title={'Login\n As'} icon={ChangePhoneNumber} />
            <KeyboardAwareScrollView
                style={styles.mainContainer}
                contentContainerStyle={{ paddingBottom: hp('10') }}>
                <View style={styles.changeNumberContainer}>
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
                    {error != '' && (
                        <Text style={{ color: iconColor, fontSize: 12 }}>
                            {error}
                        </Text>
                    )}
                </View>

                <TouchableOpacity onPress={onSubmit} style={styles.button}>
                    <Text style={styles.bottonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
};
export default React.memo(LoginAs);
