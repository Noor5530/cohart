import { useIsFocused, useNavigation } from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import dummyAvator from "assets/dummyAvator.png";
import { GlowIcon, StartIcon } from "components/Icons";
import { AppText } from "components/text";
import ApiConfig from "config/api-config";
import { iconColor, textColor } from "config/colors";
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
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Image from "react-native-fast-image";
import Swipeable from "react-native-gesture-handler/Swipeable";
import JWPlayer from "react-native-jw-media-player";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import Friends from "screens/Friends";
import { apiClient } from "services/client";
import SentRequest from "services/sentRequest";
import updatePostGlowCount from "services/updatePostGlowCount";
import { disableLoading, enableLoading } from "store/actions/loadingActions";
import { enableSnackBar } from "store/actions/snackBarAction";
import { VolumeIcon } from "utils/icons";
import branch from "react-native-branch";
import onSavePost from "services/onSavePost";
import Community from "./Community";

import { primary } from "../../../config/colors";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

import Config from "react-native-config";
//@ts-ignore
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
      isMuted: boolean;
      setIsMuted: (value: boolean) => void;
      isFirstLogin?: boolean;
      flatListHeight: number;
    },
    ref
  ) => {
    const navigation = useNavigation();
    const userID = useSelector((state: AppStateTypes) => state.user._id);
    const currentUser = useSelector((state: AppStateTypes) => state.user);

    const dispatch = useDispatch();
    const swipeRow = useRef();

    const { isAcceptGuideLines } = props;
    const {
      _id,
      post_file,
      description,
      created_by,
      post_type,
      jw_media_id = null,
      jw_media_url = null,
      jw_media_thumb = null,
      glow_by_current_user = false,
      title: post_title,
      is_featured = false,
    } = props.post;

    const {
      isMuted,
      isFirstLogin = false,
      setIsMuted = (value: any) => {
        console.log(value);
      },
    } = props;
    const [isPause, togglePause] = useState(true);
    const [loading, setLoading] = useState(
      post_type === "video" ? true : false
    );
    const [isGlow, setIsGlow] = useState(glow_by_current_user ? true : false);
    const [isSaved, setSetIsSaved] = useState(is_featured ? true : false);

    const [isBuffering, setIsBuffering] = useState(false);
    const [isConnectedUser, setConnectedUser] = useState("");
    const isFocused = useIsFocused();
    const [showGlowStar, setShowGlowStar] = useState(false);
    const jwpPlayerRef = useRef<JWPlayer>();
    useImperativeHandle(ref, () => ({
      async play() {
        if (props.isMuted) {
          jwpPlayerRef?.current?.setVolume(0);
        }
        if (isFocused) {
          jwpPlayerRef.current?.play();
          togglePause(false);
        }
      },
      pause() {
        togglePause(true);
        jwpPlayerRef.current?.pause();

        jwpPlayerRef.current?.stop();
      },
      back() {
        goBack();
      },
    }));

    useEffect(() => {
      if (props.isMuted) {
        jwpPlayerRef?.current?.setVolume(0);
      } else {
        jwpPlayerRef?.current?.setVolume(3);
      }
    }, [props.isMuted]);
    useEffect(() => {
      jwpPlayerRef?.current?.setControls(false);
    }, [jwpPlayerRef, _id]);
    useEffect(() => {
      return () => {
        jwpPlayerRef.current?.pause();
      };
    }, [isFocused]);

    const onClickSavedPost = useCallback(async () => {
      try {
        setSetIsSaved(true);

        const data = {
          is_featured: true,
          post_id: _id,
        };
        await onSavePost(data);
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }
      }
    }, [userID, _id]);

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
      }
    }, [userID, _id]);

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
        jwpPlayerRef.current?.pause();
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
              response.data.statusCode === 404
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
      } catch (error) {
        errorHandler(error);
      }
    }, [userID, created_by, dispatch, dispatch, sentUserRequest]);

    const goBack = () => {
      if (swipeRow.current.close) {
        swipeRow.current.close();
      }
    };
    const renderLeftActions = useCallback(() => {
      if (!props.isPreview) {
        if (isAcceptGuideLines) {
          return (
            <Friends
              isConnectedUser={isConnectedUser}
              goBack={goBack}
              user={created_by}
              style={props.style}
            />
          );
        } else {
          return <Community height={props.flatListHeight} />;
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
        setLoading(false);
        jwpPlayerRef.current?.pause();
      }
    };
    const onSwipeLeftOpen = () => {
      if (!props.isPreview && isAcceptGuideLines) {
        analytics.track("Swiped_left_to_discover_feed", {});
        jwpPlayerRef.current?.pause();
        setLoading(false);

        checkAllReadyConnected();
      }
    };

    const onSharePost = async (postId: string) => {
      if (isFirstLogin) {
        navigation.navigate("FirstLogin");
        return;
      }

      let branchUniversalObject = await branch.createBranchUniversalObject(
        "canonicalIdentifier",
        {
          locallyIndex: true,
          title: post_title,
          contentDescription: description,
          contentMetadata: {
            customMetadata: {
              postId,
            },
          },
        }
      );

      let shareOptions = {
        messageHeader: "Check this out",
        messageBody: "Check out this snapshot on Cohart!",
      };
      let linkProperties = {
        feature: "share",
        channel: "RNApp",
        tags: [postId],
      };
      let controlParams;

      if (Config.BUILD === "production") {
        controlParams = {
          $desktop_url: `https://web.cohart.co/posts/${postId}`,
          $ios_url: `https://web.cohart.co/posts/${postId}`,
          $android_url: `https://web.cohart.co/posts/${postId}`,
        };
      } else {
        controlParams = {
          $desktop_url: `https://staging.cohdev.co/posts/${postId}`,
          $ios_url: `https://staging.cohdev.co/posts/${postId}`,
          $android_url: `https://staging.cohdev.co/posts/${postId}`,
        };
      }

      await branchUniversalObject.showShareSheet(
        shareOptions,
        linkProperties,
        controlParams
      );
    };

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
      >
        <Pressable
          onPressIn={() => {
            if (isPause) {
              jwpPlayerRef.current.play();
              setIsBuffering(true);
              togglePause(false);
            } else {
              togglePause(true);
              jwpPlayerRef.current?.pause();
            }
          }}
          style={[styles.container, props.style]}
        >
          {loading || isBuffering ? (
            <View style={styles.loadingView}>
              <ActivityIndicator size="large" color={textColor} />
            </View>
          ) : null}
          {!loading && isPause && post_type === "video" && (
            <View style={styles.playButtonView}>
              <Ionicons
                onPress={() => {
                  if (isPause) {
                    jwpPlayerRef.current.play();
                    setIsBuffering(true);
                    togglePause(false);
                  } else {
                    togglePause(true);
                    jwpPlayerRef.current?.pause();
                  }
                }}
                name="play-outline"
                size={80}
                color={"#efdede"}
              />
            </View>
          )}
          {post_type === "video" && jw_media_url ? (
            //@ts-ignore
            <JWPlayer
              ref={jwpPlayerRef}
              onBeforePlay={() => {
                console.log("onBeforePlay");
              }}
              onTime={() => {
                if (isBuffering) {
                  setIsBuffering(false);
                }
              }}
              onBuffer={() => {
                setIsBuffering(true);
                console.log("onBuffer");
              }}
              style={[styles.imageStyle, props.style]}
              playlistItem={{
                mediaId: jw_media_id,
                file: jw_media_url,
                autostart: false,
                repeat: true,
                controls: false,
                stretching: "uniform",
                image: jw_media_thumb,
              }}
              onPlayerReady={() => {
                togglePause(true);
                setLoading(false);
              }}
              controls={false}
              stretching={"uniform"}
              nativeFullScreen={false}
              portraitOnExitFullScreen={false}
              landscapeOnFullScreen={false}
              fullScreenOnLandscape={false}
              onPlay={() => {
                togglePause(false);
              }}
              onPause={() => {
                togglePause(true);
              }}
              colors={{
                icons: "transparent",
              }}
              onComplete={() => {
                if (!isPause) {
                  jwpPlayerRef.current?.seekTo(0);
                }
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
            <View style={styles.headingView2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyProfile", {
                    user: created_by,
                    userType: "",
                    currentUser: created_by?._id == userID ? true : false,
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
                  style={{ color: textColor, fontSize: 12 }}
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
                    disabled={isSaved ? true : false}
                    onPress={onClickSavedPost}
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
                        jwpPlayerRef?.current?.setVolume(3);

                        setIsMuted(false);
                      } else {
                        setIsMuted(true);
                        jwpPlayerRef?.current?.setVolume(0);
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
                  onPress={() => onSharePost(`${_id}`)}
                  style={styles.icon}
                >
                  <EvilIcons name="share-google" size={20} color="white" />
                </TouchableOpacity>
              </View>

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
            <View style={scalableSizeIcons(description)}>
              <AppText
                numberOfLines={2}
                style={styles.bottomDescription}
              >
                {description}
              </AppText>
            </View>
          ) : (
            <View style={styles.emptyPlaceHolderDescription} />
          )}
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
              source={require("../../../assets/glow/glow.gif")}
            />
          </View>
        </Modal>
      </Swipeable>
    );
  }
);

const VideoPostComponent = React.memo(VideoPost);

export default VideoPostComponent;

const scalableSizeIcons = (description: string) => {
  return {
    paddingBottom: description.length > 50 ? 0 : 14,
  };
};

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: iconColor, },
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
    zIndex: 1,
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
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    bottom: 0,
  },
  emptyPlaceHolderDescription: {
    height: 25,
  },
  bottomDescription: {
    color: textColor,
    fontSize: widthPercentageToDP("3"),
    paddingBottom: 28
  },
});
