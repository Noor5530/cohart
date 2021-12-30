import { placeHolderColor, textColor } from "config/colors";
import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextStyle, View, TouchableOpacityProps, ActivityIndicator, ViewStyle } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  buttonTitle?: string | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  styleText?: TextStyle;
  stylesName?: TextStyle;
  loadingStyle?: ViewStyle;
  loadingColor?: string;
  loading?: boolean;
  color?: any;
}
const PrimaryButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style, props.color]}
      disabled={props.disabled || props.loading ? true : false}
    >

      <Text style={[props.stylesName, props.styleText]}>{props.buttonTitle}</Text>
      {props.loading && <View style={[styles.activityIndicatorStyle, props.loadingStyle]}>
        <ActivityIndicator size="small" color={props.loadingColor} />
      </View>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 33,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: placeHolderColor,
    // marginTop: "5%",
    backgroundColor: textColor,
    marginHorizontal: widthPercentageToDP(1.5)
  },
  name: {
    fontSize: widthPercentageToDP("5%"),
    // color: iconColor,
    color: "red",
    // fontFamily: Fonts.Primaryfont,
  },
  activityIndicatorStyle: { paddingLeft: 10 }
});
export default PrimaryButton;
