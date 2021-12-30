import { appFonts } from "components/text";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  listContainer: {
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
