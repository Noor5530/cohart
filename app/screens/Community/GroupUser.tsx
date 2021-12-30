import { useNavigation } from '@react-navigation/native';
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
import deleteGroup from 'services/deleteGroup';
import editComunity from 'services/editComunity';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';
import { enableSnackBar } from 'store/actions/snackBarAction';

import { iconColor, primary, textColor } from '../../config/colors';
import AppState from '../../models/reducers';
import { getAllUserGroupRequest, getAllUserGroupResponse } from '../../store/actions/appAction';
import Friend from './components/Friend';
import styles from './style';
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface Props {
  connectionList: [];
  toggleButtonSheet: () => void;
  bottomSheetRef: typeof BottomSheet;
  suggestionCategory: object;

  isVisible: boolean;
}

const GroupUser = (props: Props) => {
  const {
    bottomSheetRef,
    isVisible = false,
    connectionList = [],
    suggestionCategory,
  } = props;
  const [searchString, setSearchString] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const [allUser, setAllUser] = useState([]);
  const userId = useSelector((state: AppState) => state.user._id);
  const [paginationError, setPaginationError] = useState(false);
  const live_data = useSelector((state: AppState) => state.app.live_data);
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState("");
  const [groupUserList, setGroupUserList] = useState([]);
  const [showAllUser, setShowAllUser] = useState(false);
  const friendsGroup = useSelector((state: AppState) => state.app.friendsGroup);
  const [loading, setLoading] = useState(true);
  const {
    state: { status, data },
    onSearch: getUserList,
  } = useFetch<any>(ApiConfig.FETCH_USER_IN_GROUP, {
    method: "POST",
    data: {
      user_group_id: suggestionCategory._id,
      page: 1,
      search_key: searchString,
      fetch_all: showAllUser,
    },
  });
  const deleteCommunity =async () => {
    bottomSheetRef?.current?.snapTo(Platform.OS == "android" ? 2 : 1);

    try {
      dispatch(enableLoading());
      let response = await deleteGroup({
        user_id: userId,
        group_id: suggestionCategory?._id,
      });
      dispatch(disableLoading());
      if (response.data.statusCode === 200) {
        dispatch(enableSnackBar(response?.data?.data.toString()));
      }
      const data = friendsGroup.filter((item) => {
        return item?._id !== suggestionCategory?._id;
      });
      dispatch(getAllUserGroupResponse(data));

    } catch (error) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      } else {
        dispatch(enableSnackBar());
      }
      dispatch(disableLoading());
    }
  };

  const editCommunity = async () => {
    if (groupName.length > 5) {
      bottomSheetRef?.current?.snapTo(Platform.OS == "android" ? 2 : 1);

      try {
        dispatch(enableLoading());
        let response = await editComunity({
          user_id: userId,
          group_id: suggestionCategory?._id,
          group_name: groupName,
          user_ids: groupUserList.toString(),
        });
        dispatch(disableLoading());
        dispatch(
          getAllUserGroupRequest({
            user_id: userId,
            page: 1,
          })
        );

        if (response.data.statusCode === 200) {
          dispatch(enableSnackBar("Group update successfully"));
        }
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        } else {
          dispatch(enableSnackBar());
        }
        dispatch(disableLoading());
      }
    } else {
      Alert.alert("Add Community", "Minimum 6 digits required", [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok",
        },
      ]);
    }
  };
  const onSearch = useCallback(
    (value) => {
      // Keyboard.dismiss();
      if (value != "") {
        setLoading(true);
        setAllUser([]);
        setPageNumber(1);
        getUserList({
          data: {
            user_group_id: suggestionCategory._id,
            page: 1,
            search_key: value,
            fetch_all: showAllUser,
          },
        });
      }
    },
    [showAllUser, searchString]
  );
  const onRefresh = () => {
    if (suggestionCategory._id) {
      setLoading(true);
      setAllUser([]);
      setPageNumber(1);
      getUserList({
        data: {
          user_group_id: suggestionCategory._id,
          page: 1,
          search_key: searchString,
          fetch_all: showAllUser,
        },
      });
    }
  };
  useEffect(() => {
    if (data !== undefined && Array.isArray(data.data)) {
      if (data.data.length != 0 && paginationError) {
        setPaginationError(false);
      }
      if (pageNumber == 1 && searchString == data?.searchKey) {
        setAllUser(data.data);
      } else if (data.data.length == 0) {
        setPaginationError(true);
      } else {
        if (searchString == data?.searchKey) {
          setAllUser((prv) => prv.concat(data.data));
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
    if (status != "fetching") {
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
      const is_added = item?.is_added == "true" ? true : false;

      return (
        <Friend
          onPress={() => {
            navigation.navigate("MyProfile", {
              user: currentItem,
              userType: "",
              back: true,
              currentUser: false,

            });
            bottomSheetRef?.current.snapTo(1);
          }}
          setGroupUserList={setGroupUserList}
          groupUserList={groupUserList}
          userType={showAllUser ? "group" : ""}
          isFriend={showAllUser && is_added ? true : false}
          isNotification={showAllUser}
          item={currentItem}
          avatarStyle={styles.avatar}
          avatarImageStyle={styles.avatarImage}
          style={styles.userContainer}
        />
      );
    },
    [
      bottomSheetRef,
      setGroupUserList,
      groupUserList,
      setAllUser,
      allUser,
      showAllUser,
      navigation,
      userId,
    ]
  );

  useEffect(() => {
    if (live_data !== null) {
      const data = [...allUser];
      const index = data.findIndex((item) => {
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

  const onEndReach = () => {
    if (allUser?.length > 18 && !paginationError) {
      setPageNumber((prv) => prv + 1);
      getUserList({
        data: {
          user_group_id: suggestionCategory._id,
          page: pageNumber + 1,
          search_key: searchString,
          fetch_all: showAllUser,
        },
      });
    }
  };

  useEffect(() => {
    if (searchString == "") {
      setAllUser([]);
      onRefresh();
    } else {
      onSearch(searchString);
    }
  }, [searchString]);
  useEffect(() => {
    if (isVisible) {
      setAllUser([]);
      setPageNumber(1);
      setGroupName(suggestionCategory?.group_name);
      onRefresh();
    }

    return () => {
      setAllUser([]);
      setPageNumber(1);
      setShowAllUser(false);
    };
  }, [connectionList, isVisible]);

  useEffect(() => {
    const data = [];
    allUser.map((item) => {
      if (item?.is_added == "true") {
        const currentItem =
          item?.sender_id !== userId ? item?.sender_id : item.recipient;

        data.push(currentItem?._id);
      }
    });
    setGroupUserList(data);
  }, [allUser]);
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
          onChangeText={setGroupName}
          onFocus={() => {
            if (Platform.OS == "android") {
              bottomSheetRef?.current?.snapTo(1);
            }
          }}
          style={{
            paddingHorizontal: wp(4),
            width: "100%",
            fontSize: 30,
            fontFamily: appFonts.InterRegular,
            fontWeight: "500",
          }}
        />
        <Text style={styles.description}>Tap title to edit folder name</Text>
        <View style={{ paddingHorizontal: wp(4), flexDirection: "row" }}>
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
            onPress={editCommunity}
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
            onPress={() => {
              Alert.alert("Are you sure ?", "Delete community ", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    deleteCommunity();
                  },
                },
              ]);
            }}
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
              Delete folder
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
          buttonStyle={{
            backgroundColor: showAllUser ? primary : textColor,
          }}
          placeholder="Search profile name"
          searchIconColor={iconColor}
          searchBarStyle={styles.searchBarStyle}
          searchInputStyle={styles.searchInputStyle}
          value={searchString}
          showPressButton={true}
          onPressDone={() => {
            if (showAllUser) {
              setAllUser([]);
              setPageNumber(1);
              getUserList({
                data: {
                  user_group_id: suggestionCategory._id,
                  page: 1,
                  search_key: searchString,
                  fetch_all: false,
                },
              });
            } else {
              setAllUser([]);
              setPageNumber(1);
              getUserList({
                data: {
                  user_group_id: suggestionCategory._id,
                  page: 1,
                  search_key: searchString,
                  fetch_all: true,
                },
              });
            }
            setShowAllUser((prv) => !prv);
          }}
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
    groupName,
    groupUserList,
    showAllUser,
    loading,
  ]);

  return (
    <BottomSheet
      onCloseEnd={() => {
        props.toggleButtonSheet();
        setAllUser([]);
        setPageNumber(1);
        Keyboard.dismiss();
      }}
      ref={bottomSheetRef}
      initialSnap={Platform.OS == "android" ? 2 : 1}
      snapPoints={Platform.OS == "android" ? [hp(75), hp(50), 0] : [hp(75), 0]}
      renderContent={renderContent}
    />
  );
};

export default React.memo(GroupUser);
