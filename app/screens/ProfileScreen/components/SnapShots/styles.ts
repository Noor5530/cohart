import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { appFonts } from "components/text";

const styles = StyleSheet.create({
  emptyContainer: { paddingTop: heightPercentageToDP(20) },
  container: {
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  listContainer: {
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  listComponent: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: appFonts.InterBlack,
  },
});
export default styles;
