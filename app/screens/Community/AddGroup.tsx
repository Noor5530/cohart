import analytics from '@segment/analytics-react-native';
import SearchBar from 'components/SearchBar';
import { appFonts } from 'components/text';
import { List as FlatList, TouchAble as TouchableOpacity } from 'components/workAround';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, Platform, Text, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { iconColor } from '../../config/colors';
import AppState from '../../models/reducers';
import { addNewGroupRequest } from '../../store/actions/appAction';
import Friend from './components/Friend';
import styles from './style';

interface Props {
    connectionList: [];
    toggleButtonSheet: () => void;
    bottomSheetRef: typeof BottomSheet;
    isVisible: boolean;
}

const AddGroup = (props: Props) => {
    const { bottomSheetRef, isVisible = false, connectionList = [] } = props;
    const [searchString, setSearchString] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const dispatch = useDispatch();
    const [allUser, setAllUser] = useState([]);
    const userId = useSelector((state: AppState) => state.user._id);
    const [paginationError, setPaginationError] = useState(false);
    const [searchedUser] = useState([]);
    const live_data = useSelector((state: AppState) => state.app.live_data);
    const [groupName, setGroupName] = useState('');
    const [groupUserList, setGroupUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const {
        state: { status, data },
        onSearch: getUserList,
    } = useFetch<any>(ApiConfig.YOUR_CONNECTIONS, {
        method: 'POST',
        data: {
            sender_id: userId,
            page: 1,
            search_key: searchString,
        },
    });

    const onAddGroup = () => {
        if (groupName.length > 5) {
            analytics.track('Created_new_circle', {
                user_id: userId,
                group_name: groupName,
                user_ids: groupUserList.toString(),
            });
            bottomSheetRef?.current?.snapTo(Platform.OS == 'android' ? 2 : 1);
            dispatch(
                addNewGroupRequest({
                    user_id: userId,
                    group_name: groupName,
                    user_ids: groupUserList.toString(),
                }),
            );
        } else {
            Alert.alert('Add Community', 'Minimum 6 digits required', [
                {
                    text: 'OK',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'ok',
                },
            ]);
        }
    };

    const onSearch = useCallback(
        value => {
            setLoading(true);
            // Keyboard.dismiss();
            if (value != '') {
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
        },
        [allUser, setAllUser, searchString],
    );
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
    useEffect(() => {
        if (status != 'fetching') {
            setLoading(false);
        } else {
            if (!loading) {
                setLoading(true);
            }
        }
    }, [status, data]);

    const renderItem = useCallback(
        ({ item }) => {
            const currentItem =
                item?.sender_id !== userId ? item?.sender_id : item.recipient;
            const is_added = item?.is_added ? true : false;
            return (
                <Friend
                    setGroupUserList={setGroupUserList}
                    groupUserList={groupUserList}
                    onPress={() => {}}
                    userType={'group'}
                    isFriend={is_added}
                    isNotification={true}
                    item={currentItem}
                    avatarStyle={styles.avatar}
                    avatarImageStyle={styles.avatarImage}
                    style={styles.userContainer}
                />
            );
        },

        [bottomSheetRef, setGroupUserList, groupUserList, setAllUser, allUser],
    );

    useEffect(() => {
        if (live_data !== null) {
            const data = [...allUser];
            const index = data.findIndex(item => {
                return (
                    item?.sender_id == live_data?.user_id ||
                    item?.recipient_id == live_data?.user_id
                );
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
        console.log('here', paginationError);

        if (allUser?.length > 15 && !paginationError) {
            setPageNumber(prv => prv + 1);
            getUserList({
                data: {
                    page: pageNumber + 1,
                    sender_id: userId,
                    search_key: searchString,
                },
            });
        }
    }, [
        getUserList,
        allUser,
        paginationError,
        pageNumber,
        userId,
        searchString,
        setPageNumber,
    ]);

    useEffect(() => {
        if (isVisible && searchString == '') {
            setAllUser([]);
            onRefresh();
        } else if (isVisible) {
            onSearch(searchString);
        }
    }, [isVisible, searchString]);
    useEffect(() => {
        if (isVisible) {
            setAllUser(connectionList);
            setPageNumber(1);
            setGroupUserList([]);
            setGroupName('');
        }

        return () => {
            setAllUser([]);
            setPageNumber(1);
        };
    }, [connectionList, isVisible]);

    const renderContent = useCallback(() => {
      return (
        <View style={styles.bottomSheetContainer}>
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: 20,
              alignSelf: "center",
              backgroundColor: "lightgray",
              marginVertical: 10,
            }}
          />
          <TextInput
            value={groupName}
            //   multiline={true}
            placeholder={"Enter Community Name"}
            onFocus={() => {
              if (Platform.OS == "android") {
                bottomSheetRef?.current?.snapTo(1);
              }
            }}
            onChangeText={setGroupName}
            style={{
              paddingHorizontal: wp(4),
              width: "100%",
              fontSize: 30,
              fontFamily: appFonts.InterRegular,
              fontWeight: "500",
            }}
          />
          <View
            style={{
              paddingHorizontal: wp(4),
              flexDirection: "row",
              paddingTop: 5,
            }}
          >
            <TouchableOpacity
              disabled={
                groupName == "" || groupUserList?.length == 0 ? true : false
              }
              style={[
                styles.button,
                {
                  marginRight: 20,
                  borderColor:
                    groupName == "" || groupUserList?.length == 0
                      ? "#D9D9D9"
                      : iconColor,
                },
              ]}
              onPress={onAddGroup}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      groupName == "" || groupUserList?.length == 0
                        ? "#D9D9D9"
                        : iconColor,
                  },
                ]}
              >
                save changes
              </Text>
            </TouchableOpacity>
          </View>
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
            showSubmitButton={true}
            showPressButton={true}
            setShowSubmitButton={() => {}}
            handleSearchInput={(data) => {
              setSearchString(data);
            }}
          />
          <FlatList
            refreshing={allUser?.length == 0 ? loading : false}
            onRefresh={onRefresh}
            contentContainerStyle={styles.contentStyle}
            onEndThreshold={0.3}
            onEndReached={onEndReach}
            ListFooterComponent={() => {
              return (
                <View style={styles.footer}>
                  {allUser?.length > 19 && !paginationError && loading ? (
                    <ActivityIndicator color="black" size="large" />
                  ) : (
                    <View />
                  )}
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
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
                      No user found
                    </Text>
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
    }, [
      allUser,
      isVisible,
      status,
      searchString,
      searchedUser,
      groupName,
      groupUserList,
      loading,
    ]);

    return (
        <BottomSheet
            onCloseEnd={() => {
                props.toggleButtonSheet();
                setAllUser([]);
                setPageNumber(1);
                setAllUser([]);
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

export default React.memo(AddGroup);
