import { StyleSheet } from 'react-native';
import { backgroundColor, shimmerColor, textColor } from "../../config/colors";
import { appFonts } from "components/text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  snapShotContainer: {
    paddingHorizontal: 10,
    width: "100%",
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  snapShotSubContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  iconContainer: {
    width: "33%",
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: "#FF0000",
    width: 70,
    height: 70,
    alignSelf: "center",
    borderRadius: 35,
  },
  imageStyle: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: backgroundColor,
    backgroundColor: shimmerColor,
  },
  snapShotTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,

    paddingTop: 30,
    flexDirection: "row",
  },
  snapShotTextContainer: {
    width: "33%",
    fontSize: 20,
    fontWeight: "500",
    color: textColor,
    textAlign: "right",
    fontFamily: appFonts.InterRegular,
  },
  artworkTextContainer: {
    width: "33%",
    textAlign: "right",

    fontSize: 20,
    fontWeight: "500",
    color: textColor,

    fontFamily: appFonts.InterRegular,
  }
});
export default styles;
