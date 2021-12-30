import { textColor } from 'config/colors';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Button } from 'react-native-paper';

import styles from './styles';

const Home: React.FC = () => {
  // const onLogout = () => dispatch(userActions.logOut());

  return (
    <View key="home" style={styles.container}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <Button icon="logout" mode="outlined">
        Log out
      </Button>
    </View>
  );
};

export default Home;
