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
  searchBarStyle: { borderColor: iconColor, borderRadius: 5 },
  searchInputStyle: { fontSize: 15 },
  avatar: {
    height: widthPercentageToDP("25%"),
    width: widthPercentageToDP("25%"),
    borderWidth: 0,
    borderRadius: widthPercentageToDP("9%"),
  },
  contentStyle: {
    paddingBottom: 30,
  },
  avatarImage: {
    height: widthPercentageToDP("16%"),
    width: widthPercentageToDP("16%"),
    borderWidth: 0,
    borderRadius: widthPercentageToDP("8%"),
    //  paddingHorizontal: widthPercentageToDP("5%"),
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
  listComponent:{
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 20,
  },emptyText:{
                      fontSize: 14,
                      fontFamily: appFonts.InterBlack,
                    }
});
export default styles;
