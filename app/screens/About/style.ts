import { appFonts } from 'components/text';
import { iconColor } from 'config/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
  center: {
    alignSelf: "center",
  },
  logo: {
    alignSelf: "center",
    marginTop: 40,
  },
  description: {
    marginTop: 22,
    fontSize: 15,
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
  versionInfo: {
    paddingTop: 30,
    fontSize: 14,
  },
  paintImage: {
    marginTop: 10,
    alignSelf: "center",
  },
  aboutImage: {
    height: 450,
    alignSelf: "center",
  },
  bottomImage: {
    height: 450,
    alignSelf: "center",
  },
  contactUs: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: appFonts.InterRegular,
    textAlign: "center",
    color: iconColor,
  },
  email: {
    padding: 10,
    paddingTop: 0,
    fontSize: 18,
    fontFamily: appFonts.InterRegular,
    textAlign: "center",
    fontWeight: "500",
    color: iconColor,
  },
  icon: { marginTop: 5, marginLeft: -25, marginBottom: 4 },
  scroll:{ paddingVertical: 35, paddingHorizontal: 36 }
});

export default styles;
