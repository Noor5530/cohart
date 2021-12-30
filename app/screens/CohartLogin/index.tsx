import { useNavigation } from '@react-navigation/native';
import StatusBar from 'components/CustomStatusBar';
import TextField from 'components/PhoneTextInput';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import { UserState } from 'models/reducers/user';
import React, { useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import { textColor } from '../../config/colors';
import { disableLoading, enableLoading } from '../../store/actions/loadingActions';
import { enableSnackBar } from '../../store/actions/snackBarAction';
import styles from './styles';

interface IState {
  loginReducer: UserState;
}

const CohartLogin: React.FC = () => {
  const navigation = useNavigation();

  const [isTermsConditionSelected, setTermsCondition] =
    React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const dispatch = useDispatch();
  const {
    state: { status, data },
    refetch,
  } = useFetch<any>(ApiConfig.CODE_VERIFICATION, {
    method: "POST",
    data: {
      user_code: code,
    },
  });
  const onSubmit = () => {
    if (code == '') {
      setError('Please enter number');
    } else {
      refetch();
    }
  };
  useEffect(() => {
    if (status == 'fetching') {
      dispatch(enableLoading());
    } else if (status == 'fetched' && data.statusCode === 200) {
      dispatch(disableLoading());
      navigation.navigate('Login', { data: data.data });
    } else if (status !== 'init') {
      dispatch(disableLoading());
      dispatch(enableSnackBar(data?.data));
    }
  }, [status]);
  return (
    <KeyboardAwareScrollView key="logincohart" style={{ flex: 1 }}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/LoginBackGround.png')}>
        <View style={styles.container}>
          <Text style={styles.shortText}>
            If you were invited to the BETA community, enter your Cohart Code
            here
          </Text>
          <TextField
            showFlag={false}
            defaultCode={'US'}
            value={code}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            placeholderTextColor={'rgba(0,0,0,0.2)'}
            setValue={setCode}
            isValidate={isTermsConditionSelected}
            setIsValidate={setTermsCondition}
            onSubmit={onSubmit}
            placeholder={'xxx-xxx-xxx'}
            error={error}
            setError={setError}
            onChangeText={text => {
              setError('');
              setCode(text);
            }}
          />

          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => {
                setTermsCondition(prv => !prv);
              }}>
              {isTermsConditionSelected && (
                <AntDesign name={'check'} color="black" size={15} />
              )}
            </TouchableOpacity>
            <Text style={styles.footer}>
              {'I accept the  '}
              <Text
                style={styles.termsConditionLine}
                onPress={() => {
                  navigation.navigate('TermsAndCondition');
                }}>
                {'Terms & Conditions'}
              </Text>
            </Text>
          </View>

          <Text
            style={styles.referral}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            [ No Invite? ]
          </Text>
          <Text style={styles.bottomText}>
            Featured artist:
            <Text style={styles.bottomInnerText}> alec demarco </Text>
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(CohartLogin);
