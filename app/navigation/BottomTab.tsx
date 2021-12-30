import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import Discover from "assets/discover.png";
import CommunityTab from "assets/CommunityTab.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import dummyAvator from "assets/dummyAvator.png";
import { Menu } from "components/SvgIcons";
import { appFonts } from "../components/text";
import { iconColor, primary } from "../config/colors";
import { useSelector } from "react-redux";
import AppState from "models/reducers/index";
import { permissionAlert } from "../lib/isIphone";
import { PERMISSIONS, check } from "react-native-permissions";
import UploadModal from "./UploadModal";

export default function BottomTab(props: BottomTabBarProps) {
  const { state, navigation, onPress, isNavRoot } = props;
  const isFocused = state?.index;

  const { isFirstTimeLogin, isAcceptGuideLines } = props;

  const [showQrModal, toggleQrModal] = useState(false);
  const userImage = useSelector((state: AppState) => state.user.cover_image);
  const navigateToDiscover = () => {
    if (!isNavRoot && onPress) {
      onPress();
    } else if (isFirstTimeLogin) {
      navigation?.navigate("FirstLogin");
    } else if (!isFirstTimeLogin && !isAcceptGuideLines) {
      navigation?.navigate("FirstTimeCommunityGuideline");
    } else {
      navigation?.navigate("Discover");
    }
  };

  const navigateToCommunity = () => {
    if (!isNavRoot && onPress) {
      onPress();
    } else if (isFirstTimeLogin) {
      navigation?.navigate("FirstLogin");
    } else if (!isFirstTimeLogin && !isAcceptGuideLines) {
      navigation?.navigate("FirstTimeCommunityGuideline");
    } else {
      navigation?.navigate("Community");
    }
  };
  const navigateToProfile = () => {
    if (!isNavRoot && onPress) {
      onPress();
      return;
    } else if (isFirstTimeLogin) {
      navigation?.navigate("FirstLogin");
    } else if (!isFirstTimeLogin && !isAcceptGuideLines) {
      navigation?.navigate("FirstTimeCommunityGuideline");
    } else {
      navigation?.navigate("MyProfile");
    }
  };

  const navigateToMenu = () => {
    if (!isNavRoot && onPress) {
      onPress();
    } else if (isFirstTimeLogin) {
      navigation?.navigate("FirstLogin");
    } else if (!isFirstTimeLogin && !isAcceptGuideLines) {
      navigation?.navigate("FirstTimeCommunityGuideline");
    } else {
      navigation?.navigate("Menu");
    }
  };

  const permissionCheck = () => {
    if (!isNavRoot && onPress) {
      onPress();
    } else if (isFirstTimeLogin) {
      navigation?.navigate("FirstLogin");
    } else if (!isFirstTimeLogin && !isAcceptGuideLines) {
      navigation?.navigate("FirstTimeCommunityGuideline");
    } else {
      if (Platform.OS == "ios") {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
          if (result == "limited") {
            permissionAlert();
          } else {
            toggleQrModal(!showQrModal);
            // uploadImage();
          }
        });
      } else {
        toggleQrModal(!showQrModal);
      }
    }
  };

  // Some screen we'll hide the bottom bars
  // Index 2: Chat screen
  // Index 10: Edit Profile
  if (isFocused == 2 || isFocused == 10) {
    return null
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            testID={"DiscoverNav"}
            onPress={navigateToDiscover}
            style={styles.tab}
          >
            <View
              style={isFocused == 7 ? styles.focusShadow : styles.unFocusShadow}
            >
              <Image source={Discover} style={styles.image} />
            </View>
            <Text style={styles.header}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"CommunityNav"}
            onPress={navigateToCommunity}
            style={styles.tab}
          >
            <View
              style={isFocused == 0 ? styles.focusShadow : styles.unFocusShadow}
            >
              <Image source={CommunityTab} style={styles.image} />
            </View>
            <Text style={styles.header}>Community</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID={"permissionCheck"}
          onPress={permissionCheck}
          style={styles.tab}
        >
          <View style={styles.circle}>
            <Ionicons color={iconColor} size={30} name="add" />
          </View>
        </TouchableOpacity>

        <View style={styles.innerContainer}>
          <TouchableOpacity
            testID={"ProfileNav"}
            onPress={navigateToProfile}
            style={styles.tab}
          >
            <View
              style={isFocused == 8 ? styles.focusShadow : styles.unFocusShadow}
            >
              <Image
                source={
                  userImage && userImage != ""
                    ? { uri: userImage }
                    : dummyAvator
                }
                style={styles.image}
              />
            </View>
            <Text style={styles.header}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"MenuNav"}
            onPress={navigateToMenu}
            style={styles.tab}
          >
            <View
              style={
                isFocused == 14 ? styles.focusShadow : styles.unFocusShadow
              }
            >
              <Menu width={25} height={25} color={iconColor} />
            </View>
            <Text style={[styles.header]}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <UploadModal
        isVisible={showQrModal}
        toggleModal={toggleQrModal}
        navigation={navigation}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    width: widthPercentageToDP(100),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    paddingTop: 7,
    borderTopColor: iconColor,
    borderTopWidth: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    width: widthPercentageToDP("40"),

    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  header: {
    fontFamily: appFonts.InterRegular,
    fontSize: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: primary,
    position: "absolute",
    top: -30,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  unFocusShadow: {},
  focusShadow: {
    backgroundColor: "white",
    shadowColor: primary,

    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
