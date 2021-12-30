import { useIsFocused, useNavigation } from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import dummyAvator from "assets/dummyAvator.png";
import { GlowIcon, StartIcon } from "components/Icons";
import { getPostDetail } from "services/getPostDetail";
import onSavePost from "services/onSavePost";
import ApiConfig from "config/api-config";
import { iconColor, primary, textColor } from "config/colors";
import AppStateTypes from "models/reducers";
import { Posts } from "models/types";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Image from "react-native-fast-image";
import Video from "react-native-fast-video";
import Swipeable from "react-native-gesture-handler/Swipeable";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
// import Share from 'react-native-share';
import Entypo from "react-native-vector-icons/Entypo";
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import CommunityModel from "screens/Discover/components/CommunityModel";
import Friends from "screens/Friends";
import { apiClient } from "services/client";
import SentRequest from "services/sentRequest";
import updatePostGlowCount from "services/updatePostGlowCount";
import { disableLoading, enableLoading } from "store/actions/loadingActions";
import { enableSnackBar } from "store/actions/snackBarAction";
import { VolumeIcon } from "utils/icons";

import { AppText } from "./text";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const VideoPost = React.forwardRef(
  (
    props: ViewProps & {
      post: Posts;
      toggleCommunityModel?: (value: boolean) => void;
      setAcceptGuideLines?: (value: boolean) => void;
      isAcceptGuideLines?: boolean;
      isCommunityModalVisible?: boolean;
      index?: number;
      currentIndex?: number;
      isPreview?: boolean;
      toggleHeader?: (value: boolean) => void;
      isScrolling: boolean;
      onSearch: () => void;
      allPosts: object[];
      setAllPosts: (data: object[]) => void;
      notShowUserData: boolean;
      from: string;
    },
    ref
  ) => {
    const videoRef = useRef();
    const navigation = useNavigation();
    const userID = useSelector((state: AppStateTypes) => state.user._id);
    const dispatch = useDispatch();
    const swipeRow = useRef();
    const [showGlowStar, setShowGlowStar] = useState(false);
    const currentUser = useSelector((state: AppStateTypes) => state.user);

    const isAcceptGuideLine: boolean = useSelector(
      (state: AppStateTypes) => state.user.isAcceptGuideLines
    );
    const [isAcceptGuideLines, setAcceptGuideLine] =
      useState(isAcceptGuideLine);
    const {
      _id,
      post_file,
      description,
      created_by,
      post_type,
      jw_media_url = null,
      jw_media_thumb = null,
    } = props.post;
    // TODO: handle autoplay and muting on mobile web
    const [isMuted, setIsMuted] = useState(false);
    const [isPause, togglePause] = useState(true);
    const [loading, setLoading] = useState(
      post_type === "video" ? true : false
    );
    const [isSaved, setSetIsSaved] = useState(false);

    const [isGlow, setIsGlow] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isConnectedUser, setConnectedUser] = useState("");
    const isFocused = useIsFocused();
    const { from = "" } = props;
    // TODO-is error is not used so mark as the console.log and it will be removed in later

    useImperativeHandle(ref, () => ({
      play() {
        if (isFocused) {
          videoRef?.current?.seek(0);
          togglePause(false);
        }
      },
      pause() {
        togglePause(true);
      },
      back() {
        goBack();
      },
    }));
    useEffect(() => {
      if (!isFocused) {
        setIsGlow(false);
        setSetIsSaved(false);
        togglePause(true);
      } else if (isFocused) {
        if (from == "featureSnapshot") {
          setSetIsSaved(true);
        }
        getPostDetailApi();
      }
      return () => {
        setIsGlow(false);
        togglePause(true);
        setIsGlow(false);
      };
    }, [isFocused]);
    const updateGlowCount = useCallback(async () => {
      try {
        setIsGlow(true);
        setShowGlowStar(true);
        setTimeout(() => {
          setShowGlowStar(false);
        }, 2500);
        const data = {
          user_id: userID,
          post_id: _id,
        };
        await updatePostGlowCount(data);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }
        // TODO handle exception error
      }
    }, [userID, _id]);
    const onCLickSavePost = useCallback(() => {
      let is_saved = from == "featureSnapshot" ? !isSaved : true;
      try {
        setSetIsSaved(is_saved);

        const data = {
          is_featured: is_saved,
          post_id: _id,
        };
        onSavePost(data).then((response) => {
          if (response.data.statusCode !== 200) {
            setSetIsSaved(false);
            alert("Not Allowed feature Snapshot limit reached");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }, [userID, _id, isSaved]);

    useEffect(() => {
      if (props.isPreview) {
        togglePause(false);
      } else {
        togglePause(true);
      }
      return () => {
        togglePause(true);
      };
    }, [props.isPreview, isFocused]);
    const sentUserRequest = useCallback(async () => {
      try {
        dispatch(enableLoading());
        const data = {
          sender_id: userID,
          recipient_id: created_by._id,
        };
        await SentRequest(data);
        dispatch(disableLoading());
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        } else {
          dispatch(enableSnackBar());
        }
        dispatch(disableLoading());
      }
    }, [userID, created_by, dispatch]);

    useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);

      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    }, []);

    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState !== "active") {
        togglePause(true);
      }
    };
    const errorHandler = (error: any) => {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      } else {
        dispatch(enableSnackBar());
      }
      dispatch(disableLoading());
    };
    const checkAllReadyConnected = useCallback(() => {
      try {
        dispatch(enableLoading());
        const data = {
          sender_id: userID,
          recipient_id: created_by._id,
          make_connection: true,
        };
        apiClient
          .post(ApiConfig.CHECK_IS_CONNECTED, data)
          .then((response) => {
            dispatch(disableLoading());
            if (
              response.data.statusCode === 502 ||
              response.data.statusCode == 404
            ) {
              sentUserRequest();
            } else if (response.data.statusCode === 501) {
              setConnectedUser("pending");
            } else if (response.data.statusCode === 200) {
              setConnectedUser("connected");
            } else {
              dispatch(disableLoading());
              dispatch(enableSnackBar());
            }
          })
          .catch((error: any) => {
            errorHandler(error);
          });
      } catch (error: any) {
        errorHandler(error);
      }
    }, [userID, created_by, dispatch, dispatch, sentUserRequest, errorHandler]);

    const goBack = () => {
      if (swipeRow.current.close) {
        swipeRow.current.close();
      }
    };
    const renderLeftActions = useCallback(() => {
      if (!props.isPreview) {
        if (isAcceptGuideLine) {
          return (
            <Friends
              isConnectedUser={isConnectedUser}
              goBack={goBack}
              user={created_by}
              style={props.style}
            />
          );
        } else {
          return (
            <CommunityModel
              isModalVisible={isAcceptGuideLines}
              toggleModal={() => {
                if (swipeRow.current.close) {
                  swipeRow.current.close();
                }
              }}
              acceptGuideLines={() => {
                if (swipeRow.current) {
                  analytics.track("Guidelines_accepted", {});
                  onSwipeLeftOpen();
                  setAcceptGuideLine(true);
                  setTimeout(() => {
                    swipeRow.current.openLeft();
                  }, 300);
                }
              }}
              isAcceptGuideLines={isAcceptGuideLines}
            />
          );
        }
      }
    }, [
      props.isPreview,
      isAcceptGuideLines,
      isConnectedUser,
      goBack,
      created_by,
      props.style,
    ]);

    const onSwipeRight = () => {
      if (!props.isPreview) {
        analytics.track("Swiped_right_to_add_user", {
          user_id: props.post.user_id,
          post_id: props.post._id,
          post_description: props.post.description,
          post_tags: props.post.tags,
          post_title: props.post.title,
        });
        togglePause(true);
      }
    };
    const onSwipeLeftOpen = () => {
      if (!props.isPreview && isAcceptGuideLines) {
        analytics.track("Swiped_left_to_discover_feed", {});
        togglePause(true);
        checkAllReadyConnected();
      }
    };
    const getPostDetailApi = async () => {
      try {
        let response = await getPostDetail({
          user_id: userID,
          post_id: _id,
        });
        if (response.data.statusCode === 200) {
          setIsGlow(response?.data?.data?.glow_by_current_user ? true : false);
          // dispatch(enableSnackBar();
        }
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }
        dispatch(enableSnackBar());
      }
    };
    // const renderRightActions = useCallback(() => {
    //   if (!props.isPreview) {
    //     return (
    //       <AlertScreen
    //         userData={created_by}
    //         setData={props.setAllPosts}
    //         style={styles.imageStyle}
    //         data={props.allPosts}
    //       />
    //     );
    //   } else {
    //     return null;
    //   }
    // }, [props.isPreview]);
    return (
      <Swipeable
        forwardedRef={ref}
        ref={swipeRow}
        onSwipeableWillClose={() => {
          if (props.toggleHeader) {
            props.toggleHeader(true);
          }
        }}
        onSwipeableWillOpen={onSwipeRight}
        onSwipeableLeftOpen={onSwipeLeftOpen}
        renderLeftActions={renderLeftActions}
      //renderRightActions = { renderRightActions }
      >
        <Pressable
          delayLongPress={100}
          onPressIn={() => {
            togglePause((prv) => !prv);
          }}
          style={[styles.container, props.style]}
        >
          {/* {isError && (
            <View style={styles.playButtonView}>
              <Text style={{ color: 'red', fontSize: 18 }}>! unavailable</Text>
            </View>
          )} */}
          {!loading && isPause && post_type === "video" && (
            <View style={styles.playButtonView}>
              <Ionicons
                onPress={() => {
                  if (post_type === "video") {
                    togglePause((prv) => !prv);
                  }
                }}
                name="play-outline"
                size={80}
                color={"#efdede"}
              />
            </View>
          )}

          {isBuffering || loading ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color={textColor} />
            </View>
          ) : null}

          {post_type === "video" ? (
            <Video
              id={_id}
              muted={isMuted}
              paused={!loading && !isPause ? false : true}
              automaticallyWaitsToMinimizeStalling={false}
              ignoreSilentSwitch={"ignore"}
              ref={videoRef}
              resizeMode="contain"
              disableFocus={false}
              allowsExternalPlayback={false}
              pictureInPicture={false}
              poster={jw_media_thumb}
              playInBackground={false}
              // poster={Poster}
              playWhenInactive={true}
              repeat
              controls={false}
              minLoadRetryCount={3}
              onLoadStart={() => {
                setLoading(true);
              }}
              onReadyForDisplay={() => {
                setLoading(false);
              }}
              onLoad={() => {
                if (Platform.OS === "android") {
                  setLoading(false);
                }
              }}
              onError={(error: any) => {
                // setLoading(false);
                // alert(JSON.stringify(error));
                console.log(error);
                setIsBuffering(false);

                togglePause(true);
              }}
              style={[styles.imageStyle, props.style]}
              source={{
                uri: jw_media_url ? jw_media_url : post_file,
              }}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={[styles.imageStyle, props.style]}
              source={{ uri: post_file }}
            />
          )}
        </Pressable>
        {!props.notShowUserData && (
          <>
            <LinearGradient
              colors={[
                "transparent",
                "transparent",
                "rgba(0,0,0,0.5)",
                "rgba(0,0,0,0.7)",
                "rgba(0,0,0,1)",
              ]}
              style={styles.bottomView}
            >
              <View style={styles.headingView}>
                <View
                  style={styles.headingView2}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("MyProfile", {
                        user: created_by,
                        userType: "",
                      });
                    }}
                  >
                    <Image
                      source={
                        created_by?.cover_image
                          ? { uri: created_by?.cover_image }
                          : dummyAvator
                      }
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: 10,
                      justifyContent: "center",
                    }}
                  >
                    <AppText style={styles.heading}>
                      {created_by?.first_name + " " + created_by?.last_name}
                    </AppText>
                    <AppText
                      numberOfLines={1}
                      style={styles.locationText}
                    >
                      <Entypo
                        name="location-pin"
                        size={widthPercentageToDP("3.5")}
                        color="white"
                      />
                      {created_by?.location}
                    </AppText>
                  </View>
