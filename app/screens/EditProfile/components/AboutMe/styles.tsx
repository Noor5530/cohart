import { appFonts } from "components/text";
import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  fullName: {
    fontFamily: appFonts.InterSemiBold,
    fontWeight: "600",
    fontSize: 32,
    alignSelf: "center",
    marginTop: 25,
  },
  textArea: {
    borderWidth: 0,
    fontSize: 24,
    minHeight: 40,
    fontFamily: appFonts.InterRegular,
    marginBottom: 5,
    marginTop: 10
  },
  maxLength: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  },
  container: {
      paddingLeft: 16,
      paddingRight: 16
  },
  button: {
    width: widthPercentageToDP(30),
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
});

export default styles;
