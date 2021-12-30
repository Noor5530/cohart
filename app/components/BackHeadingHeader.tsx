import { BackIcon } from "components/Icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { isIphone } from "../lib/isIphone";
import { appFonts } from "./text";

interface Props {
  style?: ViewStyle;
  headerTitle: string;
}
export default function FansHeader(props: Props) {
  const navigation = useNavigation();
  const { style } = props;
  const onClickBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, style]}>

        <TouchableOpacity onPress={onClickBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>{props.headerTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: isIphone() + 20,
    paddingHorizontal: 23,
    height: 90
  },
  headerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 10,
    fontFamily: appFonts.InterRegular,
  },
});
