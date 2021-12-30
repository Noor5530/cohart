import { appFonts } from "components/text";
import { primary } from "config/colors";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textWrapper: {
    marginTop: hp("11"),
    marginLeft: wp("5"),
    marginRight: wp("15"),
    marginBottom: hp("10"),
  },
  text: {
    fontSize: hp("5"),
    fontFamily: appFonts.InterBold,
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
