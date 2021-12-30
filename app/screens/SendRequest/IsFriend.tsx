import { useNavigation } from '@react-navigation/native';
import { appFonts } from 'components/text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

import { iconColor, textColor } from '../../config/colors';
import AppState from '../../models/reducers';
import Avatar from './Avatar';
import Vector from './Vector';

interface Props {
    user: object;
}

export default function Container(props: Props) {
    const currentUser = useSelector((state: AppState) => state.user);
    const navigation = useNavigation();
    const openChat = () => {
        navigation.navigate('Chat', {
            friend: props.user,
            user: currentUser,
            back: true,
        });
    };

    return (
        <LinearGradient
            colors={['#1410F8', '#1410EF', '#110FCE']}
            style={styles.linearGradient}>
            <View style={styles.container}>
                <Avatar
                    photo={props.user?.cover_image}
                    style={styles.avatorTop}
                />
                <Avatar
                    photo={currentUser?.cover_image}
                    style={styles.avatorBottom}
                />

                <Vector />

                <View style={styles.line} />
            </View>
            <Button
                onPress={openChat}
                mode="text"
                style={styles.button}
                labelStyle={styles.buttonLabel}>
                CHAT NOW
            </Button>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    linearGradient: {
        height: hp('85') - 130,
        alignItems: 'center',
    },
    container: {
        height: hp('55'),
        width: '100%',
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatorTop: {
        top: wp('7'),
        right: wp('3'),
    },
    avatorBottom: {
        bottom: wp('7'),
        left: wp('3'),
    },
    line: {
        borderWidth: 1.14225,
        borderColor: textColor,
        width: hp('55'),
        transform: [{ rotate: '130deg' }],
    },
    button: {
        // width: 150,
        height: 38.43,
        backgroundColor: textColor,
        borderRadius: 21.9619,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 16.28,
        fontFamily: appFonts.InterRegular,
        color: iconColor,
        textAlign: 'center',
        fontWeight: '500',
    },
});
