import { appFonts } from 'components/text';
import { iconColor, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    height: hp(100),
    width: '100%',
    backgroundColor: textColor,
  },
  header: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: wp('5'),
  },
  bottomContainer: { flex: 1, width: '100%', alignItems: 'center' },
  button: {
    marginTop: hp(5),
    height: 35,
    width: 140,
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: iconColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottonText: {
    fontWeight: '500',
    fontFamily: appFonts.InterRegular,
    fontSize: 13,
  },
  bottomText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  cross: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    color: iconColor,
  },
  reefersText: {
    paddingTop: 25,
    height: 55,
    textAlignVertical: 'top',
    fontSize: 13,
    color: iconColor,
  },
  textInput: {
    height: 50.42,
    padding: 0,
    margin: 0,
    width: '100%',
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontSize: wp('5'),
    fontWeight: 'bold',
    backgroundColor: textColor,
    borderWidth: 0,
  },
  textContainer: {
    width: '100%',
    margin: 0,
    backgroundColor: textColor,
    height: 50.42,
  },
  countryContainerStyle: {
    borderWidth: 2,
    borderColor: iconColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: textColor,
  },
  codeTextStyle: {
    margin: 0,
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontSize: wp('5'),
    fontWeight: 'bold',
  },
  inputContainerStyle: {
    padding: 0,
    margin: 0,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 50.42,
    borderColor: '#000000',
    borderRadius: 14.4067,
    backgroundColor: textColor,
  },
  heading: {
    paddingVertical: 20,
    fontFamily: appFonts.InterRegular,
    color: iconColor,
    fontWeight: '400',
    fontSize: 15,
  },
  changeNumberContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingTop: hp(6),
  },
  numberInput: { flexDirection: 'row', height: 51 },
  changeNumberButton: { flex: 1 },
});
export default style;
