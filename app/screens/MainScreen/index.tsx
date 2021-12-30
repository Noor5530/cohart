import { useNavigation } from '@react-navigation/native';
import BackGround from 'assets/BackGround.png';
import Logo from 'assets/Logo.png';
import StatusBar from 'components/CustomStatusBar';
import { textColor } from 'config/colors';
import { UserState } from 'models/reducers/user';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-fast-image';

import styles from './styles';

interface IState {
  loginReducer: UserState;
}
const Login: React.FC = () => {
  const navigation = useNavigation();
  const onWaitList = () => navigation.navigate('SignUp');
  const navigateToSignUP = () => navigation.navigate('Login', { data: null });
  const navigateToWelcome = () => navigation.navigate('Welcome', { data: null });
  
  return (
    <View key="main" style={{ flex: 1 }}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <ImageBackground source={BackGround} style={styles.container}>
        <View style={styles.subContainer}>
          
        </View>
        <View style={styles.subContainer2}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.space}/>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={navigateToWelcome}>
            <Text style={styles.buttonTitle}>DISCOVER THE APP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer3}>
          <TouchableOpacity
            onPress={navigateToSignUP}>
            <Text style={styles.signInTitle}>SIGN IN</Text>
          </TouchableOpacity>
          <View style={styles.space}/>
          <View style={styles.signUpLine}>
            <Text style={styles.waitListButton}>
              Not a member yet?
            </Text>
            <Text style={styles.signUpButtonHighLight} onPress={onWaitList}>
              Sign up!
            </Text>
          </View>
          <Text style={styles.bottomText}>
            Featured artist:
            <Text style={styles.bottomInnerText}> alec demarco </Text>
          </Text>
        </View>
        
      </ImageBackground>
    </View>
  );
};

export default Login;
