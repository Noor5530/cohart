import { StyleSheet } from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import { iconColor, textColor } from "config/colors";
import { backgroundColor } from "config/colors";
import { appFonts } from "../../components/text";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  dropDownContainer: {
    position: "absolute",
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(10),
    backgroundColor: "red",
  },
  button: {
    width: widthPercentageToDP(34),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: iconColor,
    marginBottom: 20,
  },
  followingButton: {
    width: widthPercentageToDP(32),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: iconColor,
    marginBottom: 20,
    backgroundColor: iconColor,
  },
  followingBackButton: {
    width: widthPercentageToDP(32),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: iconColor,
    marginBottom: 20,
    backgroundColor: iconColor,
  },
  title: { paddingHorizontal: 0 },
  buttonText: {
    fontSize: widthPercentageToDP(3.5),
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "400",
    textTransform: "uppercase",
  },

  followingButtonText: {
    fontSize: widthPercentageToDP(3.5),
    color: textColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  followingBackButtonText: {
    fontSize: widthPercentageToDP(3.5),
    color: textColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  padding: { paddingHorizontal: 20 },
  contentContainerStyle: { paddingBottom: 100 },
});
export default styles;
