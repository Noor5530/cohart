import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Image, { FastImageProps } from 'react-native-fast-image';

interface Props extends Partial<FastImageProps> {
  thumbnail: string;
  uri: string;
}
export default function AnimatedImage(props: Props) {
  const { style, uri, thumbnail } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const onImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  };
  return (
    <>
      {isLoaded === false ? (
        <Image
          style={[
            styles.imageOverlay,
            { opacity: 1, backgroundColor: "#e1e4e8" },
            style,
          ]}
          blurRadius={3}
          resizeMode="cover"
          source={{
            uri: thumbnail,
            priority: Image.priority.low,
          }}
        />
      ) : null}
      <Image
        onLoad={onImageLoad}
        style={[style]}
        source={{ uri: uri }}
        resizeMode="cover"
        onError={() => {
          setIsLoaded(false);
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        zIndex: 4,
        alignSelf: 'center',
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});
