import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { appFonts } from "components/text";
import { backgroundColor } from "config/colors";

const styles = StyleSheet.create({
  emptyContainer: { paddingTop: heightPercentageToDP(20) },
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  listContainer: {
    flex: 1,

    paddingVertical: 20,
    alignItems: "center",
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
