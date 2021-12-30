import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileThumbnail from "assets/Placeholder-5.png";
import ProfileThumbnail1 from "assets/Placeholder-2.png";
import ProfileThumbnail2 from "assets/Placeholder-1.png";
import ProfileThumbnail3 from "assets/Placeholder4.png";
import ProfileThumbnail4 from "assets/Placeholder-6.png";
import ProfileThumbnail5 from "assets/Placeholder-3.png";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { shimmerColor } from "config/colors";
import Image from "react-native-fast-image";
interface Props {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  image6: string | null;
}
export default function ProfileImages(props: Props) {
  const {
    image1 = null,
    image2 = null,
    image3 = null,
    image4 = null,
    image5 = null,
    image6 = null,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.mainImage}>
        <Image
          resizeMode={"cover"}
          source={image1 ? { uri: image1 } : ProfileThumbnail}
          style={styles.profileImage}
        />
      </View>
      <Image
        resizeMode={"cover"}
        source={image2 ? { uri: image2 } : ProfileThumbnail1}
        style={styles.featureFirstImage}
      />
      <Image
        resizeMode={"cover"}
        source={image3 ? { uri: image3 } : ProfileThumbnail2}
        style={styles.featureSecondImage}
      />
      <Image
        resizeMode={"cover"}
        source={image4 ? { uri: image4 } : ProfileThumbnail3}
        style={styles.featureThird}
      />
      <Image
        resizeMode={"cover"}
        source={image5 ? { uri: image5 } : ProfileThumbnail5}
        style={styles.featureForthImage}
      />
      <Image
        resizeMode={"cover"}
        source={image6 ? { uri: image6 } : ProfileThumbnail4}
        style={styles.featureFifthImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
  },
  mainImage: {
    height: 200,
    width: widthPercentageToDP(40),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureFirstImage: {
    left: 0,
    position: "absolute",
    height: 61,
    width: widthPercentageToDP(12),
    bottom: 20,
    backgroundColor: shimmerColor,
  },
  featureSecondImage: {
    left: widthPercentageToDP(7),
    position: "absolute",
    height: 75,
    width: widthPercentageToDP(18),
    top: 40,
    zIndex: -6,
    backgroundColor: shimmerColor,
  },
  featureThird: {
    left: widthPercentageToDP(16),
    position: "absolute",
    height: 75,
    width: widthPercentageToDP(18),
    bottom: 40,
    zIndex: -5,
    backgroundColor: shimmerColor,
  },
  featureForthImage: {
    right: -5,
    position: "absolute",
    height: 75,
    width: widthPercentageToDP(18),
    bottom: 25,
    zIndex: -5,
    backgroundColor: shimmerColor,
  },
  featureFifthImage: {
    right: widthPercentageToDP(15),
    position: "absolute",
    height: 75,
    width: widthPercentageToDP(23),
    top: 50,
    zIndex: -5,
    backgroundColor: shimmerColor,
  },
  profileImage: {
    height: 200,
    width: widthPercentageToDP(40),
    backgroundColor: shimmerColor,
  },
});