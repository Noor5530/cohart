import { appFonts } from 'components/text';
import { primary, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    height: '57%',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  login: {
    padding: 8,
  },
  forgot: {
    marginTop: 12,
  },
  labelStyle: {
    fontSize: 12,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: primary,
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontFamily: appFonts.InterRegular,
  },
  centertext: {
    color: textColor,
    fontSize: wp('4.5'),
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
    width: wp('50%'),
    height: 45,
    borderRadius: 22,
    alignSelf: 'center',
  },
  join: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: appFonts.InterRegular,
  },
  heading: {
    width: 196,
    marginBottom: 20,
    fontFamily: appFonts.InterRegular,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',

    color: '#e7fc44',
  },
  description: {
    width: 262,
    marginBottom: 15,
    color: '#ffffff',
    fontFamily: appFonts.InterRegular,
    fontSize: 12,
    lineHeight: 15,
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',
  },
  backButton: {
    width: 34,
    height: 40,
    marginTop: 50,
  },
  email: {
    width: 105.65,
    left: 136,
    top: 529.22,

    fontFamily: 'Space Mono',
    fontSize: 10.3539,
    lineHeight: 15,
    textAlign: 'center',

    color: '#e7fc44',
  },
  mailSender: {
    width: 262.92,
    marginBottom: 20,
    fontFamily: appFonts.InterRegular,

    fontSize: 12.0056,
    lineHeight: 15,
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',

    color: '#ffffff',
  },
  twitter: {
    width: 105.65,
    marginBottom: 20,
    fontFamily: appFonts.InterRegular,

    fontSize: 10.3539,
    lineHeight: 15,
    textAlign: 'center',

    color: '#e7fc44',
  },
});

export default styles;
