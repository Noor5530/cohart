import { appFonts } from 'components/text';
import { primary, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { iconColor } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(40),
    flex: 1,
    alignItems: 'center',
  },
  checkContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23,
  },
  shortText: {
    width: 298.94,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18.0084,
    lineHeight: 22,
    alignItems: 'flex-end',
    textAlign: 'center',
    color: textColor,
    fontFamily: appFonts.InterRegular,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5.7147,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.476225,
    borderColor: iconColor,
    backgroundColor: textColor,
  },
  footer: {
    paddingLeft: 10,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 17,
    color: textColor,
  },
  termsConditionLine: {
    paddingLeft: 3,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 17,
    color: primary,
    textDecorationLine: 'underline',
    textDecorationColor: primary,
  },
  waitListButton: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    alignItems: 'center',
    textAlign: 'center',
    color: primary,
    paddingTop: 10,
  },
  referral: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 15.6501,
    lineHeight: 23,
    textAlign: 'center',
    color: primary,
    height: 23,
    marginTop: hp('11%'),
    textTransform: 'uppercase',
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
  imageBackground: {
    height: hp(100),
    width: wp(100),
  },
});

export default styles;
