import React from "react";
import { View, ActivityIndicator, useWindowDimensions } from "react-native";

import styles from "./style"

const LoadingOverlay: React.FC = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={[styles.main, { width, height}]}
    >
      <ActivityIndicator color={"white"} size="large" />
    </View>
  );
};

export default LoadingOverlay