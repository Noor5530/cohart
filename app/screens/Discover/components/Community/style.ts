import { appFonts } from "components/text";
import { primary } from "config/colors";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerStyle: {
    height: hp("35"),
    backgroundColor: primary,
  },
  headerText: {
    fontFamily: appFonts.InterBold,
    fontSize: hp("5"),
    marginLeft: wp("10"),
  },
  appIcon: {
    alignSelf: "flex-end",
  },
  content: {
    marginLeft: wp("10"),
  },
  row: {
    flexDirection: "row",
    marginTop: hp("2.5"),
    marginRight: wp("35"),
  },
  numberText: {
    fontSize: hp("3.5"),
    fontFamily: appFonts.InterRegular,
    marginRight: wp("2.5"),
  },
  contentText: {
    fontSize: hp("3.5"),
    fontFamily: appFonts.InterBold,
  },
  buttonText: {
    textTransform: "uppercase",
    fontFamily: appFonts.InterSemiBold,
    fontSize: hp("2"),
    marginRight: wp("2.5"),
  },
  buttonStyle: {
    marginTop: hp("3"),
    paddingTop: hp("1.8"),
    paddingBottom: hp("1.8"),
    paddingLeft: hp("3.5"),
    paddingRight: hp("3.5"),
    borderRadius: hp("3.5"),
    borderWidth: 1,
    borderColor: "#000000",
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonStyleActive: {
    backgroundColor: primary,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
