import AsyncStorage from '@react-native-community/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { primary } from 'config/colors';
import { useAppState } from 'hooks/useAppState';
import AppState from 'models/reducers';
import NavigationService from 'navigation/NavigationService';
import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import NotificationPopup from 'react-native-push-notification-popup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import resetBadgeCounter from 'services/resetBadgeCounter';
import { SAVE_TOKEN } from 'store/actions/types';

import { logOut } from '../store/actions/appAction';
import { appFonts } from './text';

const PushNotification = () => {
    const popup = useRef(NotificationPopup);
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const appState = useAppState();
    const _id = useSelector((state: AppState) => state.user._id);
    const loginAs = useSelector((state: AppState) => state.user.loginAs);

    useEffect(() => {
        const resetCounter = () => {
            try {
                resetBadgeCounter({
                    user_id: _id,
                });
            } catch (error) {
                // TODO Handle exception
            }
        };
        if (Platform.OS == 'ios' && appState == 'active') {
           if(!loginAs){
            resetCounter();
  }
            PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }
    }, [appState]);
    useEffect(() => {
        checkPermission();
        createNotificationListeners();
    }, []);
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage: any) => {
            console.log('remote', remoteMessage);
            showAlert(
                remoteMessage.notification.title,
                remoteMessage.notification.body,
                remoteMessage,
            );
        });

        return unsubscribe;
    }, []);

    const getToken = async () => {
        var fcm_token = await messaging().getToken();
        dispatch({
            type: SAVE_TOKEN,
            response: fcm_token,
        });
        await AsyncStorage.setItem('@fcm_token', fcm_token);
    };

    const checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled != -1) {
            getToken();
        } else {
            dispatch(logOut());
            requestPermission();
        }
    };

    const requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled == true) {
            getToken();
        }
    };
    const onPress = message => {
        let data = message?.data;
        let type = data?.action;
        if (isLoggedIn) {
            if (type == 'new_discover_post') {
                // NavigationService.navigate('NewPostPreview', {
                //     post: data.post,
                //     showPreviewText: false,
                //     back: false,
                // });
            } else if (type == 'new_chat_message') {
                NavigationService.navigate('Chat', {
                    friend: JSON.parse(data.sender),
                    user: JSON.parse(data.receiver),
                    back: false,
                });
            } else if (type == 'new_chat_messages') {
                NavigationService.navigate('Community', {
                    back: false,
                });
            } else if (type == 'new_connection_request') {
                NavigationService.navigate('MyProfile', {
                    user: JSON.parse(data.user),
                    userType: 'pendingRequest',
                    user_connection_id: data?.user_connection_id,
                });
            }
        } else {
            if (type == 'login_verification') {
                NavigationService.navigate('CohartLoginCode', {
                    data: data,
                });
            }
        }
    };
    const showAlert = (title: string, body: string, message) => {
        let notificationTitle = '';
        let data = message?.data;
        let type = data?.action;
        if (type == 'new_discover_post') {
            notificationTitle = 'New Discover Post';
        } else if (type == 'new_chat_message') {
            notificationTitle = 'New Message';
        } else if (type == 'new_chat_messages') {
            notificationTitle = 'New Message';
        } else if (type == 'new_connection_request') {
            notificationTitle = 'New Connection Request';
        } else {
            notificationTitle = 'New Connection Request';
        }
        if (type != 'new_chat_message') {
            popup.current.show({
                onPress: function () {
                    onPress(message);
                },
                appIconSource: { uri: message?.data?.image },
                appTitle: notificationTitle,
                timeText: 'Now',
                title: Platform.OS == 'android' ? body : title,
                body: Platform.OS == 'android' ? null : body,
                slideOutTime: 5000,
            });
        }
    };

    const createNotificationListeners = async () => {
        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            onPress(remoteMessage);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
            onPress(remoteMessage);
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                onPress(remoteMessage);
           });
    };
    const renderCustomPopup = data => (
        <View style={styles.container}>
            <View style={styles.leftContainer}></View>
            <View style={styles.mainContainer}>
                <View style={styles.upperView}>
                    <Text style={styles.title}>{data?.appTitle}</Text>
                    <AntDesign name="down" color="black" size={15} />
                </View>
                <View style={styles.userContainer}>
                    <FastImage
                        source={data.appIconSource}
                        style={styles.image}
                    />
                    <Text numberOfLines={3} style={styles.userName}>
                        {data?.title}
                    </Text>
                </View>
                <Text style={styles.message}>{data?.body}</Text>
            </View>
        </View>
    );
    return (
        //@ts-ignore
        <NotificationPopup
            ref={popup}
            renderPopupContent={renderCustomPopup}
            shouldChildHandleResponderStart={true}
            shouldChildHandleResponderMove={true}
        />
    );
};

export default PushNotification;

const styles = StyleSheet.create({
    container: {
        height: 75,
        width: '100%',
        paddingRight: 10,
        flexDirection: 'row',
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    leftContainer: {
        width: 20,
        height: '100%',
        backgroundColor: primary,
    },
    mainContainer: {
        paddingTop: 5,

        paddingLeft: 10,
        width: '90%',
    },
    upperView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: appFonts.InterRegular,
    },
    userContainer: { flexDirection: 'row', alignItems: 'center' },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: primary,
    },
    userName: {
        paddingLeft: 5,
        fontSize: 12,
        fontFamily: appFonts.InterRegular,
        fontWeight: '700',
        maxWidth: '90%',
    },
    message: {
        paddingLeft: 35,
        fontSize: 12,
        fontFamily: appFonts.InterRegular,
    },
});
