import analytics from "@segment/analytics-react-native";
import dummyAvator from "assets/dummyAvator.png";
import AutoScrollView from "components/autoScroll";
import StatusBar from "components/CustomStatusBar";
import Header from "components/Header";
import { AccentText, appFonts, AppText } from "components/text";
import { textColor } from "config/colors";
import { permissionAlert } from "lib/isIphone";
import { UpdateProfile } from "models/actions/user";
import AppState from "models/reducers";
import { StackScreen } from "navigation/types";
import React, { FC, useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  Linking,
  Platform,
  RefreshControl,
  Text as ReactText,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar } from "react-native-paper";
import { check, PERMISSIONS } from "react-native-permissions";
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostsRequest } from "store/actions/appAction";
import { enableSnackBar } from "store/actions/snackBarAction";
import {
  updateProfileDataRequest,
  uploadBackGroundImageRequest,
} from "store/actions/userActions";
import { EyeIcon } from "utils/icons";
import { Post } from "utils/stores";
import { Input } from "utils/uiPrimitives";
import { Container } from "components/workAround";

import { Affiliations, AffiliationsEditor } from "./components/Affliations";
import EditProfile from "./components/EditProfile";
import { MeetMeAt, MeetMeAtEditor } from "./components/MeetMeAtEditior";
import Portfolio from "./components/Portfolio";
import Posts from "./components/Post";
import TitleStump from "./components/TitleStump";
import styles from "./style";

interface IProps {
  navigation: {
    navigate: (routeName: string, params: Object) => void;
  };
}

