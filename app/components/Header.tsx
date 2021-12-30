import { useNavigation, useRoute } from "@react-navigation/native";
import { BackIcon, CheckMarkIcon, StarIcon } from "components/Icons";
import { appFonts } from "components/text";
import { isIphone, permissionAlert } from "lib/isIphone";
import React from "react";
import {
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { check, PERMISSIONS } from "react-native-permissions";
import { useDispatch } from "react-redux";
import { enableSnackBar } from "store/actions/snackBarAction";

import { iconColor, primary } from "../config/colors";
import { Notification } from "./SvgIcons";

interface Props {
  style?: ViewStyle;
  back?: boolean;
  color?: string;
  textColor?: string;
  label?: string;
  textStyle?: TextStyle;
  title?: string;
  checkMark?: boolean;
  onPress?: () => {};
  goBack?: () => {};
  onPressStar?: () => {};
  referBack?: boolean;
  referBackPress?: () => void;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
  headerLeft?: boolean;
}

export default function Header(props: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { style, textStyle = {}, color = iconColor, title, label } = props;

  const permissionCheck = () => {
    if (Platform.OS === "ios") {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result === "limited") {
          permissionAlert();
        } else {
          pickVideo();
        }
      });
    } else {
      pickVideo();
    }
  };
  const pickVideo = () => {
    ImagePicker.openPicker({
      mediaType: "video",
      compressImageQuality: 0.8,
      compressVideoPreset: "HighestQuality",
    })
      .then((response) => {
        if (
          response.mime.split("/")[0] === "image" ||
          response.duration <= 30000
        ) {
          navigation.navigate("NewPost", {
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
        if (error?.message === "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          dispatch(enableSnackBar(error?.message));
        }
      });
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 80,
        backgroundColor: "white",
        paddingTop: isIphone(),

        ...style,
      }}
    >
      {!props.headerLeft && (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            if (props.back) {
              if (props.goBack) {
                props.goBack();
              } else if (props.referBack && props.referBackPress) {
                props.referBackPress();
              } else {
                navigation.goBack();
              }
            } else {
              permissionCheck();
            }
          }}
        >
          {props.renderLeft ? (
            props.renderLeft
          ) : props.back ? (
            <View style={{ width: 38 }}>
              <BackIcon color={color === "#E8FC48" ? primary : color} />
            </View>
          ) : (
            <View style={{ width: 38 }}>
              <StarIcon color={color} />
            </View>
          )}
        </TouchableOpacity>
      )}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={[
            {
              color: iconColor,
              fontSize: 20,
            },
            textStyle,
            { fontFamily: appFonts.AktivGroteskEx_Trial_Bd },
          ]}
        >
          {title ? title : "COHART"}
        </Text>
        {label && (
          <Text style={{ color: "#B8CC03", fontSize: 14 }}>{label}</Text>
        )}
      </View>

      {!props.headerLeft ? (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            if (props.checkMark && props.onPress) {
              props.onPress();
            } else {
              route.name !== "Notification"
                ? navigation.navigate("Notification")
                : navigation.goBack();
            }
          }}
        >
          {props.renderRight ? (
            props.renderRight
          ) : props.checkMark ? (
            <CheckMarkIcon color={iconColor} width={"25"} height={"25"} />
          ) :
          (route && route.name == "OnboardReferFriend") ?  <View style={{height: 40, width: 40}} /> : (
                <Notification />
          )}
        </TouchableOpacity>
      ) : (
        props.renderRight
      )}
    </View>
  );
}
