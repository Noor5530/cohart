import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import dummyAvator from "assets/dummyAvator.png";
import AutoScrollView from "components/autoScroll";
import Header from "components/Header";
import { ArrowLeftIcon, ArrowRightIcon, ChatIcon } from "components/Icons";
import { AccentText, AppText } from "components/text";
import ApiConfig from "config/api-config";
import AppStateTypes from "models/reducers";
import { StackScreen } from "navigation/types";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ImageBackground,
  Linking,
  RefreshControl,
  Text as ReactText,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar } from "react-native-paper";
import Animated from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "services/client";
import { fetchUserWork as fetchUserWorks } from "services/fetchUserWork";
import { getUserInformation } from "services/getUserInformation";
import { getUserPost } from "services/getUserPost";
import SentRequest from "services/sentRequest";
import {
  getAcceptPendingRequest,
  rejectPendingRequest,
} from "store/actions/appAction";
import {
  disableAppLoading,
  enableAppLoading,
} from "store/actions/loadingActions";
import { Post } from "utils/stores";
import { LogOutRequestEnum } from "models/actions/user";
import { UserAffiliations } from "./components/Affliations";
import { MeetMeAtOtherUser as MeetMeAt } from "./components/MeetMeAtEditior";
import Portfolio from "./components/Portfolio";
import Posts from "./components/Post";
import TitleStump from "./components/TitleStump";
import styles from "./style";
import { logOutRequest } from "../../store/actions/userActions";

