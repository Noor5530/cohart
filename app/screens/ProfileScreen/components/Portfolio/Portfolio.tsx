import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PortFolioProps } from "../../types";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AnimatedImage from "components/AnimatedImage";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import { shimmerColor, profileColor } from "config/colors";
import { appFonts } from "components/text";
import { textColor } from "config/colors";
import { useSelector } from "react-redux";
import AppState from 'models/reducers/index'
const Snapshot = (props: PortFolioProps) => {
  const { item: post } = props;
  const navigation = useNavigation();
  const [height, setHeight] = useState(160);
  const user = useSelector((state: AppState) => state.user)
  const onPress = () => {
    navigation.navigate('AddPortfolio', {
      mediaUrl: props.item?.post_image,
      data: props.item,
      isPreView: true,
      editView: false,
      userWork: true,
      userData: user,
    });
  };

  useLayoutEffect(() => {
    if (!post?.resize_height || !post.orignal_height) {
      Image.getSize(post?.post_image, (imageWidth, height) => {
        const currentWidth = (height * widthPercentageToDP(50)) / imageWidth;
        if (!isNaN(currentWidth)) {
          setHeight(currentWidth);
        }
      });
    } else {
      let calculatedHeight =
        post?.resized_image_path && post?.resize_height
          ? post?.resize_width
          : post?.post_image && post.orignal_height
          ? post.orignal_width
          : 160;
      const width =
        post?.resized_image_path && post?.resize_width
          ? post?.resize_height
          : post?.post_image && post.orignal_width
          ? post.orignal_height
          : 160;
      const currentHeigh = (calculatedHeight * widthPercentageToDP(50)) / width;
      if (!isNaN(currentHeigh)) {
        setHeight(currentHeigh);
      }
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { height: height }]}
    >
      {post.price && post.price != "" ? (
        <View
          style={{
            position: "absolute",
            top: 26,
            right: 26,
            zIndex: 5,
            backgroundColor: profileColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              fontFamily: appFonts.InterRegular,

              padding: 5,
              color: textColor,
            }}
          >
            {post.price}
          </Text>
        </View>
      ) : null}

      <AnimatedImage
        thumbnail={
          post?.resized_image_path ? post?.resized_image_path : post?.post_image
        }
        style={styles.image}
        resizeMode="cover"
        uri={
          post?.resized_image_path ? post?.resized_image_path : post?.post_image
        }
      />
    </TouchableOpacity>
  );
};

export default Snapshot;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(50),
    backgroundColor: "white",
  },
  image: { flex: 1, margin: 5, backgroundColor: shimmerColor },
});
