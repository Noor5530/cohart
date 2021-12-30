import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appFonts } from "components/text";

const styles = StyleSheet.create({
  buttonTextWithIcon: {
    marginRight: wp("1"),
  },
  socialContainer: {
    paddingTop: hp("28"),
    paddingLeft: wp("7"),
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: wp("4"),
  },
  socialText: {
    marginLeft: wp("5"),
    fontSize: 16,
    fontFamily: appFonts.InterRegular,
  },
  socialSwipeText: {
    textTransform: "uppercase",
    fontSize: 18,
    fontFamily: appFonts.InterSemiBold,
    marginTop: hp("2"),
    alignSelf: "center",
  },
  arrowWrapper: {
    alignSelf: "center",
    marginTop: hp("3"),
  },
});

export default styles;
