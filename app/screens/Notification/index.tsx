import { useIsFocused } from '@react-navigation/native';
import notificationIcon from 'assets/notificationIcon.png';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import { appFonts } from 'components/text';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import { isIphone } from 'lib/isIphone';
import AppState from 'models/reducers';
import NavigationService from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

import { iconColor, textColor } from '../../config/colors';

export default function About() {
    const userId = useSelector((state: AppState) => state.user._id);
    const focused = useIsFocused();
    const [pageNumber, setPageNumber] = useState(1);
    const [notificationList, setNotificationList] = useState([]);
    const [pageError, setPageError] = useState(false);
    const {
      state: { status, data = [] },
      refetch,
    } = useFetch<any>(ApiConfig.Notification, {
      method: "POST",
      data: {
        user_id: userId,
        page: 1,
      },
    });
    console.log('status', status, data);
    useEffect(() => {
        if (status == 'fetching') {
            //  dispatch(enableLoading());
        } else if (status == 'fetched') {
            if (Array.isArray(data.data)) {
                setPageError(false);

                if (pageNumber != 1) {
                    setNotificationList(prv => prv.concat(data.data));
                } else {
                    setNotificationList(data.data);
                }
            } else {
                if (pageNumber == 1) {
                    setNotificationList([]);
                }
                setPageError(true);
            }
        } else if (status !== 'init') {
            //   dispatch(disableLoading());
            //  dispatch(enableSnackBar(data.data));
        }
    }, [status, data]);
    const renderNotification = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item?.action == 'new_discover_post') {
                        NavigationService.navigate('Discover');
                    } else if (item?.action == 'new_chat_messages') {
                        NavigationService.navigate('Community');
                    } else if (item?.action == 'new_connection_request') {
                        NavigationService.navigate('MyProfile', {
                            user: item?.sender,
                            userType: 'pendingRequest',
                            user_connection_id: item?.user_connection_id,
                        });
                    } else if (item?.action == 'new_chat_message') {
                        NavigationService.navigate('Chat', {
                            friend: item.sender,
                            user: item.receiver,
                        });
                    }
                }}
                style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                    width: wp('100'),
                    paddingTop: 12,
                    paddingBottom: 12,
                }}>
                {item?.action == 'new_connection_request' ? (
                    <Text style={{ fontSize: wp('4') }}>
                        <Text style={{ fontWeight: '500', color: 'blue' }}>
                            {item.sender.full_name}
                        </Text>{' '}
                        {item?.message}
                    </Text>
                ) : item?.action == 'new_chat_message' ? (
                    <Text style={{ fontSize: wp('4') }}>
                        <Text style={{ fontWeight: '500', color: 'blue' }}>
                            {item.sender.full_name}
                        </Text>{' '}
                        {item?.message}
                    </Text>
                ) : (
                    <Text style={{ fontSize: wp('4') }}>{item?.message}</Text>
                )}
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        if (focused) {
            refresh();
        }
    }, [focused]);

    const refresh = () => {
        setPageNumber(1);
        refetch({
            data: {
                user_id: userId,
                page: 1,
            },
        });
    };
    const onEndReach = () => {
        if (notificationList.length > 15 && !pageError) {
            setPageNumber(pev => pev + 1);
            refetch({
                data: {
                    user_id: userId,
                    page: pageNumber + 1,
                },
            });
        }
    };
    return (
        <View
            key="notification"
            style={{
                flex: 1,
                backgroundColor: textColor,
            }}>
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />

            <Header
                style={{
                    paddingTop: isIphone(),
                    borderBottomColor: iconColor,
                    borderBottomWidth: 1.5,
                }}
                textStyle={{
                    color: iconColor,
                    fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                }}
                back
                color={iconColor}
            />
            <HeaderHeading title={'Notifications'} icon={notificationIcon} />

            <FlatList
                refreshing={status == 'fetching' ? true : false}
                onRefresh={refresh}
                contentContainerStyle={{
                    paddingVertical: 12,
                    paddingHorizontal: wp(4),
                }}
                ListFooterComponent={() => {
                    return (
                        <View
                            style={{
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {notificationList?.length > 0 &&
                            !pageError &&
                            status == 'fetching' ? (
                                <ActivityIndicator color="black" size="large" />
                            ) : (
                                <View />
                            )}
                        </View>
                    );
                }}
                onEndReached={onEndReach}
                data={notificationList}
                renderItem={renderNotification}
                keyExtractor={(item, index) => `id_${index}`}
            />
        </View>
    );
}
