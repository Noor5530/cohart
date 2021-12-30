import { appFonts } from "components/text";
import { isIphone } from "lib/isIphone";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { iconColor } from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP } from "react-native-responsive-screen";
interface Props {
  style?: ViewStyle;

  heading?: string;
  back?: boolean;
}

export default function Header(props: Props) {
  const { style } = props;
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onBackPress} style={styles.button}>
          <Text style={styles.buttonHeading}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.heading}>New SnapShot</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonHeading}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    width: widthPercentageToDP(100),
    paddingTop: isIphone(),
    backgroundColor: "white",
  },
  heading: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
    fontSize: 18,
    color: iconColor,
  },
  iconContainer: { flex: 1, alignItems: "center" },
  button: {
    height: 34,
    width: 90,
    backgroundColor: "rgba(25, 25, 25, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHeading: {
    fontFamily: appFonts.InterRegular,
    fontSize: 16,
    color: iconColor,
  },
});