</View>
                <View>
                  {currentUser.is_admin && (
                    <View style={styles.iconView}>
                      <TouchableOpacity
                        disabled={
                          from != "featureSnapshot" && isSaved ? true : false
                        }
                        onPress={onCLickSavePost}
                        style={[
                          styles.icon,
                          {
                            borderColor: isSaved ? primary : "white",
                          },
                        ]}
                      >
                        <StartIcon color={isSaved ? primary : "#E5E5E5"} />
                      </TouchableOpacity>
                    </View>
                  )}
                  {post_type === "video" && (
                    <View style={styles.iconView}>
                      <TouchableOpacity
                        onPress={() => {
                          if (isMuted) {
                            setIsMuted(false);
                          } else {
                            setIsMuted(true);
                          }
                        }}
                        style={styles.icon}
                      >
                        <VolumeIcon width={22} height={22} strokeWidth={0.6} />
                        {isMuted && <View style={styles.isMuted} />}
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.iconView}>
                    <TouchableOpacity
                      disabled={isGlow ? true : false}
                      onPress={updateGlowCount}
                      style={[
                        styles.icon,
                        {
                          borderColor: isGlow ? primary : "white",
                        },
                      ]}
                    >
                      <GlowIcon color={isGlow ? primary : "#E5E5E5"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {description ? (
                <AppText
                  numberOfLines={2}
                  style={styles.bottomDescription}

                >
                  {description}
                </AppText>
              ) : null}
            </LinearGradient>

            <Modal
              animationInTiming={500}
              animationOutTiming={1000}
              transparent={true}
              visible={showGlowStar}
            >
              <View
                style={[
                  props.style,
                  {
                    marginTop: heightPercentageToDP(3),
                  },
                ]}
              >
                <Image
                  style={{
                    alignSelf: "flex-end",
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                  source={require("../assets/glow/glow.gif")}
                />
              </View>
            </Modal>
          </>
        )
        }
      </Swipeable >
    );
  }
);

