import { appFonts } from 'components/text';
import { iconColor, NeonBlue, neonYellow, primary, shimmerColor, textColor } from 'config/colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    userProfileContainer: { flex: 1 },
    userProfileHeader: { paddingHorizontal: 27 },
    container: {
        paddingTop: 30,
        paddingHorizontal: wp('7'),
        backgroundColor: 'rgba(252,252,252,1)',
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        // width: wp('50%'),
        height: 42,
        borderRadius: 22,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
        paddingHorizontal: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: appFonts.InterRegular,

        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        paddingHorizontal: 10,
        justifyContent: 'center',
        height: 33,
        // border: '1px solid #000000',
        borderWidth: 1,
        backgroundColor: 'black',
        borderRadius: 12.2,
    },
    imageBackGround: {
        paddingLeft: 32,
        paddingRight: 24,
        paddingBottom: 16,
        height: undefined,
        aspectRatio: 1,
        //  height: Dimensions.get('window').height / 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        resizeMode: 'cover',
    },
    isFriendChatText: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: textColor,
        borderWidth: 1,
        borderColor: iconColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusArea: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: textColor,
        borderWidth: 1,
        borderColor: iconColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    autoScrollView: {
        backgroundColor: 'rgba(0, 0, 255, 1)',
        flexDirection: 'row',
    },
    userTags: {
        color: 'rgba(255, 255, 255, 1)',
        padding: 12,
        fontSize: wp('5'),
    },
    animatedView: {
        top: 0,
        position: 'absolute',
        right: -70,
        //  marginRight: -,
        //   marginTop: -48,
    },
    profileBadgeArea: { width: '100%', paddingHorizontal: wp('5') },

    profileBadge: {
        width: 192,
        height: 192,
    },
    nameText: {
        color: 'black',
        fontSize: wp('10'),
        fontWeight: '700',
        width: wp('65'),
        fontFamily: appFonts.InterRegular,
    },
    textUpperCase: { textTransform: 'uppercase' },
    nameAreaAvator: {
        // alignSelf: 'center',
        marginTop: 5,
        backgroundColor: shimmerColor,
    },
    nameArea: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 28,
    },
    userText: {
        fontSize: wp('4'),
    },
    userArea: {
        flexDirection: 'row',
        width: '100%',
    },
    locationText: { fontSize: wp('5'), marginTop: 5 },
    postArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        marginTop: 16,
        paddingHorizontal: 17,
    },
    postAreaTouch: { flexDirection: 'row', alignItems: 'center' },
    bioArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        marginTop: 16,
        paddingHorizontal: 17,
    },
    userBioArea: {
        paddingHorizontal: 17,
    },
    portfolioArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        marginTop: 16,
        paddingHorizontal: 17,
    },
    portfolioAreaInner: { flexDirection: 'row', alignItems: 'center' },
    bottomContainer: {
        backgroundColor: 'rgba(230, 255, 0,1)',
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 16,
        paddingBottom: 32,
        marginTop: 32,
    },
    bottomContainerArea: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        justifyContent: 'space-between',
    },
    meetMeArea: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 20,
    },

    meetMeAreaInner: {
        width: '50%',
        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: '0%',
        marginRight: 8,
    },
    meetMeAreaInnerText: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        justifyContent: 'space-between',
    },
    currentlyViewContainer: {
        width: '50%',

        // flexGrow: 1,
        // flexShrink: 1,
        // flexBasis: '0%',
    },
    currentlyViewArea: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        justifyContent: 'space-between',
    },
    affliationView: {
        height: 44,
        // marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    instagramArea: {
        marginTop: 1,
        alignSelf: 'center',
        marginHorizontal: 8,
        height: 5,
        width: 5,
        backgroundColor: primary,
        borderRadius: 2.5,
    },
    instagramText: { textAlign: 'center', color: textColor, fontSize: 12 },
    userAffiliations: {
        backgroundColor: NeonBlue,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
    },
    websiteView: {
        alignSelf: 'center',
        marginHorizontal: 8,
        height: 5,
        width: 5,
        backgroundColor: primary,
        borderRadius: 2.5,
    },
    pendingRequestView: {
        height: 34,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        paddingHorizontal: 22,
        bottom: 21,
    },
    postsContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postsContainerScroll: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
        height: 160,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
    },
    postsContainerImage: {
        backgroundColor: shimmerColor,
        height: 128,
        width: 128,
        marginHorizontal: 4,
    },
    postsContainerProcessingView: {
        backgroundColor: shimmerColor,
        height: 160,
        width: 128,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postsContainerProcessingViewText: {
        color: 'black',
        fontSize: 12,
        textAlign: 'center',
    },
    PortfolioContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
        height: 160,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
    },
    PortfolioContainerTouch: {},
    PortfolioContainerImage: {
        backgroundColor: shimmerColor,
        height: 128,
        width: undefined,
        minWidth: 128,
        marginLeft: 4,
        marginRight: 4,
    },
    linkText: { textAlign: 'center', color: textColor, fontSize: 12 },
    linkInput: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 10,
        height: 25,
        fontFamily: appFonts.InterRegular,
        fontWeight: '500',
        width: wp('25'),
        marginBottom: 5,
    },
    dot: {
        alignSelf: 'center',
        marginHorizontal: 8,
        height: 5,
        width: 5,
        backgroundColor: primary,
        borderRadius: 2.5,
    },
    editButton: {
        width: wp('30'),
        height: hp('4'),
        borderRadius: wp('4'),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
    },
    editModeView: { flex: 1, alignItems: 'flex-end', paddingRight: 15 },
    button: {
        width: wp('34'),
        height: hp('4'),
        borderRadius: wp('4'),
        borderWidth: 1,
        backgroundColor: textColor,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    profilesaveButton: {
        width: wp('34'),
        height: hp('4'),
        borderRadius: wp('4'),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6FF04',
        borderColor: '#E6FF04',
        marginTop: hp('1'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    eidtMode: {
        width: wp('30'),
        height: hp('4'),
        borderRadius: wp('4'),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingHorizontal: 17,
        marginTop: 16,
    },
    profileCurrentyView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
    },
    profileCurrentyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
    },
    metMeContainer: {
        backgroundColor: neonYellow,
        paddingHorizontal: 17,
        paddingTop: 16,
        paddingBottom: 32,
        marginTop: 32,
    },
    editIcon: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: iconColor,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 4,
        bottom: 0,
        zIndex: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { height: 2, width: 2 },
    },
    snapShotOptionText:{
         fontSize: 20 ,fontWeight:'600',
         fontFamily:appFonts.InterRegular,
         paddingVertical:30
    }
});

export default styles;
