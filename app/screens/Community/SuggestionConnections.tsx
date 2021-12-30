import { useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import HeaderHeading from 'components/HeaderHeading';
import SearchBar from 'components/SearchBar';
import { List as FlatList } from 'components/workAround';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { iconColor } from '../../config/colors';
import AppState from '../../models/reducers';
import Friend from './components/Friend';
import styles from './style';

interface Props {
    isVisible: boolean;
    toggleButtonSheet: () => void;
    bottomSheetRef: typeof BottomSheet;
    suggestionCategory: object;
}

const SuggestConnection = (props: Props) => {
    const { bottomSheetRef, suggestionCategory, isVisible = false } = props;
    const [searchString, setSearchString] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const userId = useSelector((state: AppState) => state.user._id);
    const [paginationError, setPaginationError] = useState(false);
    const live_data = useSelector((state: AppState) => state.app.live_data);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const {
      state: { status, data },
      onSearch: getUserList,
    } = useFetch<any>(ApiConfig.SUGGESTED_CONNECTIONS, {
      method: "POST",
      data: {
        user_id: userId,
        page: 1,
        search_key: searchString,
      },
    });

    const onSearch = useCallback(
        data => {
            // Keyboard.dismiss();
            if (data != '') {
                setLoading(true);
                setAllUser([]);
                setPageNumber(1);
                getUserList({
                    data: {
                        tag_id: suggestionCategory._id,
                        page: 1,
                        user_id: userId,
                        search_key: data,
                    },
                });
            }
        },
        [setPageNumber, setAllUser, userId, suggestionCategory, searchString],
    );
    const onRefresh = () => {
        setLoading(true);
        setAllUser([]);
        setPageNumber(1);
        getUserList({
            data: {
                tag_id: suggestionCategory._id,
                page: 1,
                user_id: userId,
                search_key: searchString,
            },
        });
    };
    useEffect(() => {
        if (live_data !== null) {
            const data = [...allUser];
            const index = data.findIndex(item => {
                return item?._id == live_data?.user_id;
            });
            if (index !== -1) {
                const temp = { ...data[index] };

                if (temp.sender_id == live_data?.user_id) {
                    temp.sender.is_live = live_data?.is_live;
                } else {
                    temp.is_live = live_data?.is_live;
                }
                data[index] = temp;
                setAllUser(temp);
            }
        }
    }, [live_data]);
    useEffect(() => {
        if (status != 'fetching' && status != 'init') {
            setLoading(false);
        } else {
            if (!loading) {
                setLoading(true);
            }
        }
    }, [status]);
    useEffect(() => {
        if (data !== undefined && Array.isArray(data?.body?.suggested_users)) {
            if (paginationError) {
                setPaginationError(false);
            }
            if (pageNumber == 1 && searchString == data?.searchKey) {
                setAllUser(data?.body.suggested_users);
            } else {
                if (searchString == data?.searchKey) {
                    setAllUser(prv => prv.concat(data?.body.suggested_users));
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
            return (
                <Friend
                    onPress={() => {
                        analytics.track('Viewed_suggested_connection', {
                            user: item,
                            userType: '',
                        });
                        navigation.navigate('MyProfile', {
                            currentUser: false,
                            user: item,
                            userType: "",
                            back: true,
                        });
                        bottomSheetRef?.current.snapTo(1);
                    }}
                    item={item}
                    avatarStyle={styles.avatar}
                    avatarImageStyle={styles.avatarImage}
                    style={styles.userContainer}
                />
            );
        },

        [bottomSheetRef],
    );
    const onEndReach = useCallback(() => {
        if (allUser?.length > 15 && !paginationError) {
            setPageNumber(prv => prv + 1);
            getUserList({
                data: {
                    tag_id: suggestionCategory._id,
                    page: pageNumber + 1,
                    user_id: userId,
                    search_key: searchString,
                },
            });
        }
    }, [allUser, paginationError, pageNumber, setPageNumber]);

    useEffect(() => {
        if (isVisible && searchString == '') {
            console.log('here');
            onRefresh();
        } else if (isVisible) {
            onSearch(searchString);
        }
    }, [isVisible, searchString]);
    useEffect(() => {
        if (suggestionCategory && isVisible) {
            setAllUser([]);
            setPageNumber(1);
        }
        return () => {
            setAllUser([]);
            setPageNumber(1);
        };
    }, [suggestionCategory, isVisible]);
    console.log('alluser', allUser.length, loading);
    const renderContent = useCallback(() => {
      return (
        <View style={styles.bottomSheetContainer}>
          <HeaderHeading
            visibleDot={false}
            title={suggestionCategory?.title}
            drawer={true}
            textStyle={styles.heading}
            style={styles.headerContainer}
          />
          <SearchBar
            placeholder="Search profile name"
            onFocus={() => {
              if (Platform.OS == "android") {
                bottomSheetRef?.current?.snapTo(1);
              }
            }}
            onSubmit={() => {}}
            searchIconColor={iconColor}
            searchBarStyle={styles.searchBarStyle}
            searchInputStyle={styles.searchInputStyle}
            value={searchString}
            handleSearchInput={(data) => {
              setSearchString(data);
            }}
          />
          <FlatList
            refreshing={allUser.length == 0 ? loading : false}
            onRefresh={onRefresh}
            contentContainerStyle={styles.contentStyle}
            onEndReached={onEndReach}
            onEndThreshold={0.3}
            ListFooterComponent={() => {
              return (
                <View style={styles.footer}>
                  {allUser?.length > 0 && !paginationError && loading ? (
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
    }, [suggestionCategory, allUser, isVisible, status, searchString, loading]);

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

export default React.memo(SuggestConnection);