const VideoPostComponent = React.memo(VideoPost);

export default VideoPostComponent;

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: iconColor },
  locationText: {
    color: textColor, fontSize: 12
  },
  playButtonView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  videStyle: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    position: "absolute",
    width: "100%",
    bottom: 5,
  },
  containerView: {},
  descriptionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 16,
    backgroundColor: iconColor,
    opacity: 0.5,
    borderRadius: 6,
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: textColor,
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 9999,
  },
  isMuted: {
    width: 36,
    height: 1.5,
    backgroundColor: textColor,
    position: "absolute",
    transform: [{ rotate: "45deg" }],
  },
  headingView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: heightPercentageToDP("1"),
  },
  headingView2: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 55,
  },
  heading: {
    color: textColor,
    fontSize: widthPercentageToDP("4.4"),
  },
  imageView: { alignItems: "flex-end" },
  image: {
    width: 45,
    height: 45,
    borderRadius: 9999,
    marginBottom: -12,
    borderWidth: 1,
    borderColor: textColor,
    alignSelf: "flex-end",
  },
  bottomView: {
    position: "absolute",
    // backgroundColor: 'yellow',
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    bottom: 0,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 55,
  },
  bottomDescription: {
    color: textColor,
    fontSize: widthPercentageToDP("3"),
    paddingBottom: 28

  },

  location: { color: textColor, fontSize: 12 },
});
