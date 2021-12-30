import { useNavigation, useRoute } from '@react-navigation/native';
import Arrow from 'assets/Arrow_Left.png';
import StatusBar from 'components/CustomStatusBar';
import { textColor } from 'config/colors';
import { UserState } from 'models/reducers/user';
import React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
interface IState {
  loginReducer: UserState;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.navigate('Base');
  return (
    <ImageBackground
      key="success"
      source={require('../../assets/LoginBackGround.png')}
      style={styles.container}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <View style={styles.innerContainer}>
        <Text style={styles.heading}>
          {'THANK YOU!\n\n WE LOOK FORWARD TO MEETING YOU.'}
        </Text>
        <Text style={styles.description}>
          While we are brewing things up on our end, follow us on social media
        </Text>

        <Text
          onPress={() => {
            Linking.openURL('https://twitter.com/cohart_co');
          }}
          style={styles.twitter}>
          [ TWITTER ]{' '}
        </Text>
        <Text style={styles.mailSender}>
          or send us an email to share your feedback
        </Text>
        <Text style={styles.email}>{route?.params?.email}</Text>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image source={Arrow} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
