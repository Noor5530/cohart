import { appFonts } from "components/text"
import {StyleSheet} from "react-native"
import { widthPercentageToDP as wp} from "react-native-responsive-screen"

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: 'white',
        fontSize: 20,
        fontFamily: appFonts.InterRegular,
        paddingHorizontal: 0,
    },
    inputWrapper: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 30
    },
    button: {
        width: wp(30),
        height: 43,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: appFonts.InterBold,
        fontSize: 18
    },
    redError: {
        color: 'red',
    }
})

export default styles