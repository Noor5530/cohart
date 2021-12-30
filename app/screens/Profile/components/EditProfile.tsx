import analytics from "@segment/analytics-react-native";
import { defaultcover_image } from "components/sharedComponents";
import { AppText } from "components/text";
import ApiConfig from "config/api-config";
import useFetch from "hooks/useFetch";
import { permissionAlert } from "lib/isIphone";
import { UpdateUserInformation, LogOutRequestEnum } from "models/actions/user";
import AppState from "models/reducers";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  UIManager,
  View,
} from "react-native";
import {
  ScrollView,
  TouchableOpacity as RNGHTouchableOpacity,
} from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator } from "react-native-paper";
import { check, PERMISSIONS } from "react-native-permissions";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { uploadAvatar } from "services/uploadAvatar";
import { enableSnackBar } from "store/actions/snackBarAction";
import {
  updateUserInformationRequest,
  uploadImage,
} from "store/actions/userActions";
import { PencilOutlineIcon } from "utils/icons";

import { appFonts } from "../../../components/text";
import { iconColor, neonYellow, textColor } from "../../../config/colors";
import TagEditor from "./TagEditor";
import { useIsFocused } from "@react-navigation/native";
import { logOutRequest } from "store/actions/userActions";

const profileTags = [
  "Artist",
  "Painter",
  "Sculptor",
  "Gallerist",
  "Collector",
  "Curator",
  "Art Professional",
  "Jeweler",
  "Art Consultant",
  "Craftsman",
  "Designer",
  "Performer",
  "Producer",
  "Musician",
  "Photographer",
  "Newbie",
  "Art Lover",
  "Digital Artist",
  "Writer",
  "Creative Director",
];

const interestedTags = [
  "Building My Community",
  "Showcasing My Work",

  "Buying Artwork",
  "Inspiration",
  "Sharing Ideas & Concepts",
  "Meeting  Artists",

  "Meeting Collectors",

  "Collaboration",

  "Art News",
  "Workshops & Talks",

  "Reselling Artwork",
  "Exploration",
  "I Don’t Know Yet",
];

interface IProps {
  sheetRef: {
    current?: any;
  };
}

