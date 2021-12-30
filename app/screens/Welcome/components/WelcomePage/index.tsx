import React from "react";
import { View, Text, useWindowDimensions, Image } from "react-native";

import MonogramIcon from "assets/MonogramIcon.png";
import styles from "./styles";

interface IProps {
  height: any;
}

const WelcomePage: React.FC<IProps> = ({  height }: IProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, height, width, backgroundColor: 'white' }}>
      <Text style={styles.welcomeHeading}>Welcome!</Text>
      <Text style={styles.subHeading}>
        Within Cohart, you can discover and share creativity.
      </Text>
      <Image style={styles.monoIcon} source={MonogramIcon} />
      <Text style={[styles.subHeading, styles.uppercaseText]}>
        swipe up to get started
      </Text>
    </View>
  );
};

export default WelcomePage;
