/* eslint-disable react/no-unescaped-entities */
import { useNavigation } from '@react-navigation/native';
import Arrow from 'assets/Arrow_Left.png';
import StatusBar from 'components/CustomStatusBar';
import TextField from 'components/TextField';
import { UserState } from 'models/reducers/user';
import React, { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import SingUp from 'services/singUp';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';

import { textColor } from '../../config/colors';
import { enableSnackBar } from '../../store/actions/snackBarAction';
import styles from './styles';

interface IState {
    loginReducer: UserState;
}

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const [isValidate, setIsValidate] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const onSubmit = () => {
        dispatch(enableLoading());
        SingUp(email)
            .then(data => {
                dispatch(disableLoading());
                if (data.data?.statusCode === 200) {
                    navigation.navigate('Success', { email: email });
                } else if (data?.data?.statusCode === 400) {
                    alert(data?.data?.data);
                } else {
                    dispatch(enableSnackBar());
                }
            })
            .catch(() => {
                dispatch(enableSnackBar());
                dispatch(disableLoading());
            });
    };

    const goBack = () => navigation.goBack();
    return (
        <KeyboardAwareScrollView key="singUp" style={{ flex: 1 }}>
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />

            <ImageBackground
                source={require('../../assets/LoginBackGround.png')}
                style={styles.imageBackground}>
                <View style={styles.container}>
                    <Text style={styles.shortText}>
                        We're working hard to get Cohart ready for everyone.
                        Sign up so we can keep you posted when it’s your turn to
                        join!
                    </Text>

                    <TextField
                        isEmail={true}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholderTextColor={'rgba(0,0,0,0.2)'}
                        value={email}
                        setValue={setEmail}
                        isValidate={isValidate}
                        setIsValidate={setIsValidate}
                        onSubmit={onSubmit}
                        placeholder={'hello@cohart.co'}
                        error={error}
                        setError={setError}
                    />
                    <TouchableOpacity
                        onPress={goBack}
                        style={styles.backButton}>
                        <Image source={Arrow} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Text style={styles.bottomText}>
                Featured artist:
                <Text style={styles.bottomInnerText}> alec demarco </Text>
            </Text>
        </KeyboardAwareScrollView>
    );
};

export default Login;
