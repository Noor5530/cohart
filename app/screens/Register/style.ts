import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appFonts } from "components/text";
import { primary } from "../../config/colors";

const styles = StyleSheet.create({
  registerHeading: {
    width: wp("82"),
    fontFamily: appFonts.InterSemiBold,
    fontSize: 40,
    alignSelf: "center",
    marginTop: hp("7"),
    marginBottom: 40,
  },
  registerHeadingContainer: {
    width: 45,
    height: 7,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 10,
  },
  registerSubheading: {
    marginRight: wp("17"),
    marginLeft: wp("7"),
    fontSize: 18,
    lineHeight: 22,
    fontFamily: appFonts.InterRegular,
    alignSelf: "center",
    marginBottom: wp("6"),
  },
  formWrapper: {
    marginRight: wp("7"),
    marginLeft: wp("7"),
  },
  textInputStyle: {
    backgroundColor: "white",
    paddingHorizontal: 0,
  },
  inputFieldMarginBottom: {
    marginBottom: wp("1.5"),
  },
  phoneInputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    height: 75,
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  buttonTextGray: {
    color: "gray",
  },
  buttonTextBlack: {
    color: "black",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp("2"),
  },
  buttonStyle: {
    height: 36,
    width: wp("40"),
    borderRadius: 24.01,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: primary,
  },
  registerSuccessHeading: {
    fontFamily: appFonts.InterSemiBold,
    fontSize: 40,
    alignSelf: "center",
    marginTop: 94,
    marginBottom: 40,
    width: wp("82"),
  },
  registerContainer: {
    flex: 1, 
    backgroundColor: "white"
  },
  descriptionText: {
    width: wp("82"),
    fontFamily: appFonts.InterRegular,
    fontSize: 18,
    alignSelf: "center",
  },
  marginSubDescription: {
    marginBottom: hp("3"),
  },
  subDescriptionText: {
    marginBottom: hp("10"),
  },
  registerSuccessButtonGroup: {
    marginTop: hp("2"),
    paddingLeft: wp("6"),
    paddingRight: wp("6"),
  },
  buttonTextWithIcon: {
    marginRight: wp("1"),
  },
  socialContainer: {
    paddingTop: hp("29"),
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
