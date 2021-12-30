import { iconColor, textColor } from "config/colors";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";

import PhoneInput from "./PhoneModel";
import { appFonts } from "./text";

interface Props extends TextInputProps {
  isNumber?: boolean;
  value: string;
  setValue: (value: string) => void;
  isValidate: boolean;
  setIsValidate: (value: boolean) => void;
  onSubmit: () => void;
  setError?: (value: string) => void;
  isEmail?: boolean;
  error?: string;
  placeholder: string;
  phoneInput: any;
  showFlag: boolean;
  style: TextStyle;
  paddingNull: boolean;
  customButtonFormatStyle: ViewStyle;
  setCountryCode?(countryCode: string): void;
}
export default function TextField(props: Props) {
  const {
    value,
    isValidate,
    onSubmit,
    error,
    phoneInput,
    showFlag = true,
    paddingNull,
    customButtonFormatStyle = {},
  } = props;

  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingLeft: paddingNull ? 0 : wp("6%"),
            paddingRight: paddingNull ? 0 : wp("6%"),
          },
        ]}
      >
        {showFlag ? (
          <PhoneInput
            value={value}
            ref={phoneInput}
            countryPickerButtonStyle={{
              padding: 0,
              margin: 0,
            }}
            countryContainerStyle={customButtonFormatStyle}
            textInputStyle={{
              height: 50.42,
              padding: 0,
              margin: 0,
              width: "90%",
              color: iconColor,
              fontFamily: appFonts.InterRegular,
              fontSize: wp("5"),
            }}
            textContainerStyle={{
              backgroundColor: textColor,

              borderBottomEndRadius: 14.4067,
              borderTopRightRadius: 14.4067,
              width: "90%",

              margin: 0,
              // backgroundColor: textColor,
              height: 50.42,
            }}
            codeTextStyle={{
              margin: 0,
              paddingRight: 5,
              color: iconColor,
              fontFamily: appFonts.InterRegular,
              fontSize: wp("5"),
            }}
            containerStyle={{
              padding: 0,
              margin: 0,
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              height: 50.42,
              borderColor: " #000000",
              borderRadius: 14.4067,
              paddingLeft: 20,
              backgroundColor: "#F6F6F6",
              ...customButtonFormatStyle,
            }}
            {...props}
          />
        ) : (
          <TextInput
            {...props}
            style={{
              height: 50.42,
              padding: 0,
              margin: 0,
              backgroundColor: "white",
              borderRadius: 14.4067,

              width: "100%",
              color: iconColor,
              fontFamily: appFonts.InterRegular,
              fontSize: wp("5"),
              paddingLeft: 20,
              ...props.style,
            }}
          />
        )}
        {isValidate && (
          <TouchableOpacity style={styles.validation} onPress={onSubmit}>
            <AntDesign name={"check"} color="black" size={30} />
          </TouchableOpacity>
        )}
      </View>

      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: textColor,
    left: 0,
    bottom: 0,
    paddingLeft: 50,
    width: "100%",
    textAlign: "left",
    paddingTop: 5,
  },
  container: {
    paddingTop: 22.81,
    width: "100%",

    flexDirection: "row",
  },
  validation: {
    width: 42.02,
    height: 50,
    backgroundColor: "#e6ff00",
    position: "absolute",
    borderBottomRightRadius: 14.4067,
    borderTopRightRadius: 14.4067,

    right: wp("6"),
    top: 23,
    alignItems: "center",
    justifyContent: "center",
  },
});
