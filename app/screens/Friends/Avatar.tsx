import React, { useState, useEffect } from "react";
import { ViewStyle, StyleSheet, Image } from "react-native";
import dummyAvator from "assets/dummyAvator.png";

import { shimmerColor } from "../../config/colors";

interface Props {
  style?: ViewStyle;
  imageStyle?: ViewStyle;
  photo: string;
}
export default function Avatar(props: Props) {
  const { style } = props;
  const [image, setImage] = useState<undefined | string>(undefined);
  useEffect(() => {
    setImage(props.photo);
    return () => {
      setImage(undefined);
    };
  }, [props.photo]);

  return (
    <Image
    style={[
      styles.imageView,
      {
        ...style,
      },
    ]}
    source={image != undefined && image != null?{ uri: image } :dummyAvator}
    resizeMode="cover"
  />
  );
}

const styles = StyleSheet.create({
  imageView: {
    width: 134,
    height: 134,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 104.576,
    position: "absolute",
    backgroundColor: shimmerColor,
    zIndex: 2,
  },
});
