import { appFonts } from "components/text";
import { primary } from "config/colors";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  headingText: {
    fontFamily: appFonts.InterBold,
    fontSize: hp("6"),
    marginLeft: wp("10"),
    marginBottom: hp("7"),
    marginTop: hp("15"),
  },
  descriptionText: {
    fontFamily: appFonts.InterRegular,
    fontSize: hp("2.8"),
    width: wp("70"),
    marginLeft: wp("10"),
    marginBottom: hp("14"),
  },
  buttonStyle: {
    height: 36,
    width: wp("40"),
    borderRadius: 24.01,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  primaryButton: {
    backgroundColor: primary,
  },
  buttonText: {
    textTransform: "uppercase",
    fontFamily: appFonts.InterBold,
    color: "black",
    marginRight: wp("3"),
  },
});

export default styles;
