import { BackIcon } from "components/Icons";
import React from "react";
import {
  useNavigation,
} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import CustomMaterialMenu from "./CustomMaterialMenu";
import { isIphone } from "../lib/isIphone";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { iconColor, primary } from "config/colors";
import { appFonts } from "./text";

interface Props {
  style?: ViewStyle;
  onPressDots?: () => void;
  onSelectOption1?: () => void;
  onSelectOption2?: () => void;
  headerTitle: string;
  Option1?: string;
  Option2?: string;
  onAcceptTitle?: string;
  onRejectTitle?: string;
  currentUser?: String;
  showDot: boolean;
}
export default function AppHeader(props: Props, color = iconColor) {
  const navigation = useNavigation();
  const { style, onPressDots, showDot = true } = props;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackIcon color={color === "#E8FC48" ? primary : iconColor} />
        <Text
          style={{
            fontSize: widthPercentageToDP("5%"),
            fontWeight: "500",
            marginLeft: 10,
            fontFamily: appFonts.InterRegular,
          }}
        >
          {props.headerTitle}
        </Text>
      </TouchableOpacity>

      {showDot && (
        <TouchableOpacity onPress={onPressDots}>
          <CustomMaterialMenu
            Option1={props.Option1}
            Option2={props.Option2}
            onSelectOption1={props.onSelectOption1}
            onSelectOption2={props.onSelectOption2}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: isIphone() + 20,
    paddingHorizontal: 23,
  },
  button: {
    width: "98%",
    height: 35,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
});