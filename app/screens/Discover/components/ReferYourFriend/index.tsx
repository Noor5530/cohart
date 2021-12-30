import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import ArrowRight from "assets/Arrow_Right.png";
import styles from "./style";

interface IProps {
  height: number;
}

const ReferYourFriend: React.FC<IProps> = ({ height }: IProps) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const handleNavigateRefer = () => {
    navigation.navigate('ReferFriend')
  }
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Cohart is a lot more fun with friends!</Text>
        <Text style={styles.text}>Invite someone to join?</Text>
      </View>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.primaryButton]}
        onPress={handleNavigateRefer}
      >
        <Text style={[styles.buttonText]}>Let&apos;s go</Text>
        <Image source={ArrowRight} />
      </TouchableOpacity>
    </View>
  );
};

export default ReferYourFriend;
