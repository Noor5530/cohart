import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SnapshotProps } from "../types";
import AnimatedImage from "components/AnimatedImage";
import { TouchableOpacity, StyleSheet } from "react-native";
import { shimmerColor } from "config/colors";
const Snapshot = (props: SnapshotProps) => {
  const { item, currentUser, index } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("SnapShotView", {
      post: item,
      back: true,
      currentUser: currentUser,
      postId: item?._id,
      postIndex: index
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

export default Snapshot;

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: "100%",
    backgroundColor: "white"
  },
  image: { flex: 1, margin: 10, backgroundColor: shimmerColor },
});
