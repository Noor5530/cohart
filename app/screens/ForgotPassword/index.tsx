import NavigationService from 'app/navigation/NavigationService';
import StatusBar from 'components/CustomStatusBar';
import { textColor } from 'config/colors';
import React from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import styles from './styles';

const Home: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
    </View>
  );
};

export default Home;
