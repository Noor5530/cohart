import { appFonts } from 'components/text';
import { iconColor, primary, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1.5,
  },
  subContainer2: {
    flex: 1,
    alignItems: 'center'
  },
  subContainer3: {
    flex: 1,
    alignItems: 'center'
  },
  innerContainer: {
    height: hp('40'),
    alignItems: 'center',
  },
  shortText: {
    paddingTop: 7.87,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 19.209,
    lineHeight: 23,
    textAlign: 'center',
    color: textColor,
    paddingBottom: hp('3'),
  },
  logo: {
    paddingLeft: 34.32,
    paddingRight: 34.32,
    width: 306,
    height: 46,
  },
  loginButton: {
    marginTop: hp('1.5'),
    width: wp('60'),
    height: 37,
    borderRadius: 24.01,
    paddingLeft: 37,
    paddingRight: 37,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: wp('3.8'),

    textAlign: 'center',
    color: iconColor,
  },
  signInTitle: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,

    textAlign: 'center',
    color: primary,
  },
  signUpLine: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  waitListButton: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 37,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    marginTop: 10
  },
  signUpButtonHighLight: {
    fontSize: 14,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 37,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 2,
    color: primary
  }, 
  bottomText: {
    paddingTop: 70,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10.955,
    lineHeight: 16,

    textTransform: 'uppercase',
    bottom: hp(2),
    color: textColor,
    alignItems: 'center',
    textAlign: 'center',
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
  space: {
    height: 20,
  }
});

export default styles;
