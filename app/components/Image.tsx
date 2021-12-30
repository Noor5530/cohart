import React, { useEffect, useState } from 'react';
import { memo, useRef } from 'react';
import { Image, ImageProps, ImageStyle } from 'react-native';

import { shimmerColor } from '../config/colors';
import AnimatedImage from './AnimatedImage';

interface Props extends ImageProps {
  height: number;
  width: number;
  thumbnail: null;
  imageWidth: number;
  imageHeight: number;
  style: ImageStyle;
}
const resolveAssetSource = Image.resolveAssetSource;

const ImageComponent = (props: Props) => {
  const { style, height = 0, width = 0 } = props;
  const [isLoading, setIsLoading] = useState(props.source.uri ? true : false);
  //const [isError, setIsError] = useState(false);
  const [imageHeight, setScalableHeight] = useState(height);
  const [imageWidth, setScalableWidth] = useState(width);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (props.imageHeight && props.imageWidth) {
      adjustSize(props.imageWidth, props.imageHeight);
    } else {
      setHeightWidth();
    }
  });
  const setHeightWidth = () => {
    const { source } = props;
    if (source.uri) {
      const sourceToUse = source.uri;

      Image.getSize(sourceToUse, (currentWidth, currentHeight) => {
        if (mounted.current) {
          adjustSize(currentWidth, currentHeight);
        }
      });
    } else {
      const sourceToUse = resolveAssetSource(source);
      if (mounted.current) {
        adjustSize(sourceToUse.width, sourceToUse.height);
      }
    }
  };
  const adjustSize = (sourceWidth, sourceHeight) => {
    // const { width, height } = props;

    let ratio = 1;
    if (width && height) {
      ratio = Math.min(width / sourceWidth, height / sourceHeight);
    } else if (width) {
      ratio = width / sourceWidth;
    } else if (height) {
      ratio = height / sourceHeight;
    }

    if (!isNaN(ratio)) {
      const computedWidth = sourceWidth * ratio;
      const computedHeight = sourceHeight * ratio;
      setScalableWidth(computedWidth);
      setScalableHeight(computedHeight);
    }
  };
  return (
    <AnimatedImage
      thumbnail={props.thumbnail}
      uri={props.source.uri}
      blurRadius={isLoading ? 10 : 0}
      {...props}
      source={props.source}
      resizeMode={'cover'}
      style={[
        style,
        {
          width: imageWidth,
          height: imageHeight,
          backgroundColor: shimmerColor,
        },
      ]}
      // source={props?.source}
      onLoad={() => {
        setIsLoading(false);
      }}
    />
  );
};

export default memo(ImageComponent);
