import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { appFonts } from "components/text";
import { primary } from "../../../../config/colors";

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  registerSubContainer: {
    width: 45,
    height: 7,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 10,
  },
  registerSuccessHeading: {
    fontFamily: appFonts.InterSemiBold,
    fontSize: 40,
    alignSelf: "center",
    marginTop: hp("7"),
    marginBottom: 40,
    width: wp("82"),
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
    marginRight: wp("2.2"),
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
});

export default styles;
