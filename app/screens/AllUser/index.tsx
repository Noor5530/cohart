import { useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import Search from 'assets/Search.png';
import HeaderHeading from 'components/HeaderHeading';
import SearchBar from 'components/SearchBar';
import { List as FlatList } from 'components/workAround';
import ApiConfig from 'config/api-config';
import useFetch from 'hooks/useFetch';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { appFonts } from '../../components/text';
import { iconColor } from '../../config/colors';
import AppState from '../../models/reducers';
import ProfileView from './components/ProfileView';
import styles from './styles';

interface Props {
    toggleButtonSheet: () => void;
    bottomSheetRef: typeof BottomSheet;
    isVisible: boolean;
}
export default function AllUser(props: Props) {
    const { bottomSheetRef, isVisible = false } = props;
    const [allUser, setAllUser] = useState([]);
    const [searchString, setSearchString] = useState('');
    const userId = useSelector((state: AppState) => state.user._id);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageError, setError] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const {
      state: { status, data, error },
      onSearch: getUser,
    } = useFetch<any>(ApiConfig.SEARCH_USER, {
      method: "POST",
      data: {
        user_id: userId,
        page: 1,
        search_key: searchString,
      },
    });
    const onSearch = useCallback(
      (value) => {
        // Keyboard.dismiss();
        if (value != "") {
          setLoading(true);
          setPageNumber(1);
          setAllUser([]);
          analytics.track("Searched_profiles", {
            search_string: value,
          });
          getUser({
            data: {
              user_id: userId,
              page: 1,
              search_key: value,
            },
          });
        }
      },
      [allUser, userId, setAllUser, searchString]
    );
    useEffect(() => {
      console.log("====================================");
      console.log("status", status);
      console.log("====================================");
      if (status != "fetching" || error) {
        setLoading(false);
      } else {
        if (!loading) {
          setLoading(true);
        }
      }
    }, [status, data]);
    useEffect(() => {
        if (searchString == '') {
            setAllUser([]);
            onRefresh();
        } else {
            onSearch(searchString);
        }
    }, [searchString]);
    useEffect(() => {
        if (data !== undefined && Array.isArray(data?.data)) {
            if (pageError) {
                setError(false);
            }
            if (pageNumber == 1 && searchString == data?.searchKey) {
                setAllUser(data?.data);
            } else {
                if (searchString == data?.searchKey) {
                    setAllUser(prv => prv.concat(data?.data));
                }
            }
        } else {
            if (searchString == data?.searchKey) {
                setAllUser([]);
            }
            setError(true);
        }
    }, [data]);

    useEffect(() => {
        if (isVisible) {
            setAllUser([]);
            onRefresh();
        }
    }, [isVisible]);
    const renderItem = useCallback(({ item }) => {
        return (
            <ProfileView
                onPress={() => {
                    navigation.navigate("MyProfile", {
                      currentUser: false,
                      user: item,
                      userType: "",
                      back: true,
                    });
                }}
                name={item?.full_name}
                avatar={item?.cover_image}
                userName={item?.username}
            />
        );
    }, []);

    const onRefresh = () => {
        setLoading(true);
        setError(false);
        setPageNumber(1);
        getUser({
            data: {
                user_id: userId,
                page: 1,
                search_key: searchString,
            },
        });
    };

    const onEndReach = () => {
        if (allUser?.length > 18 && !pageError) {
            setPageNumber(prv => prv + 1);
            getUser({
                data: {
                    user_id: userId,
                    page: pageNumber + 1,
                    search_key: searchString,
                },
            });
        }
    };
    const renderContent = useCallback(() => {
      return (
        <View style={styles.constrainer}>
          <HeaderHeading
            textStyle={{
              fontWeight: "bold",
            }}
            crossIcon={true}
            onClose={() => bottomSheetRef?.current?.snapTo(2)}
            style={{
              alignItems: "center",
            }}
            visibleDot={false}
            title={"Search\nProfiles"}
            icon={Search}
            drawer={true}
          />
          <SearchBar
            onFocus={() => {
              if (Platform.OS == "android") {
                bottomSheetRef?.current?.snapTo(1);
              }
            }}
            onSubmit={() => {}}
            searchBarStyle={{
              borderRadius: 20,
              borderColor: iconColor,
            }}
            searchIconColor={iconColor}
            value={searchString}
            handleSearchInput={(text) => {
              setSearchString(text);
            }}
            placeholder="Search profile name"
          />
          <FlatList
            refreshing={allUser.length == 0 ? loading : false}
            onRefresh={onRefresh}
            contentContainerStyle={{
              paddingHorizontal: 27,
              paddingVertical: 20,
            }}
            keyExtractor={(item, index) => `id_${index}`}
            data={allUser}
            onEndReached={onEndReach}
            renderItem={renderItem}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                  }}
                >
                  {allUser?.length > 0 && loading ? (
                    <ActivityIndicator color={"black"} size="small" />
                  ) : null}
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
          />
        </View>
      );
    }, [searchString, allUser, status, loading]);
    return (
        <BottomSheet
            onCloseEnd={() => {
                Keyboard.dismiss();
                props.toggleButtonSheet();
                setAllUser([]);
                setPageNumber(0);
            }}
            animateOnMount={true}
            enabledBottomInitialAnimation
            style={{ backgroundColor: 'white' }}
            ref={bottomSheetRef}
            initialSnap={Platform.OS == 'android' ? 2 : 1}
            snapPoints={
                Platform.OS == 'android' ? [hp(75), hp(50), 0] : [hp(75), 0]
            }
            renderContent={renderContent}
        />
    );
}
