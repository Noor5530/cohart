import { appFonts } from 'components/text';
import { iconColor, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderTopColor: "black",
    backgroundColor: textColor,
    flex: 1,
  },
  textStyle: {
    color: iconColor,
    fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
  },
  headerStyle: {
    borderBottomColor: iconColor,
    borderBottomWidth: 1.5,
  },
  scrollView: { flex: 1 },
  contentContainer: { paddingBottom: 20, paddingTop: 43 },
  featureShotHeading: { marginLeft: -10, paddingTop: 5 },
});

export default styles;
