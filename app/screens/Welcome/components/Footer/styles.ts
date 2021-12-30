import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { appFonts } from "components/text";
import { primary, iconColor } from "config/colors";

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 156,
    fontSize: 40,
    width: 315,
    alignSelf: "center",
    fontFamily: appFonts.InterSemiBold,
    marginBottom: hp("20"),
  },
  buttonStyle: {
    marginTop: hp("1.5"),
    width: wp("43"),
    height: 37,
    borderRadius: 24.01,
    paddingLeft: 37,
    paddingRight: 37,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonTitle: {
    fontFamily: appFonts.InterRegular,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: wp("3.8"),
    marginRight: wp("2.2"),
    textAlign: "center",
    color: iconColor,
  },
});

export default styles;
