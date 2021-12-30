import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { appFonts } from "components/text";
import { iconColor } from "config/colors";
import { EmptyComponentProps } from "../types";
import { heightPercentageToDP } from "react-native-responsive-screen";
export default function Empty(props: EmptyComponentProps) {
  const { heading, description, style } = props;
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(40),
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: appFonts.InterRegular,
    color: iconColor,
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
});
