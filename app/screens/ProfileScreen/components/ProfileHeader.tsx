import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { iconColor, primary } from "../../../config/colors";
import { appFonts } from "../../../components/text";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import TitleStump from "./TitleStump";
import dummyAvator from "assets/dummyAvator.png";
import { profileHeaderProps } from "../types";
import { useCallback } from "react";
import QrModel from "./QrModel";
import { useNavigation } from "@react-navigation/core";

export default function ProfileHeader(props: profileHeaderProps) {
  const {
    full_name = "",
    username = "",
    title = "",
    location = "",
    instagram = "",
    twitter = "",
    website = "",
    follower_count = 0,
    title_stamp = 1,
    cover_image = null,
    first_name = "",
    _id = "",
  } = props;

  const [userImage, setUserImage] = useState(cover_image ? cover_image : null);
  const [isVisibleQrModal, toggleQrModal] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setUserImage(cover_image ? cover_image : null);
    return () => {
      setUserImage(null);
    };
  }, [cover_image]);
  const openTwitter = useCallback(() => {
    Linking.openURL(`http://twitter.com/${twitter?.trim()}`);
  }, [twitter]);
  const openInstagram = useCallback(() => {
    Linking.openURL(`https://www.instagram.com/${instagram?.trim()}`);
  }, [instagram]);

  const openWeb = useCallback(() => {
    Linking.openURL(website);
  }, [website]);
  const onPressQr = () => {
    toggleQrModal(true);
  };

  function numFormatter(follower_count: any) {
    if (isNaN(follower_count)) {
      return 0;
    } else if (follower_count >= 999 && follower_count < 1000000) {
      return (follower_count / 1000).toFixed(1) + " K"; // convert to K for follower_countber from > 1000 < 1 million
    } else if (follower_count >= 1000000) {
      return (follower_count / 1000000).toFixed(1) + " M"; // convert to M for follower_countber from > 1 million
    } else {
      return follower_count;
    }
  }
  const onClickFans = () => {
    navigation.navigate("FansScreen", {
      _id: _id
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {full_name && full_name != "" ? (
          <Text style={styles.name}>{full_name}</Text>
        ) : null}
        {username && username != "" ? (
          <Text style={styles.text}>{"@" + username}</Text>
        ) : null}
        {title && title != "" ? <Text style={styles.text}>{title}</Text> : null}
        {location && location != "" ? (
          <Text style={styles.text}>
            <Entypo
              name="location-pin"
              size={widthPercentageToDP("3.5")}
              color={iconColor}
            />
            {location}
          </Text>
        ) : null}
        {website != "" || instagram != "" || twitter != "" ? (
          <View style={styles.socialContainer}>
            {website && website != "" ? (
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                testID={"openWeb"}
                onPress={openWeb}
              >
                <Fontisto
                  size={widthPercentageToDP(5)}
                  name="world-o"
                  color={iconColor}
                />
              </TouchableOpacity>
            ) : null}
            {twitter && twitter != "" ? (
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                testID={"openTwitter"}
                onPress={openTwitter}
              >
                <AntDesign
                  size={widthPercentageToDP(5)}
                  name="twitter"
                  color={iconColor}
                />
              </TouchableOpacity>
            ) : null}

            {instagram && instagram != "" ? (
              <TouchableOpacity
                style={{ paddingRight: 10 }}
                testID={"openInstagram"}
                onPress={openInstagram}
              >
                <AntDesign
                  size={widthPercentageToDP(5)}
                  name="instagram"
                  color={iconColor}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        <TouchableOpacity onPress={onClickFans}>
          <Text style={styles.bottomHeading} testID={"numFormat"}>
            {numFormatter(follower_count) + " " + "FANS"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.titleStumpContainer}>
          <TitleStump
            style={styles.titleStump}
            text={
              title_stamp == 1
                ? "PARTNER ORGANIZATON"
                : title_stamp == 2
                  ? "VERIFIED USER"
                  : title_stamp == 3
                    ? "EARLY ADOPTER"
                    : title_stamp == 4
                      ? " COHART-ER"
                      : title_stamp == 5
                        ? " ADVISOR"
                        : title_stamp == 6
                          ? "COCOISTA"
                          : "EARLY ADOPTER"
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            progressiveRenderingEnabled={true}
            source={userImage ? { uri: userImage } : dummyAvator}
            resizeMode="cover"
            style={styles.imageContainer}
          />
          <TouchableOpacity
            testID={"onPressQr"}
            onPress={onPressQr}
            style={styles.qrCodeView}
          >
            <AntDesign size={22} name="qrcode" color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
      <QrModel
        isVisible={isVisibleQrModal}
        toggleModal={toggleQrModal}
        name={username}
        first_name={first_name}
        link={"https://web.cohart.co/" + username}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: heightPercentageToDP(20),
  },
  leftContainer: { width: widthPercentageToDP(40) },
  name: {
    fontSize: widthPercentageToDP(5.1),
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    paddingBottom: 4,
  },
  text: {
    fontSize: widthPercentageToDP(3),
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontWeight: "300",
    paddingBottom: 4,
  },
  socialContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    width: widthPercentageToDP(25),
  },
  bottomHeading: {
    fontSize: widthPercentageToDP(3),
    color: iconColor,
    fontFamily: appFonts.InterRegular,
  },
  titleStumpContainer: { top: -25, position: "absolute", right: -70 },
  titleStump: {
    width: widthPercentageToDP(40),
    height: widthPercentageToDP(40),
  },
  imageContainer: {
    width: widthPercentageToDP(25),
    height: widthPercentageToDP(25),
    borderRadius: widthPercentageToDP(13),
  },
  qrCodeView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: primary,
    width: 40,
    height: 40,
    zIndex: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
