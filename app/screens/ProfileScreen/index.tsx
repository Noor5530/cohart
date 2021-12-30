import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MainHeader from "components/MainHeader";
import ProfileHeader from "./components/ProfileHeader";
import TopBar from "./components/TopBar";
import styles from "./styles";
import Portfolio from "./components/Portfolio/Portfolio";
import Snapshots from "./components/SnapShots/SnapShots";
import About from "./components/About";
import AppState from "models/reducers/index";
import { useSelector, useDispatch } from "react-redux";
import MasonryList from "components/MasonryList";
import { enableSnackBar } from "store/actions/snackBarAction";
import { Post, getUserPost } from "services/getUserPost";
import { fetchUserWork, PortFolio } from "services/fetchUserWork";
import BackHeader from "components/BackHeader";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { UserState } from "../../models/reducers/user";
import { getUserInformation } from "../../services/getUserInformation";
import EmptyProfile from "./components/EmptyComponent";
import { MyProfileScreenRouteProps } from "navigation/types";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { MenuProvider } from "react-native-popup-menu";
import Alert from "components/Alert";
import PrimaryButton from "components/PrimaryButton";
import { followUser } from "services/followUser";
import { blockUser } from "services/blockUser";
import { disableLoading, enableLoading } from "store/actions/loadingActions";
import { reportUser } from "services/reportUser";
import { followStatus } from "services/followStatus";
import { ActivityIndicator } from "react-native-paper";
import { iconColor } from "../../config/colors";
import ReportBottomSheet from "components/ReportBottomSheet";
import { logOutRequest, requestGetUserInformation } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import { checkAlreadyConnected } from "services/checkAlreadyConnected";
import BottomTab from "navigation/BottomTab";
const ProfileScreen = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const myProfile = useSelector((state: AppState) => state.user);

  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);

  const navigation = useNavigation();
  const [user, setUser] = useState<UserState | null>(myProfile);
  const [loading, setLoading] = useState(false);
  const [snapShots, setSnapShots] = useState<Post[]>([]);
  const [portfolioList, setPortfolioList] = useState<PortFolio[]>([]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute<MyProfileScreenRouteProps>();
  const [pageLoading, setPageLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageError, setPageError] = useState(false);
  const {
    currentUser = false,
    user: otherUser,
    username = "",
    isFromDeepLink = false,
  } = route?.params;
  const [showAlert, setShowAlert] = useState(false);
  const [isFollow, toggleFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [followBack, setFollowBack] = useState(false);
  const bottomSheetRef = React.useRef(null);

  useLayoutEffect(() => {
    return () => {
      setSelectedTabIndex(0);
      setSnapShots([]);
      setPortfolioList([]);
      setPageNumber(1);
      setPageLoading(false);
      setPageError(false);
      setFollowLoading(false);
      setChatLoading(false);
    };
  }, [currentUser, otherUser?._id, username]);

  useEffect(() => {
    // TODO to do the migration data in the future once 
    // there is big upgrade 
    // in the data side
    // To persist data user infomation and others data
    dispatch(requestGetUserInformation({ user_id: myProfile._id }));

    if (user?._id) {
      onRefresh();
    }
  }, [selectedTabIndex, user?._id, currentUser]);
  useEffect(() => {
    if (
      isFocused &&
      !currentUser &&
      user?._id &&
      isLoggedIn &&
      !isFromDeepLink
    ) {
      getFollowStatus();
    }
  }, [user?._id]);
  useEffect(() => {
    if (isFocused) {
      getUserInfo();
    }
    return () => {
      setUser(null);
      toggleFollow(false);
      setFollowBack(false);
    };
  }, [isFocused]);
  //getting snapshot
  const getSnapShot = useCallback(async () => {
    try {
      setLoading(true);
      setPageNumber(1);
      let data = await getUserPost({
        page: 1,
        page_size: 20,
        user_id: user?._id,
      });
      setLoading(false);

      if (data?.data?.statusCode == 200) {
        setSnapShots(data?.data?.data);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setLoading(false);
      dispatch(enableSnackBar());
    }
  }, [user?._id, currentUser]);

  const getUserInfo = useCallback(async () => {
    try {
      dispatch(enableLoading());
      let params: {
        username?: string;
        id?: number;
      } = {};
      if (username && username != "" && isFromDeepLink) {
        params["username"] = username;
      } else {
        params["id"] = currentUser ? myProfile._id : otherUser?._id;
      }
      let data = await getUserInformation(params);
      if (data?.data?.statusCode == 200) {
        setUser(data?.data?.data);
      }

      dispatch(disableLoading());
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(disableLoading());

      dispatch(enableSnackBar());
    }
  }, [otherUser?._id, myProfile?._id, currentUser, username]);

  //OnRefresh
  const onRefresh = useCallback(() => {
    setPageError(false);
    setPageNumber(1);
    if (selectedTabIndex == 1) {
      getSnapShot();
    } else if (selectedTabIndex == 2) {
      getPortfolio();
    } else {
      getUserInfo();
    }
  }, [selectedTabIndex, currentUser, user?._id]);

  //getting loadMoreSnapShot
  const loadMoreSnapShot = useCallback(async () => {
    if (!pageLoading && !pageError && snapShots?.length != 0) {
      try {
        setPageLoading(true);
        let data = await getUserPost({
          page: pageNumber + 1,
          page_size: 20,
          user_id: user?._id,
        });
        setPageLoading(false);

        setPageNumber((prv) => prv + 1);
        if (
          data?.data?.statusCode == 200 &&
          Array.isArray(data?.data?.data) &&
          data?.data?.data?.length != 0
        ) {
          setSnapShots((prv) => prv.concat(data?.data?.data));
        } else {
          setPageError(true);
        }
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }
        setPageError(true);
        setPageLoading(false);
        dispatch(enableSnackBar());
      }
    }
  }, [user?._id, currentUser, pageError, pageNumber, snapShots, pageLoading]);

  //getting Portfolio
  const getPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      let data = await fetchUserWork({
        page: 1,
        page_size: 20,
        user_id: user?._id,
      });
      setPageNumber(1);
      setLoading(false);

      if (data?.data?.statusCode == 200) {
        setPortfolioList(data?.data?.data);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setLoading(false);
      dispatch(enableSnackBar());
    }
  }, [user?._id, currentUser]);

  //getting loadMorePortfolio
  const loadMorePortfolio = useCallback(async () => {
    try {
      if (!pageLoading && !pageError && portfolioList?.length != 0) {
        setPageLoading(true);
        let data = await fetchUserWork({
          page: pageNumber + 1,
          page_size: 20,
          user_id: user?._id,
        });
        setPageLoading(false);

        setPageNumber(pageNumber + 1);
        if (
          data?.data?.statusCode == 200 &&
          Array.isArray(data?.data?.data) &&
          data?.data?.data?.length != 0
        ) {
          setPortfolioList((prv) => prv.concat(data?.data?.data));
        } else {
          setPageError(true);
        }
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setPageError(false);
      setPageLoading(false);
    }
  }, [
    user?._id,
    currentUser,
    pageError,
    pageNumber,
    setPageNumber,
    setPageError,
    portfolioList,
    pageLoading
  ]);

  //renderItem for Portfolio
  const renderItem = useCallback(
    ({ item, i }) => {
      if (selectedTabIndex == 1)
        return (
          <Snapshots currentUser={currentUser} key={i} index={i} item={item} />
        );
      else if (selectedTabIndex == 2)
        return (
          <Portfolio index={i} currentUser={currentUser} key={i} item={item} />
        );
      else if (selectedTabIndex == 0)
        return <About currentUser={currentUser} {...user} key={i} />;
      else return <></>;
    },
    [selectedTabIndex, user, currentUser, loading]
  );

  const onEndReach = () => {
    if (selectedTabIndex == 1) loadMoreSnapShot();
    else if (selectedTabIndex == 2) loadMorePortfolio();
  };

  //getting snapshot
  const getFollowStatus = useCallback(async () => {
    try {
      let data = await followStatus({
        current_user_id: myProfile?._id,
        profile_user_id: user?._id,
      });

      if (data?.data?.statusCode == 200) {
        setFollowBack(data.data.data.follow_back);
        toggleFollow(data.data.data.is_following);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(enableSnackBar());
    }
  }, [user?._id, myProfile?._id, currentUser]);

  const onclickChat = useCallback(async () => {
    try {
      setChatLoading(true);
      let data = await checkAlreadyConnected({
        recipient_id: otherUser._id,
        sender_id: myProfile._id,
        make_connection: false,
      });

      if (data?.data?.statusCode == 200) {
        navigation.navigate("Chat", {
          friend: user,
          user: myProfile,
          back: true,
        });
      } else {
        navigation.navigate("ConnectedRequest", {
          user: user,
          alreadyRequestSend: data?.data?.statusCode == 501 ? true : false,
        });
      }
      setChatLoading(false);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(enableSnackBar());
      setChatLoading(false);
    }
  }, [
    otherUser?._id,
    myProfile?._id,
    currentUser,
    isFollow,
    setFollowLoading,
    myProfile,
    user,
  ]);

  const onCLickFollowUser = useCallback(async () => {
    if (isFromDeepLink) {
      navigation.navigate("Register");
      return;
    }

    try {
      setFollowLoading(true);
      let data = await followUser({
        user_id: user?._id,
        follower_id: myProfile._id,
        unfollow: isFollow,
      });

      setFollowLoading(false);
      if (data?.data?.statusCode == 200 || data?.data?.statusCode == 412) {
        toggleFollow((prv) => !prv);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(enableSnackBar());
      setFollowLoading(false);
    }
  }, [user?._id, myProfile?._id, currentUser, isFollow, setFollowLoading]);

  const onBlockUser = useCallback(async () => {
    try {
      setShowAlert(false);
      dispatch(enableLoading());
      await blockUser({
        user_id: myProfile._id,
        blocked_user_id: user?._id,
      });

      navigation.goBack();
      dispatch(disableLoading());
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(disableLoading());
      dispatch(enableSnackBar());
    }
  }, [user?._id, myProfile?._id, currentUser, navigation, dispatch]);

  const onReportUser = useCallback(
    async (id) => {
      try {
        bottomSheetRef?.current.snapTo(1);
        setShowAlert(false);
        dispatch(enableLoading());
        await reportUser({
          reported_by_id: myProfile._id,
          reported_user_id: user?._id,
          report_option: id,
        });

        navigation.goBack();
        dispatch(disableLoading());
      } catch (error) {
        dispatch(disableLoading());

        navigation.goBack();
      }
    },
    [user?._id, myProfile?._id, currentUser, navigation, bottomSheetRef]
  );

  const onNavigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const onNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <View style={styles.padding}>
          <ProfileHeader {...user} />

          {currentUser ? (
            <TouchableOpacity
              onPress={onNavigateToEditProfile}
              style={styles.button}
            >
              <Text style={styles.buttonText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <PrimaryButton
                testID="onFollowUserPrimary"
                key="isFollow"
                style={
                  !isFollow
                    ? styles.button
                    : followBack
                    ? styles.followingBackButton
                    : styles.followingButton
                }
                styleText={
                  !isFollow
                    ? styles.buttonText
                    : followBack
                    ? styles.followingBackButtonText
                    : styles.followingButtonText
                }
                buttonTitle={
                  followBack && isFollow
                    ? "Connected"
                    : isFollow
                    ? "Following"
                    : followBack
                    ? "Follow Back"
                    : "Follow"
                }
                loading={followLoading}
                onPress={onCLickFollowUser}
                disabled={isFollow}
              />
              {isFollow && followBack && (
                <PrimaryButton
                  testID="onChatPrimaryButton"
                  key="chat"
                  style={[styles.button, { width: widthPercentageToDP(20) }]}
                  styleText={styles.buttonText}
                  buttonTitle={"Chat"}
                  loading={chatLoading}
                  onPress={onclickChat}
                />
              )}
            </View>
          )}
        </View>
        <TopBar
          testID="TopBar"
          index={selectedTabIndex}
          onChangeTab={setSelectedTabIndex}
        />
      </>
    );
  }, [
    user,
    selectedTabIndex,
    setSelectedTabIndex,
    isFollow,
    followLoading,
    followBack,
    chatLoading,
    currentUser,
  ]);

  const ListFooter = useCallback(() => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        {pageLoading && <ActivityIndicator size={"small"} color={iconColor} />}
      </View>
    );
  }, [pageLoading]);
  const ListEmptyComponent = useCallback(() => {
    if (!loading && selectedTabIndex == 1) {
      return (
        <EmptyProfile
          heading="EMPTY SNAPSHOTS"
          description="Add your first snapshot!"
        />
      );
    } else if (!loading && selectedTabIndex == 2) {
      return (
        <EmptyProfile
          heading="EMPTY PORTFOLIO"
          description="Add your first artwork to start your portfolio!"
        />
      );
    } else {
      return <View></View>;
    }
  }, [loading, selectedTabIndex]);

  return (
    <>
      <MenuProvider>
        <View style={styles.container}>
          {currentUser ? (
            <MainHeader heading="My Profile" />
          ) : (
            <BackHeader
              isLoggedIn={isLoggedIn}
              title={"Block " + user?.full_name + "?"}
              onAcceptTitle={"Block"}
              onRejectTitle={"Cancel"}
              Option1={"Block"}
              Option2={"Report"}
              message={
                "They won’t be able to message you or find your profile or contents on Cohart. They won’t be notified that you blocked them"
              }
              showAlert={showAlert}
              onSelectOption1={() => setShowAlert(true)}
              onSelectOption2={() => {
                bottomSheetRef?.current?.snapTo(0);
              }}
            />
          )}
          <MasonryList
            testID={"ProfileScreenList"}
            data={
              selectedTabIndex == 1
                ? snapShots
                : selectedTabIndex == 2
                ? portfolioList
                : [0]
            }
            refreshing={loading}
            onRefresh={onRefresh}
            renderItem={renderItem}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={
              selectedTabIndex == 1 ? 3 : selectedTabIndex == 2 ? 2 : 1
            }
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
            //  stickyHeaderIndices={[1]}
            style={styles.container}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooter()}
          ></MasonryList>
        </View>
      </MenuProvider>
      <Alert
        testID={"Alert"}
        title={"Block " + user?.full_name + "?"}
        visible={showAlert}
        message={
          "They won’t be able to message you or find your profile or contents on Cohart. They won’t be notified that you blocked them"
        }
        onAcceptTitle={"Block"}
        onRejectTitle={"Cancel"}
        onAcceptColor={"red"}
        onRejectColor={"red"}
        onReject={() => setShowAlert(false)}
        onAccept={onBlockUser}
      />
      <ReportBottomSheet
        testID="ReportBottomSheet"
        onPresSubmit={onReportUser}
        bottomSheetRef={bottomSheetRef}
      />

      {!isLoggedIn && (
        <BottomTab
          onPress={onNavigateToRegister}
          isNavRoot={false}
          isFirstTimeLogin={false}
          isAcceptGuideLines={false}
        />
      )}
    </>
  );
};

export default React.memo(ProfileScreen);