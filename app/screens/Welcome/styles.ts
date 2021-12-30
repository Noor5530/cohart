import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerRightWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationButton: {
    marginRight: 13,
  },
  tabBarWrapper: {
    height: 66,
    flexDirection: "row",
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabLabel: {
    textTransform: "uppercase",
  },
});

export default styles;
