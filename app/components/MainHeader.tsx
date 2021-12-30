import { appFonts } from "components/text";
import { isIphone } from "lib/isIphone";
import React from "react";
import { Notification } from "./SvgIcons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { iconColor } from "../config/colors";
import { Left } from "./SvgIcons";
import { useNavigation } from "@react-navigation/native";
interface Props {
  style?: ViewStyle;

  heading?: string;
  back?: boolean;
}

export default function Header(props: Props) {
  const { style, heading, back = false } = props;
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  const onPressNotification = () => {
    navigation.navigate("Notification");
  };
  return (
    <View style={[styles.container, style]}>
      <View>
        {back ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Left />
          </TouchableOpacity>
        ) : (
          <Text style={styles.heading}>{heading}</Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={onPressNotification}
          style={styles.notificationIcon}
        >
          <Notification />
        </TouchableOpacity>
        {/*
        <TouchableOpacity style={styles.chatIcon}>
          <Chat />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 90,
    backgroundColor: "white",
    paddingTop: isIphone(),
  },
  heading: {
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
    fontSize: 24,
  },
  iconContainer: { flexDirection: "row" },
  chatIcon: { paddingLeft: 10 },
  notificationIcon: { paddingHorizontal: 10 },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: iconColor,
    padding: 2,
    borderRadius: 12,
  },
});
