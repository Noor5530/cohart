import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen"

import { primary, iconColor } from "config/colors";
import { appFonts } from "components/text";

const styles = StyleSheet.create({
  animatedImage: {
    position: "absolute",
    top: 10,
    left: 210,
    width: 55,
    height: 50,
  },
  animatedText: {
    width: 298,
    fontFamily: appFonts.InterRegular,
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 25,
  },
  row: {
    flexDirection: "row",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary,
    borderRadius: 39,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: iconColor,
    fontSize: 13,
    paddingVertical: 7,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: appFonts.InterRegular,

    paddingHorizontal: 20,
  },
  container: {
      flex: 1,
      backgroundColor: 'white'
  },
  headerDescriptionText: {
    fontFamily: appFonts.InterRegular,
    paddingLeft: 38,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: hp('1.6'),
    paddingTop: 12,
    lineHeight: 12 /* identical to box height */,
    textTransform: 'uppercase', 
    color: iconColor,
  }
});

export default styles;
