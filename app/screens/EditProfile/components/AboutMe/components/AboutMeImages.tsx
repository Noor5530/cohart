import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import ProfileThumbnail from "assets/Placeholder-5.png";
import ProfileThumbnail1 from "assets/Placeholder-2.png";
import ProfileThumbnail2 from "assets/Placeholder-1.png";
import ProfileThumbnail3 from "assets/Placeholder-4.png";
import ProfileThumbnail4 from "assets/Placeholder-6.png";
import ProfileThumbnail5 from "assets/Placeholder-3.png";
import EditIcon from "assets/ic_edit.png";

import FastImage from "react-native-fast-image";
import { ActivityIndicator } from "react-native-paper";

import styles from "./style";
import { neonYellow } from "config/colors";

interface Props {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
  image6: string | null;
  pickImages(imgNum: any): () => void;
  imageLoading: string[];
}
export default function AboutMeImages(props: Props) {
  const {
    image1 = "",
    image2 = "",
    image3 = "",
    image4 = "",
    image5 = "",
    image6 = "",
    pickImages,
    imageLoading,
  } = props;

  console.log(image1)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainImage}
        disabled={imageLoading.includes("1")}
        onPress={pickImages(1)}
      >
        <FastImage
          resizeMode={"cover"}
          source={image1 ? { uri: image1 } : ProfileThumbnail}
          style={styles.profileImage}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("1") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled={imageLoading.includes("2")} style={styles.firstImage} onPress={pickImages(2)}>
        <FastImage
          resizeMode={"cover"}
          source={image2 ? { uri: image2 } : ProfileThumbnail1}
          style={styles.featureFirstImage}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("2") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled={imageLoading.includes("3")} style={styles.secondImage} onPress={pickImages(3)}>
        <FastImage
          resizeMode={"cover"}
          source={image3 ? { uri: image3 } : ProfileThumbnail2}
          style={styles.featureSecondImage}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("3") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled={imageLoading.includes("4")} style={styles.thirdImage} onPress={pickImages(4)}>
        <FastImage
          resizeMode={"cover"}
          source={image4 ? { uri: image4 } : ProfileThumbnail3}
          style={styles.featureThird}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("4") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity disabled={imageLoading.includes("5")} style={styles.forthImage} onPress={pickImages(5)}>
        <FastImage
          resizeMode={"cover"}
          source={image5 ? { uri: image5 } : ProfileThumbnail5}
          style={styles.featureForthImage}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("5") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity disabled={imageLoading.includes("6")} style={styles.fifthImage} onPress={pickImages(6)}>
        <FastImage
          resizeMode={"cover"}
          source={image6 ? { uri: image6 } : ProfileThumbnail4}
          style={styles.featureFifthImage}
        />
        <View style={styles.overlay}>
          {imageLoading.includes("6") ? (
            <ActivityIndicator color={neonYellow} size="small" />
          ) : (
            <Image source={EditIcon} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
