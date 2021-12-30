import { useNavigation } from '@react-navigation/native';
import YourConnection from 'assets/yourConnection.png';
import HeaderHeading from 'components/HeaderHeading';
import SearchBar from 'components/SearchBar';
import { appFonts } from 'components/text';
import { List as FlatList } from 'components/workAround';
import ApiConfig from 'config/api-config';
import { iconColor } from 'config/colors';
import useFetch from 'hooks/useFetch';
import AppStateTypes from 'models/reducers';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import Friend from './components/Friend';
import styles from './style';

interface Props {
    connectionList: [];
    toggleButtonSheet: () => void;
    bottomSheetRef: typeof BottomSheet;
    isVisible: boolean;
}

const YourRequest = (props: Props) => {
    const { bottomSheetRef, isVisible = false,  } = props;
    const [searchString, setSearchString] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const userId = useSelector((state: AppState) => state.user._id);
    const [paginationError, setPaginationError] = useState(false);
    const live_data = useSelector((state: AppState) => state.app.live_data);
    const navigation = useNavigation();
    const currentUser = useSelector((state: AppStateTypes) => state.user);
    const [loading, setLoading] = useState(true);
    const {
      state: { status, data },
      onSearch: getUserList,
    } = useFetch<any>(ApiConfig.YOUR_CONNECTIONS, {
      method: "POST",
      data: {
        sender_id: userId,
        page: 1,
        search_key: searchString,
      },
    });
    const onSearch = (value: string) => {
        if (value != '') {
            setLoading(true);
            setAllUser([]);
            setPageNumber(1);
            getUserList({
                data: {
                    page: 1,
                    sender_id: userId,
                    search_key: value,
                },
            });
        }
    };
    const onRefresh = () => {
        setLoading(true);
        setAllUser([]);
        setPageNumber(1);
        getUserList({
            data: {
                page: 1,
                sender_id: userId,
                search_key: searchString,
            },
        });
    };
    useEffect(() => {
        if (
            data !== undefined &&
            Array.isArray(data?.body?.my_connected_users)
        ) {
            if (paginationError) {
                setPaginationError(false);
            }
            if (pageNumber == 1 && searchString == data?.searchKey) {
                setAllUser(data?.body.my_connected_users);
            } else {
                if (searchString == data?.searchKey) {
                    setAllUser(prv =>
                        prv.concat(data?.body.my_connected_users),
                    );
                }
            }
        } else {
            if (pageNumber == 1 && searchString == data?.searchKey) {
                setAllUser([]);
            }

            setPaginationError(true);
        }
    }, [data]);
    const renderItem = useCallback(
        ({ item }) => {
            const currentItem = item.recipient;
            return (
                <Friend
                    onPress={() => {
                        bottomSheetRef?.current.snapTo(1);

                        if (item?.unread_msgs) {
                            const friend = item?.recipient;

                            navigation.navigate('Chat', {
                                friend: friend,
                                user: currentUser,
                                back: true,
                              currentUser: false
                            });
                        } else {
                          navigation.navigate('MyProfile', {
                                user: item?.recipient,
                                userType: '',
                                back: true,
                            currentUser: false,
                            });
                        }
                    }}
                    isNotification={
                        item?.unread_msgs && item?.unread_msgs !== 0
                            ? true
                            : false
                    }
                    notificationCounter={
                        item?.unread_msgs ? item?.unread_msgs : 0
                    }
                    item={currentItem}
                    avatarStyle={styles.avatar}
                    avatarImageStyle={styles.avatarImage}
                    style={styles.userContainer}
                />
            );
        },

        [bottomSheetRef, navigation],
    );

    useEffect(() => {
        if (live_data !== null) {
            const data = [...allUser];
            const index = data.findIndex(item => {
                return item?.recipient_id == live_data?.user_id;
            });
            if (index !== -1) {
                const temp = { ...data[index] };

                if (temp.sender_id == live_data?.user_id) {
                    temp.sender.is_live = live_data?.is_live;
                } else {
                    temp.recipient.is_live = live_data?.is_live;
                }
                data[index] = temp;
                setAllUser(data);
            }
        }
    }, [live_data]);

    const onEndReach = useCallback(() => {
        console.log('here');
        if (allUser?.length > 18 && !paginationError) {
            setPageNumber(prv => prv + 1);
            getUserList({
                data: {
                    page: pageNumber + 1,
                    sender_id: userId,
                    search_key: searchString,
                },
            });
        }
    }, [allUser, paginationError, pageNumber, userId, searchString]);

    useEffect(() => {
        if (isVisible && searchString == '') {
            setAllUser([]);
            onRefresh();
        } else if (!isVisible) {
          setSearchString("");
          setAllUser([]);
          setPageNumber(1);
        }
    }, [isVisible, searchString]);

    useEffect(() => {
        if (status != 'fetching') {
            setLoading(false);
        } else {
            if (!loading) {
                setLoading(true);
            }
        }
    }, [status, data]);
    const renderContent = useCallback(() => {
      return (
        <View style={styles.bottomSheetContainer}>
          <HeaderHeading
            visibleDot={false}
            title={"Your\nConnections"}
            icon={YourConnection}
            drawer={true}
            textStyle={styles.heading}
            style={styles.headerContainer}
          />
          <SearchBar
            onFocus={() => {
              if (Platform.OS == "android") {
                bottomSheetRef?.current?.snapTo(1);
              }
            }}
            onSubmit={() => {}}
            placeholder="Search profile name"
            searchIconColor={iconColor}
            searchBarStyle={styles.searchBarStyle}
            searchInputStyle={styles.searchInputStyle}
            value={searchString}
            handleSearchInput={(data) => {
              setSearchString(data);
              onSearch(data);
            }}
          />
          <FlatList
            refreshing={allUser.length == 0 ? loading : false}
            onRefresh={onRefresh}
            contentContainerStyle={styles.contentStyle}
            onEndReached={onEndReach}
            onEndThreshold={0.3}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    paddingTop: 20,
                  }}
                >
                  {allUser?.length == 0 && loading ? null : (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: appFonts.InterBlack,
                      }}
                    >
                      you do not have any connection
                    </Text>
                  )}
                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                <View style={styles.footer}>
                  {allUser?.length > 19 &&
                  !paginationError &&
                  status == "fetching" ? (
                    <ActivityIndicator color="black" size="large" />
                  ) : (
                    <View />
                  )}
                </View>
              );
            }}
            data={allUser}
            renderItem={renderItem}
            numColumns={5}
            keyExtractor={(item, index) => `id_${index}`}
          />
        </View>
      );
    }, [allUser, isVisible, status, searchString, loading]);

    return (
        <BottomSheet
            onCloseEnd={() => {
                props.toggleButtonSheet();
                setAllUser([]);
                setPageNumber(1);
                Keyboard.dismiss();
            }}
            ref={bottomSheetRef}
            initialSnap={Platform.OS == 'android' ? 2 : 1}
            snapPoints={
                Platform.OS == 'android' ? [hp(75), hp(50), 0] : [hp(75), 0]
            }
            renderContent={renderContent}
        />
    );
};

export default React.memo(YourRequest);
