import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { appFonts } from '../../components/text';
import { iconColor, primary } from '../../config/colors';

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    textAlign: 'auto',
    color: iconColor,
    fontFamily: appFonts.InterBold,
    fontSize: 20,
    fontWeight: '500',
  },
  acceptButton: {
    position: 'absolute',
    height: hp('4'),
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
    flexDirection: 'row',
    bottom: 20,
    borderColor: iconColor,
  },
  footerButton: {
    height: 42,
    width: 168,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
    flexDirection: 'row',
    marginBottom: 20,
  },
});
export default styles;
