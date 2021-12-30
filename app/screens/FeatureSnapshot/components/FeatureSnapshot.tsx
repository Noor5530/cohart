import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FeatureSnapshotProps } from "../types";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AnimatedImage from "components/AnimatedImage";
import { TouchableOpacity, StyleSheet } from "react-native";
import { shimmerColor } from "../../../config/colors";
const FeatureSnapshotList = (props: FeatureSnapshotProps) => {
  const { item } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("NewPostPreview", {
      post: item,
      back: true,
      from: "featureSnapshot",
    });
  };
  return (
    <TouchableOpacity
      testID="featureSnapShots"
      onPress={onPress}
      style={styles.container}
    >
      <AnimatedImage
        thumbnail={item?.jw_media_thumb}
        style={styles.image}
        resizeMode="cover"
        uri={item?.jw_media_thumb}
      />
    </TouchableOpacity>
  );
};

export default FeatureSnapshotList;

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: widthPercentageToDP(31),
    backgroundColor: "white",
  },
  image: { flex: 1, margin: 5, backgroundColor: shimmerColor },
});
