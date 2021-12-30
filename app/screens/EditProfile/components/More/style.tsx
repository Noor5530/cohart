import { appFonts } from "components/text";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
  },
  toggleStyle: {
    height: 17
  },
  inputWithIcon: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  removeBtn: {
    position: "absolute",
    right: -10,
    paddingRight: 15,
    top: 10,
    width: 70,
    height: '100%',
    alignItems: 'flex-end'
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    marginLeft: 7,
    fontSize: 12,
    fontFamily: appFonts.InterRegular,
  },
  inputStyle: {
    marginBottom: 5,
    paddingLeft: 6,
    borderWidth: 0,
    borderBottomWidth: 1,
    width: "100%",
    fontSize: 20,
  },
  meetMeWarning: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  warningText: {
    color: "#0000FF",
    marginLeft: 5,
    fontSize: 12,
    fontFamily: appFonts.InterRegular,
  },
  affiliation: {
    marginBottom: 30,
  },
  meetMe: {
    marginBottom: 30,
  },
  currently: {
    marginBottom: 30,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarItem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 11,
  },
  inviteRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
  },
  date: {
    fontSize: 10,
    color: "black",
    fontFamily: appFonts.InterRegular,
  },
  userInfo: {
    justifyContent: "center",
  },
  button: {
    width: wp(30),
    height: 43,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: appFonts.InterBold,
    fontSize: 18,
  },
  buttonToggle: {
    width: 70,
    alignItems: 'flex-end',
    height: 40,
    justifyContent: 'center'
  }
});

export default styles;
