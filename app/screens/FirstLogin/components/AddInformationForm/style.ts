import { appFonts } from 'components/text';
import { iconColor, primary, placeHolderColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    space: {
        height: 25
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        height: 42,
        borderRadius: 22,
        alignSelf: 'center',
        marginTop: hp('7')
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: appFonts.InterRegular,
        paddingHorizontal: 10,
    },
    container: {
        paddingTop: hp('6'),
        paddingLeft: 38,
        paddingRight: 44,
      },
    textFelid: {
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 30,
        color: iconColor,
        height: 52,
        fontFamily: appFonts.InterRegular,
        borderBottomWidth: 1,
        borderBottomColor: placeHolderColor,
    },
    heading: {
        fontFamily: appFonts.InterRegular,
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 19,
        color: "rgba(0, 0, 0, 0.2)",
        paddingBottom: 5,
    },
    upperContainer: { width: wp(100),flex: 1 },
});

export default styles;
