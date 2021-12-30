import { useNavigation } from '@react-navigation/native';
import HeaderHeading from 'components/HeaderHeading';
import SearchBar from 'components/SearchBar';
import { appFonts } from 'components/text';
import { List as FlatList } from 'components/workAround';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, Platform, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { iconColor } from '../../config/colors';
import AppState from '../../models/reducers';
import Friend from './components/Friend';
import styles from './style';

interface Props {
    pendingRequests: [];
    toggleButtonSheet: () => void;
    bottomSheetRef: typeof BottomSheet;
    isVisible: boolean;
}

const PendingRequest = (props: Props) => {
    const { bottomSheetRef, isVisible = false } = props;
    const [searchString, setSearchString] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const userId = useSelector((state: AppState) => state.user._id);
    const [paginationError, setPaginationError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const {
      state: { status, data },
      onSearch: getUserList,
    } = useFetch<any>(ApiConfig.PENDING_REQUEST, {
      method: "POST",
      data: {
        recipient_id: userId,
        page: 1,
        search_key: searchString,
      },
    });

    const onSearch = useCallback(
        value => {
            //  Keyboard.dismiss();
            if (value != '') {
                setLoading(true);
                setAllUser([]);
                setPageNumber(1);
                getUserList({
                    data: {
                        page: 1,
                        recipient_id: userId,
                        search_key: value,
                    },
                });
            }
        },
        [setAllUser, searchString],
    );
    const onRefresh = () => {
        setLoading(true);
        setAllUser([]);
        setPageNumber(1);
        getUserList({
            data: {
                page: 1,
                recipient_id: userId,
                search_key: searchString,
            },
        });
    };
    useEffect(() => {
        if (data !== undefined && Array.isArray(data?.body)) {
            if (paginationError) {
                setPaginationError(false);
            }

            if (pageNumber == 1 && searchString == data?.searchKey) {
                setAllUser(data?.body);
            } else {
                if (searchString == data?.searchKey) {
                    setAllUser(prv => prv.concat(data?.body));
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
        if (status != 'fetching' && status != 'init') {
            setLoading(false);
        } else {
            if (!loading) {
                setLoading(true);
            }
        }
    }, [status]);
    const renderItem = useCallback(
        ({ item }) => {
            return (
                <Friend
                    onPress={() => {
                  navigation.navigate('MyProfile', {
                            user: item?.sender,
                            userType: 'pendingRequest',
                            user_connection_id: item._id,
                            back: true,
                        });

                        bottomSheetRef?.current.snapTo(1);
                    }}
                    item={item.sender}
                    avatarStyle={styles.avatar}
                    avatarImageStyle={styles.avatarImage}
                    style={styles.userContainer}
                />
            );
        },

        [bottomSheetRef],
    );
    const onEndReach = useCallback(() => {
        if (allUser?.length > 18 && !paginationError) {
            setPageNumber(prv => prv + 1);
            getUserList({
                data: {
                    page: pageNumber + 1,
                    recipient_id: userId,
                    search_key: searchString,
                },
            });
        }
    }, [
        allUser,
        paginationError,
        pageNumber,
        setPageNumber,
        searchString,
        userId,
        searchString,
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
        return () => {
            setSearchString('');
            setAllUser([]);
            setPageNumber(1);
        };
    }, [isVisible]);

    const renderContent = useCallback(() => {
      return (
        <View style={styles.bottomSheetContainer}>
          <HeaderHeading
            crossIcon={true}
            onClose={() =>
              bottomSheetRef?.current?.snapTo(Platform.OS == "android" ? 2 : 1)
            }
            visibleDot={false}
            title={"Pending\nRequests"}
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

export default React.memo(PendingRequest);