const ProfileDetailsEditorModal: FC<{ sheetRef: any; onClose: () => void }> = (
  props: IProps
) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  // const [name, setName] = useState(user.full_name);
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const [userName, setUserName] = useState(user?.username);
  const [showEditInterestedTags, toggleInterestedEditTags] = useState(false);
  const [showEditProfileTags, toggleProfileEditTags] = useState(false);
  const [userNameError, setUserNameError] = useState("");

  const [subtitleValue, setSubtitle] = useState(user.subtitle);
  const [locationValue, setLocation] = useState(user.location);
  const [interestsData, setInterests] = useState(
    user?.interests ? user.interests : ""
  );
  const [interestsProfileData, setInterestsProfile] = useState(
    user?.tags ? user.tags : ""
  );

  const [avatar, setAvatarUrl] = useState(user.cover_image);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  // const [nameError, setNameError] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [tagsError, setTagsError] = useState(false);

  const resetState = () => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUserName(user?.username);
    toggleInterestedEditTags(false);
    toggleProfileEditTags(false);
    setUserNameError("");
    setSubtitle(user.subtitle);
    setLocation(user.location);
    setInterests(user?.interests ? user.interests : "");
    setInterestsProfile(user?.tags ? user.tags : "");
    setAvatarUrl(user.cover_image);
    setUploadImageLoading(false);
    setFirstNameError(false);
    setLastNameError(false);
    setTagsError(false);
  };
  useEffect(() => {
    if (isFocused) {
      resetState();
    }
  }, [isFocused, user.is_admin]);
  const {
    state: { status, data },
    refetch: checkUserName,
  } = useFetch<any>(ApiConfig.VERIFY_USERNAME, {
    method: "POST",
    data: {
      user_id: user._id,
      username: userName,
    },
  });
  useEffect(() => {
    if (status == "fetching") {
      // dispatch(enableLoading());
    } else if (status !== "init") {
      if (data?.statusCode == 400) {
        setUserNameError("User Name Already Exist");
      } else {
        setUserNameError("");
      }
      // dispatch(disableLoading());
      // dispatch(enableSnackBar(data?.data));
    }
  }, [status, data]);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const toggleInterestedTags = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleInterestedEditTags((prv) => !prv);
  }, [showEditInterestedTags]);
  const toggleProfileTags = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleProfileEditTags((prv) => !prv);
  }, [toggleProfileEditTags]);

  React.useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
  });

  const permissionCheck = () => {
    if (Platform.OS == "ios") {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result == "limited") {
          permissionAlert();
        } else {
          pickAvatar();
        }
      });
    } else {
      pickAvatar();
    }
  };
  async function pickAvatar() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropperCircleOverlay: true,
      includeBase64: true,
      cropping: true,
    })
      .then((image) => {
        setUploadImageLoading(true);
        setAvatarUrl(`data:${image.mime};base64,${image.data}`);
        uploadProfileAvatar(image);
      })
      .catch((error) => {
        setUploadImageLoading(false);
        if (error?.message == "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          dispatch(enableSnackBar(error?.message));
        }
      });
  }
  const uploadProfileAvatar = async (image: any) => {
    try {
      const data = {
        id: user._id,
        phone_number: user.phone_number,
        image_name: image.path.substring(image.path.lastIndexOf("/") + 1),
        img64: image.data,
      };

      let response = await uploadAvatar(data);
      const coverImage = response?.data?.data;

      if (coverImage?.cover_image) {
        dispatch(uploadImage(coverImage?.cover_image));
      } else {
        dispatch(enableSnackBar());
      }
      setUploadImageLoading(false);
    } catch (error: any) {
    console.log('error',error);

      setUploadImageLoading(false);

      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
    }
  };
  function save() {
    if (firstName.trim() == "") {
      dispatch(enableSnackBar("First name is Required"));
    } else if (lastName.trim() == "") {
      dispatch(enableSnackBar("Last name is Required"));
    } else if (userNameError?.length > 0) {
      setUserNameError("User name is Required");

      dispatch(enableSnackBar("User name is Required"));
    } else if (userName?.length < 3) {
      dispatch(enableSnackBar("Minimum 3 character required for userName"));
      setUserNameError("Minimum 3 character required for userName");
    } else if (locationValue.trim() == "") {
      dispatch(enableSnackBar("Location is Required"));
    } else if (interestsData.length < 3) {
      dispatch(enableSnackBar("Minimum 3 interested tags required"));
    } else if (interestsProfileData.length < 1) {
      dispatch(enableSnackBar("Minimum 1 profile tag required"));
    } else {
      const data: UpdateUserInformation = {
        id: user._id,
        phone_number: user.phone_number,
        first_name: firstName?.trim(),
        last_name: lastName?.trim(),
        full_name: firstName?.trim() + " " + lastName?.trim(),
        subtitle: subtitleValue,
        location: locationValue,
        interests: interestsData.toString(),
        title_stamp: user?.title_stamp ? user?.title_stamp : 3,
        state: "",
        country: "",
        username: userName,
        tags: interestsProfileData.toString(),
      };
      //tracking which properties changed as opposed to all data
      const profileProperties = [
        "full_name",
        "username",
        "subtitle",
        "location",
        "tags",
      ];
      profileProperties.forEach((property) => {
        if (user[property] !== data[property]) {
          analytics.track(`Profile_${property}_updated`, {
            Old_Value: user[property],
            New_Value: data[property],
          });
        }
      });
      dispatch(updateUserInformationRequest(data));
      props.sheetRef?.current?.snapTo(Platform.OS == "android" ? 2 : 1);
    }
  }

  const renderContent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.container} />
        {!showEditInterestedTags && !showEditProfileTags && (
          <Scroll
            contentContainerStyle={{
              paddingBottom: Platform.OS == "android" ? 150 : 10,
            }}
            nestedScrollEnabled
            bounces={false}
          >
            <View style={styles.scroll}>
              <View style={[styles.headingStyle]}>
                <Text style={styles.headingText}>Edit Profile</Text>
                <TouchAble onPress={permissionCheck} style={styles.imgShape}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: avatar || defaultcover_image,
                    }}
                  />
                  <View style={styles.indicator}>
                    {uploadImageLoading ? (
                      <ActivityIndicator color={neonYellow} size="small" />
                    ) : (
                      <PencilOutlineIcon color={neonYellow} />
                    )}
                  </View>
                </TouchAble>
              </View>
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  FIRST NAME
                </AppText>
                <TextInput
                  maxLength={13}
                  value={firstName}
                  placeholder="Add First Name"
                  onChangeText={(text) => {
                    setFirstName(text.substring(0, 13));
                    if (firstNameError == true) {
                      setFirstNameError(false);
                    }
                  }}
                  style={styles.input}
                />
                {firstNameError && (
                  <Text style={styles.errinput}>
                    First Name felid is required
                  </Text>
                )}
              </View>
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  LAST NAME
                </AppText>
                <TextInput
                  maxLength={13}
                  value={lastName}
                  placeholder="Add Last Name"
                  onChangeText={(text) => {
                    setLastName(text.substring(0, 13));
                    if (lastNameError == true) {
                      setLastNameError(false);
                    }
                  }}
                  style={styles.input}
                />
                {lastNameError && (
                  <Text style={styles.errinput}>
                    Last Name felid is required
                  </Text>
                )}
              </View>
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  Username
                </AppText>
                <TextInput
                  onBlur={() => {
                    if (userName.length > 7) {
                      checkUserName();
                    } else {
                      setUserNameError("");
                    }
                  }}
                  maxLength={15}
                  placeholder="Add Username"
                  value={userName}
                  onChangeText={(text) => {
                    /* eslint-disable no-useless-escape */
                    const outString = text.replace(
                      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                      ""
                    );
                    setUserName(outString.trim().substring(0, 15));
                    if (outString.trim().length > 7) {
                      checkUserName();
                    } else if (outString.trim().length < 7) {
                      setUserNameError("");
                    }
                  }}
                  style={styles.input}
                />
                {userNameError.length > 0 && (
                  <Text style={styles.errinput}>{userNameError}</Text>
                )}
              </View>
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  Title
                </AppText>
                <TextInput
                  maxLength={25}
                  placeholder="Add title"
                  value={subtitleValue}
                  onChangeText={(text) => setSubtitle(text.substring(0, 25))}
                  style={styles.input}
                />
              </View>
              {/* <View style={{marginBottom:20}}>
                <AppText medium style={{textTransform: "uppercase",	fontSize: 16,marginBottom:8,marginLeft:8}}>
                  Title STAMP
                </AppText>
                <TextInput
                  maxLength={25}
                  value={titleStamp}
                  placeholder="Add tag for stamp"
                  onChangeText={text => setTitleStamp(text.substring(0, 25))}
                  style={{borderWidth:1,backgroundColor:textColor,borderRadius:8,fontSize:18,paddingVertical:4,paddingHorizontal: 8,}}
                />
              </View> */}
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  Location
                </AppText>
                <TextInput
                  placeholder="Add location"
                  value={locationValue}
                  onChangeText={(text) => setLocation(text.substring(0, 25))}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  Profile Tags{" "}
                </AppText>
                <TextInput
                  onFocus={() => {
                    toggleProfileTags();
                  }}
                  placeholder="Add more tags"
                  value={interestsProfileData.toString()?.replace(/,/g, ", ")}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputfield}>
                <AppText medium style={styles.feildHeader}>
                  I’m interested in...{" "}
                </AppText>
                <TouchAble>
                  <TextInput
                    onFocus={() => {
                      toggleInterestedTags();
                    }}
                    placeholder="Add more tags"
                    value={interestsData.toString()?.replace(/,/g, ", ")}
                    style={styles.input}
                  />
                </TouchAble>
              </View>
            </View>
          </Scroll>
        )}
        {showEditInterestedTags && (
          <TagEditor
            title={"Minimum 3 Tags required"}
            required={3}
            onFocus={() => {
              if (Platform.OS == "android") {
                props.sheetRef?.current?.snapTo(1);
              }
            }}
            tagsList={interestedTags}
            label={"I’m\ninterested in..."}
            toggleTagView={() => {
              toggleInterestedTags();
              props.sheetRef?.current?.snapTo(0);
            }}
            interests={interestsData}
            onChangeInterests={(data) => {
              setInterests(data);
              if (tagsError == true) {
                setTagsError(false);
              }
            }}
          />
        )}
        {showEditProfileTags && (
          <TagEditor
            title={"Minimum 1 Tag required"}
            required={1}
            onFocus={() => {
              if (Platform.OS == "android") {
                props.sheetRef?.current?.snapTo(1);
              }
            }}
            tagsList={profileTags}
            label={"Add\nProfile Tags"}
            toggleTagView={() => {
              toggleProfileTags();
              props.sheetRef?.current?.snapTo(0);
            }}
            interests={interestsProfileData}
            onChangeInterests={(data) => {
              setInterestsProfile(data);
              if (tagsError == true) {
                setTagsError(false);
              }
            }}
          />
        )}
        {!showEditProfileTags && !showEditInterestedTags ? (
          <TouchAble
            onPress={() => {
              save();
            }}
            style={styles.Button}
          >
            <AppText medium style={styles.action}>
              Save
            </AppText>
          </TouchAble>
        ) : null}
      </View>
    );
  };
  // TODO: confirm cancel without saving
  return (
    <BottomSheet
      ref={props.sheetRef}
      renderContent={renderContent}
      initialSnap={Platform.OS == "android" ? 2 : 1}
      snapPoints={Platform.OS == "android" ? [hp(75), hp(50), 0] : [hp(75), 0]}
      enabledInnerScrolling={true}
    />
  );
};
interface TouchProps extends TouchableOpacityProps {
  children: ReactNode;
}
interface ScrollProps extends ScrollViewProps {
  children: ReactNode;
}
function TouchAble(props: TouchProps) {
  if (Platform.OS == "android") {
    return (
      <RNGHTouchableOpacity {...props}>{props.children}</RNGHTouchableOpacity>
    );
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
}
function Scroll(props: ScrollProps) {
  if (Platform.OS == "android") {
    return <ScrollView {...props}>{props.children}</ScrollView>;
  } else {
    return (
      <KeyboardAwareScrollView {...props}>
        {props.children}
      </KeyboardAwareScrollView>
    );
  }
}
export default ProfileDetailsEditorModal;
const styles = StyleSheet.create({
  header: {
    borderTopWidth: 3,
    borderTopColor: "black",
    height: "100%",
    backgroundColor: textColor,
  },
  container: {
    marginTop: 5,
    borderRadius: 4,
    width: wp(10),
    height: 5,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
  },
  // container: {
  //   paddingTop: hp('40%'),
  //   flex: 1,
  //   alignItems: 'center',
  // },
  scroll: {
    width: "100%",
    padding: 16,
  },
  feildHeader: {
    textTransform: "uppercase",
    fontSize: wp("4"),
    marginBottom: 8,
    marginLeft: 8,
  },
  requiredText: {
    fontWeight: "normal",
    fontSize: wp("3"),
  },
  imgShape: {
    height: 64,
    width: 64,
    borderWidth: 1,
    borderRadius: 9999,
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 9999,
  },
  headingStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    marginBottom: 35,
  },
  headingText: {
    color: "black",
    fontWeight: "500",
    fontFamily: appFonts.InterRegular,
    fontSize: wp(13),
    width: wp("60"),
  },
  indicator: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },

  inputfield: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    backgroundColor: textColor,
    borderRadius: 8,
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  errinput: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 14,
    color: iconColor,
  },
  Button: {
    width: "100%",
    backgroundColor: iconColor,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  action: {
    color: textColor,
    textTransform: "uppercase",
    fontSize: 16,
  },
});
