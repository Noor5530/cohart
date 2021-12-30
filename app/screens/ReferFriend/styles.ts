import { appFonts } from 'components/text';
import { iconColor, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const style = StyleSheet.create({
    container: {
        height: hp(100),
        width: '100%',
        backgroundColor: textColor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        width: '100%',
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: wp('5'),
    },
    bottomContainer: { flex: 1, width: '100%', alignItems: 'center' },
    button: {
        height: 35,
        width: 140,
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
    summaryText: {
        paddingTop: 10,
        fontFamily: appFonts.InterRegular,
        color: iconColor,
        paddingLeft: wp(4),
        width: wp(85),
        fontSize: 15,
    },
    phoneTextInputTextInputStyle: {
        height: 50.42,
        padding: 0,
        margin: 0,
        width: '90%',
        color: iconColor,
        fontFamily: appFonts.InterRegular,
        fontSize: wp('5'),
        fontWeight: 'bold',
    },
    phoneTextContainerStyle: {
        width: '90%',
        margin: 0,
        backgroundColor: textColor,
        height: 50.42,
    },
    phoneCountryContainerStyle: {
        borderWidth: 2,
        borderColor: iconColor,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: textColor,
    },
    phoneCodeTextStyle: {
        margin: 0,
        color: iconColor,
        fontFamily: appFonts.InterRegular,
        fontSize: wp('5'),
        fontWeight: 'bold',
    },
    phoneContainerStyle: {
        padding: 0,
        margin: 0,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 50.42,
        borderColor: iconColor,
        borderRadius: 14.4067,
        paddingLeft: 20,
        backgroundColor: textColor,
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: wp('5'),
        marginTop: hp('15'),
    },
    buttonStyles: {
        height: hp('5'),
        width: wp('90'),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 39,
        marginVertical: hp('1'),
        // paddingVertical:5
    },
    buttonTextStyle: {
        fontWeight: '700',
        color: iconColor,
        textTransform: 'uppercase',
    },
});
export default style;
