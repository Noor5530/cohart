import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import ArrowRight from "assets/Arrow_Right.png";
import styles from "./style";

interface IProps {
  onPressButton(): void
}

const Discover: React.FC<IProps> = ({onPressButton}: IProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={styles.headingText}>Ready to make connections?</Text>
      <Text style={styles.descriptionText}>
        Tell us about yourself to start meeting members of the community
      </Text>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.primaryButton]}
        onPress={onPressButton}
      >
        <Text style={[styles.buttonText]}>Let&apos;s go</Text>
        <Image source={ArrowRight} />
      </TouchableOpacity>
    </View>
  );
};

export default Discover;
