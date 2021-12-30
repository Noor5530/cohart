import { appFonts } from "components/text";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("25"),
    paddingRight: wp("10"),
    paddingLeft: wp("10"),
  },
  headingText: {
    fontFamily: appFonts.InterBold,
    fontSize: hp("6"),
  },
  subText: {
    textTransform: "uppercase",
    fontFamily: appFonts.InterSemiBold,
    fontSize: hp("3"),
    alignSelf: "center",
    marginTop: hp("10"),
    marginBottom: hp("2.7"),
  },
  icon: {
    alignSelf: "center",
  },
});

export default styles;
