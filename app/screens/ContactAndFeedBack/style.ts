import { appFonts } from 'components/text';
import { iconColor, placeHolderColor, primary, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20.1436,
    alignItems: 'center',
    color: iconColor,
    marginBottom: 7,
    marginLeft: 5,
  },
  input: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 19.6277,
    color: iconColor,
    borderRadius: 12.8335,
    borderWidth: 0.641676,
    backgroundColor: textColor,
    paddingLeft: 14.44,
    height: 42,
  },
  button: {
    width: 114.16,
    height: 42.06,
    backgroundColor: primary,
    borderRadius: 24.0334,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 17.8172,
    color: placeHolderColor,
  },
  emailSend: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 17.8172,
    alignItems: 'center',
    textAlign: 'center',
    color: '#0033f7',
  },
  description: {
    marginTop: 19,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18.0084,
    alignItems: 'flex-end',
    textAlign: 'center',

    color: '#000000',
  },
});

export default styles;
