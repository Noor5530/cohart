import { textColor } from "config/colors";
import { isIphone } from "lib/isIphone";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import { primary } from "../../config/colors";

const styles = StyleSheet.create({
  container: {
    height: hp("100"),
    width: "100%",
    backgroundColor: textColor,
  },
  header: {
    height: 120,
    width: "100%",
    backgroundColor: primary,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: isIphone(),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  connectButton: {
    backgroundColor: "black",
    borderRadius: 10,
  },
  buttonText: { padding: 5, color: textColor, fontSize: 15 },
  bubbleContainer: {
    margin: 0,
  },
  bubbleTextStyle: {
    color: "black",
    bottom: -hp("0.3"),
    fontSize: hp("2"),
  },
  bubbleWarpRight: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",
    // borderRadius: wp('10'),
    padding: wp("1"),
    marginVertical: hp("1"),
  },

  bubbleWarpLeft: {
    backgroundColor: primary,
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: hp("1"),
    padding: wp("1"),
  },
  rightTime: {
    color: "white",
    fontSize: hp("0.1"),
  },
  leftTime: {
    color: "yellow",
    fontSize: hp("0.1"),
  },
  avatarView: {
    width: hp("7"),
    height: hp("7"),
    borderRadius: hp("3.5"),
    borderWidth: 1,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("1"),
    marginHorizontal: wp("0.5"),
  },
  imageStyle: {
    width: hp("6"),
    height: hp("6"),
    borderRadius: hp("3"),
    padding: wp("1"),
  },
  messageImageStyle: {
    width: hp("15"),
    height: hp("15"),
    borderRadius: hp("1"),
  },
  composerView: {
    height: 65,
    paddingBottom: 10,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: wp("3"),
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  composerInnerView: {
    height: 40,
    width: wp("80"),
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    // top: -hp("0.4"),
    flex: 1,
    paddingLeft: wp("3"),
  },
  sendButton: {
    height: hp("5"),
    width: hp("5"),
    borderRadius: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
