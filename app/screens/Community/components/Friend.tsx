import Avatar from 'assets/dummyAvator.png';
import { appFonts } from 'components/text';
import { TouchAble as TouchOpacity } from 'components/workAround';
import {
    borderColor,
    iconColor,
    primary,
    profileColor,
    shimmerColor,
    textColor,
} from 'config/colors';
import React, { useState } from 'react';
import {
    Image,
    ImageStyle,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    style?: ViewStyle;
    name?: string;
    avatar?: string;
    avatarStyle?: ViewStyle;
    headingStyle?: TextStyle;
    isNotification?: boolean;
    yourConnection?: boolean;
    pendingRequest?: boolean;
    SuggestedConnections?: boolean;
    item?: object;
    userType: string;
    onPress: () => void;
    disable: boolean;
    avatarImageStyle?: ImageStyle;
    notificationCounter: number;
    isFriend: boolean;
    groupUserList: string[];
    setGroupUserList: (value: string[]) => void;
}
export default function Friend(props: Props) {
    const {
        userType,
        style,
        avatarStyle,
        headingStyle,
        isNotification,
        item,
        onPress,
        avatarImageStyle,
        notificationCounter,
        isFriend = false,
        groupUserList,
        setGroupUserList,
    } = props;
    const [isConnected, setIsFriend] = useState(isFriend);
    const onClick = () => {
        if (isNotification && userType == 'group') {
            if (isConnected) {
                const data = groupUserList.filter(current => {
                    return current !== item?._id;
                });

                setGroupUserList(data);
            } else {
                const data = [...groupUserList];
                data.push(item?._id);
                setGroupUserList(data);
            }
            setIsFriend(prv => !prv);
        } else {
            onPress();
        }
    };

    return (
        <TouchOpacity style={[styles.container, style]}>
            {isNotification && (
                <View
                    style={[
                        styles.notificationContainer,
                        {
                            backgroundColor:
                                props.userType == 'group' && !isConnected
                                    ? primary
                                    : isConnected
                                    ? textColor
                                    : profileColor,
                            borderColor: iconColor,
                            borderWidth: props.userType == 'group' ? 0.5 : 0,
                        },
                    ]}>
                    <TouchOpacity onPress={onClick}>
                        <View>
                            {notificationCounter ? (
                                <Text style={styles.notificationCount}>
                                    {notificationCounter}
                                </Text>
                            ) : isConnected ? (
                                <AntDesign
                                    name="minus"
                                    color="black"
                                    size={10}
                                />
                            ) : (
                                <AntDesign
                                    name="plus"
                                    color="black"
                                    size={10}
                                />
                            )}
                        </View>
                    </TouchOpacity>
                </View>
            )}
            <TouchOpacity
                onPress={onPress}
                style={[
                    styles.avatarContainer,
                    avatarStyle,
                    {
                        borderColor:
                            item?.is_live == true ? borderColor : textColor,
                        borderWidth: item?.is_live == true ? 1 : 0,
                    },
                ]}>
                <Image
                    style={[
                        styles.avatar,
                        avatarImageStyle,
                        {
                            opacity:
                                userType == 'group' && !isConnected ? 0.5 : 1,
                        },
                    ]}
                    source={
                        item?.cover_image ? { uri: item?.cover_image } : Avatar
                    }
                />
            </TouchOpacity>
            <Text numberOfLines={1} style={[styles.title, headingStyle]}>
                {item?.full_name}
            </Text>
        </TouchOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        width: wp('18'),
        // height: wp('18'),
        borderRadius: wp('9'),

        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    notificationContainer: {
        position: 'absolute',
        width: 20,
        height: 20,
        right: 0,
        top: 0.23,
        borderRadius: 10,
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: wp('14'),
        height: wp('14'),
        borderRadius: wp('7'),
        backgroundColor: shimmerColor,
    },
    title: {
        fontFamily: appFonts.InterRegular,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 11.0379,
        textAlign: 'center',
        paddingTop: 3,
        color: iconColor,
    },
    avatarContainer: {
        width: wp('16'),
        height: wp('16'),
        borderRadius: wp('8'),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        borderColor: '#0033f7',
    },
    notificationCount: {
        fontFamily: appFonts.InterRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 10.801,
        color: textColor,
    },
});
