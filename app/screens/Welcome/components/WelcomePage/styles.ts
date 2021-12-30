import { StyleSheet } from "react-native";

import { appFonts } from "components/text";
import { heightPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  welcomeHeading: {
    fontFamily: appFonts.InterSemiBold,
    fontSize: 32,
    alignSelf: "center",
    marginTop: heightPercentageToDP('10'),
    marginBottom: 40,
  },
  subHeading: {
    fontFamily: appFonts.InterSemiBold,
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    width: 321,
  },
  monoIcon: {
    width: 55,
    height: 55,
    alignSelf: "center",
    marginTop: 103,
    marginBottom: heightPercentageToDP('15'),
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
});

export default styles;
