import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { iconColor } from "config/colors";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function Tags(props: { tag: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>{props.tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: iconColor,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  tag: {
    fontSize: widthPercentageToDP(2.8),
    fontWeight: "400",
    color: iconColor,
    textAlign: "center",
  },
});
