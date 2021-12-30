import { appFonts } from 'components/text';
import { textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('40%'),
    flex: 1,
    alignItems: 'center',
  },
  shortText: {
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: textColor,
    fontFamily: appFonts.InterRegular,
    paddingLeft: 32,
    paddingRight: 32,
  },
  imageBackground: {
    height: hp(100),
    width: wp(100),
  },
  backButton: {
    width: 34.85,
    height: 40,
    marginTop: hp('12%'),
  },
  bottomText: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10.955,
    lineHeight: 16,

    textTransform: 'uppercase',
    position: 'absolute',
    bottom: hp(2),
    left: 41.24,
    color: textColor,
  },
  bottomInnerText: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10.955,
    lineHeight: 16,

    textTransform: 'uppercase',
    color: textColor,
  },
});
export default styles;
