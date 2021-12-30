import analytics from '@segment/analytics-react-native';
// import TutorialAvatar from 'assets/tutorialAvatar.png';
import { ArrowUp, CrossIcon, ArrowLeftPrimary } from 'components/Icons';
import { appFonts } from 'components/text';
import { iconColor, neonYellow, textColor } from 'config/colors';
import AppState from 'models/reducers';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { viewTutorialRequest } from 'store/actions/userActions';
// import { VolumeIcon } from 'utils/icons';

interface IProps {
    isModalVisible: boolean;
    toggleModal: (value: boolean) => void
}

export default function Tutorial(props: IProps) {
    const userId = useSelector((state: AppState) => state.user._id);

    const [firstLayer, setFirstLayer] = useState(true);

    const dispatch = useDispatch();

    return (
        <Modal
            key="Tutorial"
            animationInTiming={2000}
            animationIn="bounce"
            animationOut="bounceOutDown"
            animationOutTiming={2000}
            isVisible={props.isModalVisible}>
            <View style={styles.container}>
                {firstLayer ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                analytics.screen('Tutorial_Second_Tip', {});
                                setFirstLayer(false);
                            }}
                            style={styles.button}>
                            <Text style={[styles.buttonText]}>NEXT TIP</Text>
                        </TouchableOpacity>
                        <ArrowUp />

                        <View
                            style={[
                                styles.messageContainer,
                                { marginTop: 30},
                            ]}>
                            <View style={{width: '13%'}}/>
                            <View style={[styles.messageBox, { width: '60%', }]}>
                                <Text style={styles.heading}>SWIPE</Text>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <Text style={[styles.bold, {marginRight: 5}]}> UP</Text> 
                                    <Text style={{marginRight: 5}}>to</Text>
                                    <Text style={styles.bold}>DISCOVER</Text>
                                </View>
                                <Text>more profiles</Text>

                                <View style={{flexDirection: 'row', marginTop: 15}}>
                                    <Text style={[styles.bold, {marginRight: 5}]}> Right</Text> 
                                    <Text style={{marginRight: 5}}>to</Text>
                                    <Text style={styles.bold}>FOLLOW</Text>
                                </View>
                                <Text>this artist</Text>
                                    
                            </View>
                            <ArrowLeftPrimary/>
                        </View>
                    </View>
                ) :  (
                    <View
                    style={{
                        flex: 1,
                    }}>
                     
                    <View style={[styles.header]}>
                        <TouchableOpacity
                            onPress={() => {
                                analytics.track('Tutorial_completed', {});
                                dispatch(
                                    viewTutorialRequest({
                                        id: userId,
                                        view_type: 'tutorial_view',
                                        view_state: true,
                                    }),
                                );
                                props.toggleModal(false);
                            }}
                            style={styles.closeButton}>
                            <CrossIcon
                                width={15}
                                height={15}
                                color="black"
                            />
                          
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottonView}>
                        
                        <View style={[styles.tagView]}>
                            <View style={styles.tagHeading}>
                                <Text style={styles.description}>
                                    Toggle media sound
                                </Text>
                            </View>
                            <View style={styles.icon}>
                                {/* <VolumeIcon
                                    color={neonYellow}
                                    width={20}
                                    height={20}
                                    strokeWidth={0.6}
                                /> */}
                            </View>
                        </View>
                        <View style={[styles.tagView]}>
                            <View style={styles.tagHeading}>
                                <Text style={styles.description}>
                                    Share
                                </Text>
                            </View>
                            <View style={styles.icon}>
                                {/* <AntDesign
                                    color={neonYellow}
                                    name="sharealt"
                                    size={15}
                                /> */}
                            </View>
                        </View>
                        <View style={[styles.tagRowView]}>
                            <View style={{flexDirection: 'row',  alignItems: 'center'}}>
                                <View style={styles.tagHeading}>
                                    <Text style={styles.description}>
                                        Glow
                                    </Text>
                                </View>
                                <View style={styles.icon}>
                                    {/* <GlowIcon color={neonYellow} width={"15"} height={"15"} /> */}
                                </View>
                            </View>
                           
                        </View>
                 
                    </View>
                    <View style={styles.avatarSection}>
                            <View style={styles.avatarGroup}>
                                <View style={styles.avatar}>
                                    {/* <Image
                                        source={TutorialAvatar}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 9999,
                                            backgroundColor: shimmerColor,
                                        }}
                                    /> */}
                                </View>
                                <View style={styles.tagHeadingRight}>
                                    <Text style={styles.description}>
                                        Go to profile
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    closeButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: neonYellow,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width:40,
        height: 40,
    },
    button: {
        flexDirection: 'row',
        position: 'absolute',
        top: 45,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: neonYellow,
    },
    container: {
        flex: 1,
    },
    buttonText: {
        textTransform: 'uppercase',
        fontSize: 11,
        fontWeight: '600',
        fontFamily: appFonts.InterRegular,
        paddingHorizontal: 14,
        paddingVertical: 10,
        color: iconColor,
    },
    messageBox: {
        borderRadius: 10,
        // width: '60%',
        backgroundColor: textColor,
        paddingTop: 14,
        paddingBottom: 14,
        // paddingHorizontal: 19,
        alignItems: 'center',
        // alignSelf: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: appFonts.InterRegular,
        // color: '#0033F7',
        textTransform: 'uppercase',
        lineHeight: 22,
    },
    messageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    description: {
        fontSize: 12,
        fontFamily: appFonts.InterRegular,
        // color: '#0033F7',
        paddingVertical: 10,
        textAlign: 'center',
    },
    bottonView: {
        position: 'absolute',
        width: '100%',
        bottom: 101
        // bottom: 75
    },
    tagView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        
    },
    tagHeading: {
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: iconColor,
        backgroundColor: textColor,
        borderRadius: 15,
        marginRight: 10,
    },
    tagHeadingRight: {
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: iconColor,
        backgroundColor: textColor,
        borderRadius: 15,
        marginLeft: 10,
    },
    icon: {
        height: 40,
        width: 40,
        // borderRadius: 9999,
        // borderWidth: 1,
        // borderColor: neonYellow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bold: { fontWeight: 'bold' },
    tagRowView: {
        flexDirection: 'row',
        // alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    avatarGroup: {flexDirection: 'row', alignItems: 'center'},
    avatarSection: {position: 'absolute', bottom: 88},
    avatar: {
        height: 45,
        width: 45,
        // borderRadius: 9999,
        // borderWidth: 1,
        // borderColor: neonYellow,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