export const MyProfile: StackScreen<"Base", {}> = (props: IProps) => {
  const badgeRotation = useSharedValue(0);

  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const loading = useSelector((state: AppState) => state.loading.isAppLoading);
  const sheetRef = React.useRef(null);

  const posts = useSelector((state: AppState) => state.app.userPost);
  const portfolio = useSelector((state: AppState) => state.app.portfolio);
  const [editing, setEditing] = useState(false);
  const [detailsModalShown, setDetailsModalShown] = useState(false);

  const [meetMeData, setMeetMeData] = useState(
    user?.meet_me_at ? [...user?.meet_me_at, ""] : [""]
  );
  const [LastSpottedValue, setLastSpottedValue] = useState(
    user.last_spotted ? user.last_spotted : ""
  );
  const [currentlyValue, setCurrentlyValue] = useState(
    user.currently ? user.currently : ""
  );
  const [postView, setHidePost] = useState(
    user.post_view ? user.post_view : false
  );
  const [portfolioView, setPortfolioView] = useState(
    user.portfolio_view ? user.portfolio_view : false
  );
  const [metMeView, setMetMeView] = useState(
    user.meet_me_at_view ? user.meet_me_at_view : false
  );
  const [lastSpottedView, setLastSpottedView] = useState(
    user.last_spotted_view ? user.last_spotted_view : false
  );
  const [currentlyView, setCurrentlyView] = useState(
    user.currently_view ? user.currently_view : false
  );
  const [affilationsView, setAffliationView] = useState(
    user.affliation_view ? user.affliation_view : false
  );
  const [bioView, setBioView] = useState(user.bio_view ? user.bio_view : false);
  const [twitterName, setTwitterName] = useState(
    user.twitter ? user.twitter : ""
  );
  const [instagramName, setInstagram] = useState(
    user.instagram ? user.instagram : ""
  );
  const [websiteName, setWebsiteName] = useState(
    user.website ? user.website : ""
  );

  const [bioValue, setBioValue] = useState(user.bio ? user.bio : "");
  const [affiliationsValue, setAffiliationsValue] = useState(
    user.affiliations ? [...user.affiliations, ""] : [""]
  );

  const restState = () => {
    setBioValue(user.bio ? user.bio : "");
    setWebsiteName(user.website ? user.website : "");
    setInstagram(user.instagram ? user.instagram : "");
    setTwitterName(user.twitter ? user.twitter : "");
    setBioView(user.bio_view ? user.bio_view : false);
    setAffliationView(user.affliation_view ? user.affliation_view : false);
    setCurrentlyView(user.affliation_view ? user.affliation_view : false);
    setMeetMeData(user?.meet_me_at ? [...user?.meet_me_at, ""] : [""]);
    setLastSpottedValue(user.last_spotted ? user.last_spotted : "");
    setCurrentlyValue(user.currently ? user.currently : "");
    setHidePost(user.post_view ? user.post_view : false);
    setPortfolioView(user.portfolio_view ? user.portfolio_view : false);
    setMetMeView(user.meet_me_at_view ? user.meet_me_at_view : false);
    setLastSpottedView(user.last_spotted_view ? user.last_spotted_view : false);
  };
  useEffect(() => {
    if (user.is_admin) {
      restState();
    }
  }, [user.is_admin]);
  useEffect(() => {
    dispatch(getUserPostsRequest());
  }, [user?._id]);
  useEffect(() => {
    badgeRotation.value = withRepeat(
      withTiming(360, {
        duration: 50000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const permissionCheck = () => {
    if (Platform.OS == "ios") {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result == "limited") {
          permissionAlert();
        } else {
          pickVideo();
        }
      });
    } else {
      pickVideo();
    }
  };
  async function pickBackGround() {
    analytics.track("Editing_cover_photo", {});
    if (Platform.OS == "ios") {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result == "limited") {
          permissionAlert();
        } else {
          ImagePicker.openPicker({
            //   freeStyleCropEnabled: true,
            mediaType: "photo",

            // includeBase64: true,
            //   cropping: true,
            avoidEmptySpaceAroundImage: false,
          })
            .then((image) => {
              const data = {
                id: user._id,
                image_name: image.path.substring(
                  image.path.lastIndexOf("/") + 1
                ),
                path: image.path,
                image_type: image.mime,
              };
              dispatch(uploadBackGroundImageRequest(data));
              analytics.track("Cover_photo_updated", {});
              setEditing(false);
            })
            .catch((error) => {
              if (error?.message == "User did not grant library permission.") {
                permissionAlert();
              } else if (error?.message !== "User cancelled image selection") {
                dispatch(enableSnackBar(error?.message));
              }
            });
        }
      });
    } else {
      ImagePicker.openPicker({
        //   freeStyleCropEnabled: true,
        mediaType: "photo",

        includeBase64: true,
        //   cropping: true,
        avoidEmptySpaceAroundImage: false,
      })
        .then((image) => {
          const data = {
            id: user._id,
            image_name: image.path.substring(image.path.lastIndexOf("/") + 1),
            img64: image.data,
          };
          dispatch(uploadBackGroundImageRequest(data));
          setEditing(false);
        })
        .catch((error) => {
          if (error?.message == "User did not grant library permission.") {
            permissionAlert();
          } else if (error?.message !== "User cancelled image selection") {
            dispatch(enableSnackBar(error?.message));
          }
        });
    }
  }
  const pickVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video",
      compressVideoPreset: "HighestQuality",
    })
      .then((response) => {
        if (
          response.mime.split("/")[0] == "image" ||
          response.duration <= 30000
        ) {
          props.navigation.navigate("NewPost", {
            mediaUrl: response,
            post_type: response.mime.split("/")[0],
            post: null,
            editView: false,
          });
        } else {
          throw Error("Please select 30 second video");
        }
      })
      .catch((error) => {
        if (error?.message == "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          dispatch(enableSnackBar(error?.message));
        }
      });
  };

  const pickPicture = () => {
    if (Platform.OS == "ios") {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result == "limited") {
          permissionAlert();
        } else {
          ImagePicker.openPicker({
            mediaType: "photo",
          })
            .then((response) => {
              props.navigation.navigate("AddPortfolio", {
                isPreView: false,
                mediaUrl: response,
                data: {},
                editView: false,
              });
            })
            .catch((error) => {
              if (error?.message == "User did not grant library permission.") {
                permissionAlert();
              } else if (error?.message !== "User cancelled image selection") {
                dispatch(enableSnackBar(error?.message));
              }
            });
        }
      });
    } else {
      ImagePicker.openPicker({
        includeBase64: true,
      })
        .then((response) => {
          props.navigation.navigate("AddPortfolio", {
            isPreView: false,
            mediaUrl: response,
            data: {},
            editView: false,
          });
        })
        .catch((error) => {
          if (error?.message == "User did not grant library permission.") {
            permissionAlert();
          } else if (error?.message !== "User cancelled image selection") {
            dispatch(enableSnackBar(error?.message));
          }
        });
    }
  };

  const save = () => {
    Keyboard.dismiss();
    setEditing(false);
    const meetMeDataValue = meetMeData.filter((item) => {
      return item !== "";
    });
    const affiliationsData = affiliationsValue.filter((item) => {
      return item !== "";
    });
    const data: UpdateProfile = {
      meet_me_at: meetMeDataValue,
      currently: currentlyValue,
      last_spotted: LastSpottedValue,
      affiliations: affiliationsData,
      bio: bioValue,
      twitter: twitterName,
      instagram: instagramName,
      website: websiteName,
      post_view: postView,
      bio_view: bioView,
      affliation_view: affilationsView,
      portfolio_view: portfolioView,
      last_spotted_view: lastSpottedView,
      meet_me_at_view: metMeView,
      currently_view: currentlyView,
    };

    dispatch(updateProfileDataRequest(data));
    setEditing(false);
  };

  const openPost = (post: Post) => {
    const data = { ...post };
    data.created_by = user;

    props.navigation.navigate("NewPostPreview", {
      post: data,
      showPreviewText: false,
      back: true,
    });
  };

  const onpenEditMode = (post: Post) => {
    props.navigation.navigate("SnapshotOptions", {
      mediaUrl: null,
      post: post,
      post_type: post.post_type,
      editView: true,
    });
    // props.navigation.navigate('UserPostPreview', {
    //     mediaUrl: null,
    //     post: post,
    //     post_type: post.post_type,
    //     editView: true,
    // });
  };
  const onRefresh = () => {
    dispatch(getUserPostsRequest());
  };
  return (
    <Container>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <Header color="black" textColor="black" />
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          nestedScrollEnabled={true}
        >
          {/* header */}

          <ImageBackground
            source={
              user.background_image && user.background_image !== ""
                ? { uri: user.background_image }
                : require("../../assets/stefano-bg.png")
            }
            resizeMode={"cover"}
            style={styles.imageBackGround}
          >
            <View>
              {editing && (
                <TouchableOpacity style={styles.editButton}>
                  <ReactText
                    onPress={pickBackGround}
                    style={{
                      fontWeight: "bold",
                      fontFamily: appFonts.InterRegular,
                    }}
                  >
                    EDIT COVER
                  </ReactText>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
          {/* interests */}

          <AutoScrollView
            //ref={scrollViewRef}
            // horizontal
            style={styles.autoScrollView}
          >
            <View style={{ flexDirection: "row" }}>
              {user?.tags?.map((tag) => (
                <AccentText key={tag} numberOfLines={1} style={styles.userTags}>
                  + {tag}
                </AccentText>
              ))}
            </View>
          </AutoScrollView>
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
                      : user?.title_stamp == 5
                      ? " ADVISOR"
                      : user?.title_stamp == 6
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
                  <ReactText style={styles.userText}>
                    @{user?.username}
                  </ReactText>
                ) : (
                  <View />
                )}
                <ReactText style={styles.locationText}>
                  {user?.location}
                </ReactText>
              </View>
            </View>
          </View>
          <View style={styles.editModeView}>
            {editing ? (
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    analytics.track("Editing_profile_details", {});
                    sheetRef?.current?.snapTo(0);
                  }}
                >
                  <ReactText style={{ fontWeight: "bold" }}>
                    EDIT DETAIL
                  </ReactText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={save}
                  style={styles.profilesaveButton}
                >
                  <ReactText style={{ fontWeight: "bold" }}>
                    SAVE CHANGES
                  </ReactText>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  analytics.track("Editing_profile", {});
                  setEditing(true);
                }}
                style={styles.eidtMode}
              >
                <ReactText style={{ fontWeight: "bold" }}>EDIT MODE</ReactText>
              </TouchableOpacity>
            )}
          </View>

          {editing ? (
            <View style={styles.postHeader}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AppText bold style={{ textTransform: "uppercase" }}>
                  Snapshots
                </AppText>
                <TouchableOpacity
                  onPress={permissionCheck}
                  style={{ paddingLeft: 5 }}
                >
                  <AntDesign size={20} name="plus" color="black" />
                </TouchableOpacity>
              </View>
              <EyeToggle
                style={{ width: 40, height: "100%" }}
                onPress={() => {
                  setHidePost((prv) => !prv);
                }}
                closed={!postView}
              />
            </View>
          ) : (
            postView &&
            posts?.length !== 0 && (
              <View style={styles.postHeader}>
                <TouchableOpacity
                  onPress={permissionCheck}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AppText bold style={{ textTransform: "uppercase" }}>
                    Snapshots
                  </AppText>
                  <TouchableOpacity
                    onPress={permissionCheck}
                    style={{ paddingLeft: 5 }}
                  >
                    <AntDesign size={20} name="plus" color="black" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )
          )}
          {postView && posts?.length !== 0 && (
            <Posts
              onpenEditMode={onpenEditMode}
              posts={posts}
              style={{
                height: 165,
                width: "100%",
              }}
              currentUser={true}
              openPost={openPost}
            />
          )}
          {editing ? (
            <View style={styles.postHeader}>
              <AppText bold style={{ textTransform: "uppercase" }}>
                Bio
              </AppText>
              <EyeToggle
                style={{ width: 40, height: "100%" }}
                onPress={() => {
                  setBioView((prv) => !prv);
                }}
                closed={!bioView}
              />
            </View>
          ) : (
            bioView &&
            user.bio !== "" && (
              <View style={styles.postHeader}>
                <AppText bold style={{ textTransform: "uppercase" }}>
                  Bio
                </AppText>
              </View>
            )
          )}
          {editing && bioView ? (
            <View style={{ paddingHorizontal: 17 }}>
              <Input
                maxLength={160}
                style={{
                  height: 57,
                }}
                multiline={true}
                value={bioValue}
                onChangeText={(text) => {
                  setBioValue(text);
                }}
              />
              <AppText
                style={{
                  alignSelf: "flex-end",
                  color: "gray",
                  paddingVertical: 5,
                }}
              >
                {" "}
                {bioValue.length} / 160{" "}
              </AppText>
            </View>
          ) : (
            bioView &&
            user.bio !== "" && (
              <View style={{ paddingHorizontal: 17 }}>
                <AppText>{user.bio}</AppText>
              </View>
            )
          )}
          {/* portfolio */}
          {editing ? (
            <View style={styles.postHeader}>
              <TouchableOpacity
                onPress={pickPicture}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AppText bold style={{ textTransform: "uppercase" }}>
                  ArtWork
                </AppText>
                <TouchableOpacity
                  onPress={pickPicture}
                  style={{ paddingLeft: 5 }}
                >
                  <AntDesign size={20} name="plus" color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
              {editing && (
                <EyeToggle
                  style={{ width: 40, height: "100%" }}
                  onPress={() => {
                    setPortfolioView((prv) => !prv);
                  }}
                  closed={!portfolioView}
                />
              )}
            </View>
          ) : (
            portfolioView &&
            portfolio.length !== 0 && (
              <View style={styles.postHeader}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AppText bold style={{ textTransform: "uppercase" }}>
                    ArtWork
                  </AppText>
                  <TouchableOpacity
                    onPress={pickPicture}
                    style={{ paddingLeft: 5 }}
                  >
                    <AntDesign size={20} name="plus" color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          )}
          {portfolio?.length !== 0 && portfolioView && (
            <Portfolio
              userData={user}
              style={{ height: 160 }}
              items={portfolio}
              currentUser={true}
            />
          )}
          {/* bottom info */}
          <View style={styles.metMeContainer}>
            {editing ? (
              <View style={styles.profileCurrentyView}>
                <AppText bold style={{ textTransform: "uppercase" }}>
                  You might have met me at
                </AppText>

                <EyeToggle
                  style={{ width: 40, height: "100%" }}
                  onPress={() => {
                    setMetMeView((prv) => !prv);
                  }}
                  closed={!metMeView}
                />
              </View>
            ) : (
              metMeView &&
              user?.meet_me_at?.length !== 0 && (
                <View style={styles.profileCurrentyView}>
                  <AppText bold style={{ textTransform: "uppercase" }}>
                    You might have met me at
                  </AppText>
                </View>
              )
            )}
            {editing && metMeView ? (
              <MeetMeAtEditor data={meetMeData} setData={setMeetMeData} />
            ) : (
              metMeView && user?.meet_me_at !== 0 && <MeetMeAt />
            )}
            <View style={styles.meetMeArea}>
              <View style={styles.meetMeAreaInner}>
                {editing ? (
                  <View style={styles.currentlyViewArea}>
                    <AppText
                      bold
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      Last Spotted
                    </AppText>
                    <EyeToggle
                      style={{
                        width: 40,
                        height: "100%",
                      }}
                      onPress={() => {
                        setLastSpottedView((prv) => !prv);
                      }}
                      closed={!lastSpottedView}
                    />
                  </View>
                ) : (
                  lastSpottedView &&
                  user?.last_spotted !== "" && (
                    <View style={styles.currentlyViewArea}>
                      <AppText
                        bold
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        Last Spotted At:
                      </AppText>
                    </View>
                  )
                )}
                {editing && lastSpottedView ? (
                  <Input
                    maxLength={25}
                    value={LastSpottedValue}
                    onChangeText={(text: string) => {
                      setLastSpottedValue(text.substring(0, 25));
                    }}
                  />
                ) : (
                  lastSpottedView &&
                  user?.last_spotted !== "" && (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <AppText
                        style={{
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingHorizontal: 7,
                          paddingVertical: 3,
                          alignSelf: "stretch",
                        }}
                      >
                        {user?.last_spotted}
                      </AppText>
                    </View>
                  )
                )}
              </View>
              <View style={styles.currentlyViewContainer}>
                {editing ? (
                  <View style={styles.profileCurrentyContainer}>
                    <AppText
                      bold
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      Currently
                    </AppText>
                    <EyeToggle
                      style={{
                        width: 40,
                        height: "100%",
                      }}
                      onPress={() => {
                        setCurrentlyView((prv) => !prv);
                      }}
                      closed={!currentlyView}
                    />
                  </View>
                ) : (
                  currentlyView &&
                  user?.currently !== "" && (
                    <View style={styles.profileCurrentyView}>
                      <AppText
                        bold
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        Currently:
                      </AppText>
                    </View>
                  )
                )}
                {editing && currentlyView ? (
                  <Input
                    maxLength={25}
                    style={{ minHeight: 20 }}
                    textAlignVertical="top"
                    multiline={true}
                    value={currentlyValue}
                    onChangeText={(text) => {
                      setCurrentlyValue(text.substring(0, 25));
                    }}
                  />
                ) : (
                  currentlyView &&
                  user?.currently !== "" && (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
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
                  )
                )}
              </View>
            </View>
            <View style={styles.meetMeArea}>
              <View>
                {editing ? (
                  <View style={styles.affliationView}>
                    <AppText
                      bold
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      Affiliations:
                    </AppText>
                    <EyeToggle
                      style={{
                        width: 40,
                        height: "100%",
                      }}
                      onPress={() => {
                        setAffliationView((prv) => !prv);
                      }}
                      closed={!affilationsView}
                    />
                  </View>
                ) : (
                  affilationsView &&
                  user?.affiliations?.length !== 0 && (
                    <View style={styles.affliationView}>
                      <AppText
                        bold
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        Affiliations:
                      </AppText>
                    </View>
                  )
                )}
                {editing && affilationsView ? (
                  <AffiliationsEditor
                    data={affiliationsValue}
                    setData={setAffiliationsValue}
                  />
                ) : (
                  affilationsView &&
                  user?.affiliations !== 0 && <Affiliations />
                )}
              </View>
            </View>
          </View>
          {editing ? (
            <View style={styles.userAffiliations}>
              <Input
                maxLength={30}
                placeholder={"@INSTAGRAM"}
                placeholderTextColor="#B2B2B2"
                value={instagramName}
                onChangeText={(text) => {
                  setInstagram(text.substring(0, 30));
                }}
                style={styles.linkInput}
              />
              <View style={styles.dot} />
              <Input
                maxLength={255}
                placeholder={"WEBSITE"}
                placeholderTextColor="#B2B2B2"
                value={websiteName}
                onChangeText={(text) => {
                  setWebsiteName(text.substring(0, 255));
                }}
                style={styles.linkInput}
              />
              <View style={styles.dot} />
              <Input
                maxLength={15}
                placeholder={"@TWITTER"}
                placeholderTextColor="#B2B2B2"
                value={twitterName}
                onChangeText={(text) => {
                  setTwitterName(text.substring(0, 15));
                }}
                style={styles.linkInput}
              />
            </View>
          ) : (
            <View style={styles.userAffiliations}>
              {user?.instagram !== "" && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://www.instagram.com/${user.instagram?.trim()}`
                    )
                  }
                >
                  <AccentText style={styles.linkText}>Instagram</AccentText>
                </TouchableOpacity>
              )}
              {user?.instagram !== "" && user?.website !== "" && (
                <View style={styles.instagramArea} />
              )}
              {user?.instagram !== "" &&
                user?.twitter !== "" &&
                user?.website == "" && <View style={styles.instagramArea} />}
              {user?.website !== "" && (
                <TouchableOpacity onPress={() => Linking.openURL(user.website)}>
                  <AccentText style={styles.linkText}>Website</AccentText>
                </TouchableOpacity>
              )}
              {user?.website !== "" && user?.twitter !== "" && (
                <View style={styles.websiteView} />
              )}
              {user?.twitter !== "" && (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `http://twitter.com/${user.twitter?.trim()}`
                    )
                  }
                >
                  <AccentText style={styles.linkText}>Twitter</AccentText>
                </TouchableOpacity>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
        <EditProfile
          sheetRef={sheetRef}
          isVisible={detailsModalShown}
          onClose={() => {
            setDetailsModalShown(false);
          }}
        />
      </View>
    </Container>
  );
};

// TODO: make animated modal generic

interface IEyeToggleProps {
  closed: boolean;
  style: ViewStyle;
}

const EyeToggle: FC<TouchableOpacityProps & IEyeToggleProps> = (
  props: IEyeToggleProps
) => {
  return (
    <TouchableOpacity
      {...props}
      style={[{ alignItems: "center", justifyContent: "center" }, props.style]}
    >
      <EyeIcon closed={props.closed} />
    </TouchableOpacity>
  );
};
