import { appFonts } from "components/text";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { isIphoneX } from "lib/isIphone";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 40,
    // backgroundColor: 'red',
    height: 60,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    paddingLeft: wp("5"),
    alignItems: "center",
  },
  headerText: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
    fontSize: 24,
  },
  avatarSection: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("30"),
  },
  avatarPlaceHolder: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceHolderDefault: {
    marginTop: 20,
    width: 110,
    height: 140,
  },
  collapsibleHeader: {
    borderTopWidth: 1,
    borderTopColor: "#E3E3E3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 76,
    paddingLeft: 16,
    paddingRight: 16,
  },
  collapsibleHeaderTitle: {
    fontFamily: appFonts.InterRegular,
    fontSize: 28,
    fontWeight: "400",
  },
  editAvatar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: 60,
  },
  qrIcon: {
    height: 40,
    width: 40,
  },
  qrButton: {
    position: "absolute",
    bottom: isIphoneX() ? 67 : 50,
    left: isIphoneX() ? "35%" : "32%",
    zIndex: 1000,
  },
  buttonSaveAll: {
    backgroundColor: "#0000FF",
    borderRadius: 0,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: 'absolute',
    bottom: 0
  },
  buttonText: {
    color: "white",
    fontFamily: appFonts.InterBold,
    fontWeight: "600",
    fontSize: 18,
  },
});

export default styles;
