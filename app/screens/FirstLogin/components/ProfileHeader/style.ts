import {StyleSheet} from "react-native"

import { appFonts } from 'components/text';
import { primary } from 'config/colors';
import { iconColor } from 'config/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    container: {
      height: hp('30'),
      backgroundColor: primary,
      justifyContent: 'flex-end',
      paddingBottom: 30,
    },
    logo: {
      width: wp('22'),
      height: hp('18'),
      position: 'absolute',
      top: 0,
      right: 0
    },
    header: {
      paddingLeft: 38,
      fontFamily: appFonts.InterBold,
      height: 19,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: hp('2'),
      lineHeight: 19, 
      textTransform: 'uppercase',
      color: iconColor,
    },
    description: {
      fontFamily: appFonts.InterRegular,
      paddingLeft: 38,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: hp('1.6'),
      textTransform: 'uppercase', 
      color: iconColor,
    },
  });
  
  export default styles