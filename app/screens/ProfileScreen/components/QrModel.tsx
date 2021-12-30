import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";
import { backgroundColor } from "config/colors";
import { iconColor, textColor } from "../../../config/colors";
import { appFonts } from "../../../components/text";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
interface Props {
  isVisible: boolean;
  toggleModal: (data: boolean) => void;
  name: string;
  link: string;
  first_name: string;
}
import RNQRGenerator from "rn-qr-generator";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import branch from "react-native-branch";
import Config from "react-native-config";

export default function QrModel({ toggleModal, isVisible, name, link, first_name }: Props) {
  const onToggleModal = () => {
    toggleModal(false);
  };
  const [qrImage, setQrImage] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      generateQrCode();
    }
    return () => {
      setQrImage(null);
    };
  }, [isVisible]);

  const generateQrCode = useCallback(async () => {
    try {
      setLoading(true);
      let response = await RNQRGenerator.generate({
        value: link,
        height: widthPercentageToDP(40),
        width: widthPercentageToDP(40),
        correctionLevel: "H",
      });
      setLoading(false);
      const { uri } = response;

      setQrImage(uri);
    } catch (error) {
      setQrImage(null);
      setLoading(false);
    }
  }, []);
  
  const onClickShare = async () => {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      "canonicalIdentifier",
      {
        locallyIndex: true,
        title: `Artist Profile`,
        contentDescription: `Artist Profile ${first_name}`,
        contentMetadata: {
          customMetadata: {
            username: name,
            deepLinkType: 'ArtistProfile'
          },
        },
      }
    );

    let shareOptions = {
      messageHeader: "Check this out",
      messageBody: "Check out this artist profile on Cohart!",
    };

    let linkProperties = {
      feature: "share",
      channel: "RNApp",
      tags: [name],
    };

    let controlParams;

    if (Config.BUILD === "production") {
      controlParams = {
        $desktop_url: `https://web.cohart.co/${name}`,
        $ios_url: `https://web.cohart.co/${name}`,
        $android_url: `https://web.cohart.co/${name}`,
      };
    } else {
      controlParams = {
        $desktop_url: `https://staging.cohdev.co/${name}`,
        $ios_url: `https://staging.cohdev.co/${name}`,
        $android_url: `https://staging.cohdev.co/${name}`,
      };
    }

    await branchUniversalObject.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams
    );

    onToggleModal();

  }
  return (
    <Modal
      testID={"toggleModel"}
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

        <View
          style={{
            alignSelf: "center",
            width: "80%",
            backgroundColor: backgroundColor,
            paddingVertical: 25,
            borderWidth: 2,
            borderColor: iconColor,
            borderRadius: 10,
            paddingHorizontal: widthPercentageToDP(12),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.description}>web.cohart.co/{name}</Text>
          <View style={styles.center}>
            {loading ? (
              <View
                style={{
                  height: widthPercentageToDP(50),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={iconColor} />
              </View>
            ) : qrImage == null ? (
              <TouchableOpacity
                onPress={generateQrCode}
                style={{
                  height: widthPercentageToDP(50),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={iconColor} />
                <Text style={styles.description}>
                  unable to load please refresh
                </Text>
              </TouchableOpacity>
            ) : (
              <Image
                style={{
                  width: widthPercentageToDP(50),
                  height: widthPercentageToDP(50),
                }}
                source={{ uri: qrImage }}
              />
            )}
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: iconColor,
              width: 108,
              height: 40,
              marginTop: 5,
            }}
            onPress={onClickShare}
          >
            <Text
              style={{
                fontFamily: appFonts.InterRegular,
                fontWeight: "500",
                fontSize: 20,
                textAlign: "center",
                color: textColor,
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "600",
    fontSize: 24,
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
    color: iconColor,
  },
  description: {
    fontFamily: appFonts.InterRegular,
    fontWeight: "400",
    fontSize: 12,

    textAlign: "center",

    color: iconColor,
  },
  center: { alignSelf: "center" },
});
