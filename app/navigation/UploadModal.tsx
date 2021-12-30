import React from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import Modal from "react-native-modal";
import { backgroundColor, neonYellow } from "config/colors";
import { iconColor, profileColor } from "config/colors";
import { appFonts } from "components/text";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { check, PERMISSIONS } from "react-native-permissions";
import { permissionAlert } from "lib/isIphone";
import { enableSnackBar } from "../store/actions/snackBarAction";
import { useDispatch } from "react-redux";
import ImageCropPicker from "react-native-image-crop-picker";

interface Props extends BottomTabBarProps {
  isVisible: boolean;
  toggleModal: (data: boolean) => void;
}
export default function QrModel({ toggleModal, isVisible, navigation }: Props) {
  const onToggleModal = () => {
    toggleModal(false);
  };
  const dispatch = useDispatch();
  const pickVideo = () => {
    ImageCropPicker.openPicker({
      mediaType: "video",
      compressVideoPreset: "HighestQuality",
    })
      .then((response) => {
        if (
          response.mime.split("/")[0] == "image" ||
          response?.duration <= 30000
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
        if (error?.message == "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          dispatch(enableSnackBar(error?.message));
        }
      });
  };

  const permissionCheck = () => {
    toggleModal(false);
    setTimeout(() => {
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
    }, 500);
  };
  const pickAtWork = () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
    })
      .then((response) => {
        navigation.navigate("AddPortfolio", {
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
  };
  const pickPicture = () => {
    toggleModal(false);
    setTimeout(() => {
      if (Platform.OS == "ios") {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
          if (result == "limited") {
            permissionAlert();
          } else {
            pickAtWork();
          }
        });
      } else {
        pickAtWork();
      }
    }, 500);
  };

  return (
    <Modal
      onBackButtonPress={onToggleModal}
      onBackdropPress={onToggleModal}
      isVisible={isVisible}
      onSwipeMove={onToggleModal}
      onSwipeCancel={onToggleModal}
      deviceWidth={widthPercentageToDP(100)}
      deviceHeight={heightPercentageToDP(100)}
      propagateSwipe={true}
      style={{
        height: heightPercentageToDP(100),
      }}
    >
      <Pressable
        onPress={onToggleModal}
        style={styles.container}>
        <View style={styles.innerContainer}>

          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonStyle} onPress={permissionCheck}>
              <Text style={styles.description}>Upload SnapShot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={pickPicture}>
              <Text style={styles.description}>Upload ArtWork</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onToggleModal}>
            <Text style={[styles.description, { color: profileColor }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(100),
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    paddingVertical: 25,

    backgroundColor: backgroundColor,
    width: "80%",
    borderRadius: 20,
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "600",
    fontSize: 24,

    textAlign: "center",

    color: iconColor,
  },
  description: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "bold",
    fontSize: 13,
    paddingVertical: 5,
    textAlign: "center",

    color: iconColor,
  },
  center: { alignSelf: "center" },
  buttonStyle: {
    padding: 3,
    borderWidth: 0.5,
    width: widthPercentageToDP('35'),
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: neonYellow,
    marginVertical: 7,
  }
});
