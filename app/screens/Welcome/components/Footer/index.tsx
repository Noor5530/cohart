import React from "react";
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ArrowRight from "assets/Arrow_Right.png";
import styles from "./styles";

interface IProps {
  height: number;
}

const Footer: React.FC<IProps> = ({ height }: IProps) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const navigateRegister = () => {
    navigation.navigate("Register", { isUserJoining: false });
  };
  return (
    <View style={{ flex: 1, height, width, backgroundColor: "white" }}>
      <Text style={styles.textStyle}>
        Ready to add your voice to the community?
      </Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={navigateRegister}>
        <Text style={styles.buttonTitle}>LET&apos;S GO</Text>
        <Image source={ArrowRight} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