export const UserProfile: StackScreen<"Base", {}> = () => {
  const currentUserID = useSelector((state: AppStateTypes) => state.user._id);
  const currentUser = useSelector((state: AppStateTypes) => state.user);
  const isAppLoading = useSelector(
    (state: AppStateTypes) => state.loading.isAppLoading
  );

  const isFocused = useIsFocused();
  const [portfolio, setPortfolio] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(true);
  const [isConnectedUser, setConnectedUser] = useState("notConnected");

  // TODO log is request send since it is not used and will be removed
  console.log("isRequestSent", isRequestSent);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const { user: userID, userType = "", user_connection_id = "" } = route.params;
  const [user, setUser] = useState(null);
  const fetchPost = async () => {
    try {
      setLoading(true);
      let data = await getUserPost({
        start_page: 1,
        user_id: userID._id,
      });
      if (data?.data?.statusCode === 200 && Array.isArray(data?.data?.data)) {
        setPosts(data?.data.data);
      } else {
        setPosts([]);
      }
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setLoading(false);
    }
  };
  const fetchUserWork = async () => {
    try {
      setLoading(true);
      let data = await fetchUserWorks({
        start_page: 1,
        user_id: userID._id,
      });
      if (data.data.statusCode == 200 && Array.isArray(data.data.data)) {
        setPortfolio(data.data.data);
      }
      setLoading(false);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setLoading(false);
    }
  };
  const errorHandler = (error: any) => {
    if (error?.response?.status == 401) {
      dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
    }
  };
  const checkAllReadyConnected = useCallback(() => {
    try {
      setLoading(true);

      const data = {
        sender_id: currentUserID,
        recipient_id: userID._id,
        make_connection: false,
      };
      apiClient
        .post(ApiConfig.CHECK_IS_CONNECTED, data)
        .then((response) => {
          setLoading(false);
          console.log(
            "response.data.statusCode ",
            data,
            response.data.statusCode
          );

          if (
            response.data.statusCode === 502 ||
            response.data.statusCode == 404
          ) {
            console.log("setConnectedUser('null')", isConnectedUser);
            setConnectedUser("notConnected");

            setIsRequestSent(false);
          } else if (response.data.statusCode === 501) {
            setConnectedUser("pending");
            console.log("setConnectedUser('pending')", isConnectedUser);
          } else if (response.data.statusCode === 200) {
            setConnectedUser("connected");
            console.log("setConnectedUser('connected')");

            setIsFriend(true);
          } else {
            setConnectedUser("");

            setLoading(false);
          }
        })
        .catch((error: any) => {
          errorHandler(error);
          setLoading(false);
        });
    } catch (error) {
      errorHandler(error);

      setLoading(false);
    }
  }, [userID, currentUserID]);
  const sentUserRequest = async (userdata) => {
    try {
      if (!isFriend && isConnectedUser != "pending") {
        dispatch(enableAppLoading());
        const data = {
          sender_id: currentUserID,
          recipient_id: userID._id,
        };
        let response = await SentRequest(data);
        dispatch(disableAppLoading());
        if (response?.data.statusCode === 200) {
          setIsRequestSent(true);
          if (response?.data?.body?.connect_status == "Already connected") {
            setIsFriend(true);
            setConnectedUser("connected");
            navigation.navigate("SendRequest", {
              user: userdata,
              isConnectedUser: "connected",
            });
          } else {
            setConnectedUser("");

            navigation.navigate("SendRequest", {
              user: userdata,
              isConnectedUser: "",
            });
          }
        } else if (
          response.data.statusCode === 400 &&
          response.data.data == "Your request already sent"
        ) {
          setConnectedUser("pending");

          navigation.navigate("SendRequest", {
            user: userdata,
            isConnectedUser: "pending",
          });
        }
      } else {
        navigation.navigate("SendRequest", {
          user: userdata,
          isConnectedUser: isConnectedUser,
        });
      }
    } catch (error: any) {
      dispatch(disableAppLoading());
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
    }
  };

  const fetchUserInformation = async () => {
    try {
      dispatch(enableAppLoading());
      let response = await getUserInformation({
        id: userID._id,
      });
      console.log("services/getUserInformation", response);

      if (response.data.statusCode === 200) {
        setUser(response?.data?.data);
      }
      dispatch(disableAppLoading());
    } catch (error: any) {
      console.log('error', error);

      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(disableAppLoading());
    }
  };
  useEffect(() => {
    return () => {
      setConnectedUser("notConnected");
    };
  }, []);
  const onRefresh = () => {
    setConnectedUser("notConnected");

    setPosts([]);
    setPortfolio([]);
    setUser(null);
    setIsFriend(false);
    checkAllReadyConnected();
    fetchUserWork();
    fetchPost();
    fetchUserInformation();
  };

  useLayoutEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, userID?._id]);

  const openPost = (post: Post) => {
    const data = { ...post };
    data.created_by = user;

    navigation.navigate("NewPostPreview", { post: data, back: true });
  };
  return (
    <View style={styles.userProfileContainer}>
      <Header
        back={true}
        color="black"
        textColor="black"
        //   style={styles.userProfileHeader}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading || isAppLoading ? true : false}
            onRefresh={onRefresh}
          />
        }
      >
        {/* header */}
        <ImageBackground
          source={
            user?.background_image && user?.background_image !== ""
              ? { uri: user?.background_image }
              : require("../../assets/stefano-bg.png")
          }
          style={styles.imageBackGround}
        >
          {isFriend && (
            <TouchableOpacity
              onPress={() => {
                analytics.track("Opened_chat", {
                  friend: user,
                  user: currentUser,
                });
                navigation.navigate("Chat", {
                  friend: user,
                  user: currentUser,
                  back: true,
                });
              }}
              style={styles.isFriendChatText}
            >
              <ChatIcon />
            </TouchableOpacity>
          )}

          {!isFriend && !loading && (
            <TouchableOpacity
              onPress={() => sentUserRequest(user)}
              style={styles.plusArea}
            >
              <AntDesign name="plus" size={20} color="black" />
            </TouchableOpacity>
          )}
        </ImageBackground>
        {/* interests */}

        {user?.tags && (
          <AutoScrollView
            //ref={scrollViewRef}
            // horizontal
            style={styles.autoScrollView}
          >
            <View style={{ flexDirection: "row" }}>
              {user?.tags &&
                user?.tags?.split(",").map((tag) => (
                  <AccentText
                    key={tag}
                    numberOfLines={1}
                    style={styles.userTags}
                  >
                    + {tag}
                  </AccentText>
                ))}
            </View>
          </AutoScrollView>
        )}
        <View style={styles.profileBadgeArea}>
          <View style={styles.nameArea}>
            <Animated.View style={[styles.animatedView]}>
              <TitleStump
                style={styles.profileBadge}
                text={
                  user?.title_stamp == 1
                    ? "PARTNER ORGANIZATON"
                    : user?.title_stamp == 2
                    ? "VERIFIED USER"
                    : user?.title_stamp == 3
                    ? "EARLY ADOPTER"
                    : user?.title_stamp == 4
                    ? " COHART-ER"
                    : user?.title_stamp == 4
                    ? " ADVISOR"
                    : user?.title_stamp == 5
                    ? "COCOISTA"
                    : "EARLY ADOPTER"
                }
              />
            </Animated.View>

            <ReactText style={styles.nameText}>{user?.full_name}</ReactText>
            <Avatar.Image
              style={styles.nameAreaAvator}
              size={wp("20")}
              source={
                user?.cover_image ? { uri: user?.cover_image } : dummyAvator
              }
            />
          </View>
          <View style={styles.userArea}>
            <View style={{ flex: 1 }}>
              {user?.username ? (
                <ReactText style={styles.userText}>@{user?.username}</ReactText>
              ) : (
                <View />
              )}
              <ReactText style={styles.locationText}>
                {user?.location}
              </ReactText>
            </View>
          </View>
        </View>

        {/* posts */}

        {user?.post_view && posts?.length !== 0 ? (
          <View style={styles.postArea}>
            <TouchableOpacity style={styles.postAreaTouch}>
              <AppText bold style={{ textTransform: "uppercase" }}>
                Snapshots
              </AppText>
            </TouchableOpacity>
          </View>
        ) : null}
        {user?.post_view && posts?.length !== 0 ? (
          <Posts
            openPost={openPost}
            userData={user}
            posts={posts}
            style={{ height: 160 }}
          />
        ) : null}
        {user?.bio_view && user?.bio && user?.bio !== "" ? (
          <View style={styles.bioArea}>
            <AppText bold style={styles.textUpperCase}>
              Bio
            </AppText>
          </View>
        ) : null}
        {user?.bio_view && user?.bio && user?.bio !== "" ? (
          <View style={styles.userBioArea}>
            <AppText style={{ textAlign: "justify" }}>{user?.bio}</AppText>
          </View>
        ) : null}
        {/* portfolio */}
        {user?.portfolio_view && portfolio?.length !== 0 ? (
          <View style={styles.portfolioArea}>
            <View style={styles.portfolioAreaInner}>
              <AppText bold style={styles.textUpperCase}>
                ArtWork
              </AppText>
            </View>
          </View>
        ) : null}
        {user?.portfolio_view && portfolio?.length !== 0 ? (
          <Portfolio
            userData={user}
            style={{ height: 160 }}
            items={portfolio}
          />
        ) : null}
        {/* bottom info */}
        <View style={styles.bottomContainer}>
          {user?.meet_me_at_view &&
          user?.meet_me_at &&
          user?.meet_me_at !== "" ? (
            <View style={styles.bottomContainerArea}>
              <AppText bold style={styles.textUpperCase}>
                You might have met me at:
              </AppText>
            </View>
          ) : null}
          {user?.meet_me_at_view &&
          user?.meet_me_at &&
          user?.meet_me_at !== "" ? (
            <MeetMeAt data={user?.meet_me_at ? user?.meet_me_at : ""} />
          ) : null}
          <View style={styles.meetMeArea}>
            {user?.last_spotted_view &&
            user?.last_spotted &&
            user?.last_spotted !== "" ? (
              <View style={styles.meetMeAreaInner}>
                <View style={styles.meetMeAreaInnerText}>
                  <AppText bold style={styles.textUpperCase}>
                    Last Spotted At:
                  </AppText>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <AppText
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingHorizontal: 7,
                        paddingVertical: 3,
                      }}
                    >
                      {user?.last_spotted}
                    </AppText>
                  </View>
                </View>
              </View>
            ) : null}
            {user?.currently_view &&
            user?.currently &&
            user?.currently !== "" ? (
              <View style={styles.currentlyViewContainer}>
                <View style={styles.currentlyViewArea}>
                  <AppText bold style={styles.textUpperCase}>
                    Currently:
                  </AppText>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <AppText
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingHorizontal: 7,
                      paddingVertical: 3,
                    }}
                  >
                    {user?.currently}
                  </AppText>
                </View>
              </View>
            ) : null}
          </View>
          {user?.affliation_view &&
          user?.affiliations &&
          user?.affiliations !== "" ? (
            <View style={[styles.affliationView, { marginTop: 32 }]}>
              <AppText bold style={styles.textUpperCase}>
                Affiliations:
              </AppText>
            </View>
          ) : null}
          {user?.affliation_view &&
          user?.affiliations &&
          user?.affiliations !== "" ? (
            <UserAffiliations
              data={user?.affiliations ? user?.affiliations : ""}
            />
          ) : null}
        </View>
        <View style={styles.userAffiliations}>
          {user?.instagram && user?.instagram?.trim() !== "" ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.instagram.com/${user?.instagram?.trim()}`
                )
              }
            >
              <AccentText style={styles.linkText}>Instagram</AccentText>
            </TouchableOpacity>
          ) : null}
          {user?.instagram &&
          user?.instagram?.trim() !== "" &&
          user?.website &&
          user?.website?.trim() !== "" ? (
            <View style={styles.instagramArea} />
          ) : null}
          {user?.instagram &&
          user?.twitter &&
          user?.website &&
          user?.instagram?.trim() !== "" &&
          user?.twitter?.trim() !== "" &&
          user?.website?.trim() == "" ? (
            <View style={styles.instagramArea} />
          ) : null}
          {user?.website && user?.website?.trim() !== "" ? (
            <TouchableOpacity onPress={() => Linking.openURL(user?.website)}>
              <AccentText style={styles.linkText}>Website</AccentText>
            </TouchableOpacity>
          ) : null}
          {user?.website &&
          user?.twitter &&
          user?.website?.trim() !== "" &&
          user?.twitter?.trim() !== "" ? (
            <View style={styles.websiteView} />
          ) : null}
          {user?.website && user?.twitter?.trim() !== "" ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`http://twitter.com/${user?.twitter?.trim()}`)
              }
            >
              <AccentText style={styles.linkText}>Twitter</AccentText>
            </TouchableOpacity>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
      {!loading &&
      !isAppLoading &&
      userType == "pendingRequest" &&
      isConnectedUser == "notConnected" ? (
        <View style={styles.pendingRequestView}>
          <TouchableOpacity
            onPress={() => {
              analytics.track("Rejected_pending_request", {
                user_connection_id: user_connection_id,
              });
              dispatch(
                rejectPendingRequest({
                  user_connection_id: user_connection_id,
                })
              );
            }}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: "black",
              },
            ]}
          >
            <ArrowRightIcon />
            <ReactText
              style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}
            >
              PASS
            </ReactText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                getAcceptPendingRequest({
                  user_connection_id: user_connection_id,
                })
              );
            }}
            style={[styles.buttonContainer]}
          >
            <ReactText
              style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}
            >
              CONNECT
            </ReactText>
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>
      ) : !loading &&
        !isAppLoading &&
        userType == "pendingRequest" &&
        isConnectedUser == "connected" ? (
        <View
          style={[
            styles.pendingRequestView,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <TouchableOpacity style={[styles.buttonContainer]}>
            <ReactText
              style={[
                styles.buttonText,
                {
                  color: "white",
                },
              ]}
            >
              CONNECTED
            </ReactText>
          </TouchableOpacity>
        </View>
      ) : (
        !loading &&
        !isAppLoading &&
        userType == "pendingRequest" &&
        isConnectedUser == "" && (
          <View
            style={[
              styles.pendingRequestView,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <TouchableOpacity style={[styles.buttonContainer]}>
              <ReactText
                style={[
                  styles.buttonText,
                  {
                    color: "white",
                  },
                ]}
              >
                PASSED
              </ReactText>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
};

// TODO: make animated modal generic
