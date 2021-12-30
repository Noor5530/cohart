import { appFonts } from "components/text"
import {StyleSheet} from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 30
    },
    textInputStyle: {
        backgroundColor: 'white',
        height: 44
    },
    tagListContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    tagListHeader: {
        fontSize: 16,
        fontFamily: appFonts.InterRegular,
        alignSelf: 'center',
        marginBottom: 15
    },
    tagListItemContainer: {
        marginTop: 17
    },
    tagListItemGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tagButton: {
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 7,
        paddingRight: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 32,
        borderRadius: 16,
        marginBottom: 10,
        marginRight: 10
    },
    tagButtonActive: {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: '#0033F7'
    },
    icon: {
        marginRight: 5
    },
    buttonText: {
        fontFamily: appFonts.InterRegular,
        fontWeight: '400',
        fontSize: 10,
    },
    buttonTextActive: {
        color: 'white'
    },
    button: {
        width: widthPercentageToDP(30),
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
    buttonSubmitText: {
        fontFamily: appFonts.InterBold,
        fontSize: 18
    }
})

export default styles