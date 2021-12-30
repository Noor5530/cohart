import { StyleSheet } from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import { iconColor, neonYellow, textColor } from "config/colors";
import { appFonts } from "../../components/text";
const styles = StyleSheet.create({
  ProfileConatainer: {
    flex: 1, justifyContent: "space-between"

  },
  column: {
    paddingVertical: heightPercentageToDP(0),
    flexDirection: 'column',
    alignItems: 'center',
    height: heightPercentageToDP(65),
    paddingTop: heightPercentageToDP(5)
         //THIS LINE HAS CHANGED
  },
  paragraph: {
    width: widthPercentageToDP("80%"),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',       //THIS LINE HAS CHANGED
    paddingTop: widthPercentageToDP("8%"),
  },
  fansHeader: {
    backgroundColor: neonYellow,
    paddingBottom: '3%'
  },
  container: {
    flex: 1, justifyContent: "space-between"
  },
  avatar: {
    height: widthPercentageToDP("28%"),
    width: widthPercentageToDP("28%"),
    borderWidth: 1,
    borderRadius: widthPercentageToDP("14%"),
    backgroundColor: 'lightgray'
  },
  contentStyle: {
    paddingBottom: 30,
  },
  avatarImage: {
    height: widthPercentageToDP("16%"),
    width: widthPercentageToDP("16%"),
    borderWidth: 2,
    borderRadius: widthPercentageToDP("8%"),
    //  paddingHorizontal: widthPercentageToDP("5%"),
  },

  button: {
    width: '105%',
    height: '105%',
    marginVertical: '65%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

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
  title: {
    paddingVertical: widthPercentageToDP("5%"),
    width: widthPercentageToDP("50"),
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center'

  },
  subTitle: {
    textAlign: 'center',
    paddingVertical: widthPercentageToDP("5%"),
    fontWeight: '400',
    fontSize: 19,
  },
  buttonText: {
    fontSize: widthPercentageToDP(4.5),
    color: textColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
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
});
export default styles;
