import React from "react";

import { View, Text, Image } from "react-native";
import ArrowDown from "assets/Arrow_Down.png";

import styles from "./style";

const SignUpSuccess: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>You are all set!</Text>
      <Text style={styles.headingText}>
        Keep discovering your new art world
      </Text>
      <Text style={styles.subText}>Let&apos;s go</Text>
      <Image style={styles.icon} source={ArrowDown} />
    </View>
  );
};

export default SignUpSuccess