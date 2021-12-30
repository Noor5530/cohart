import React, { FC } from 'react';
import { Image, TouchableOpacityProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { shimmerColor, textColor } from '../config/colors';

interface IProps {
  mediaUrl: string;
  onPress: () => {};
  style: ViewStyle;
}

export const defaultcover_image =
  'https://coharttest.blob.core.windows.net/demo-videos/Profile Picture.jpg';
  
export const AvatarImage: FC<TouchableOpacityProps & IProps> =
  (props: IProps) => {
    return (
      <TouchableOpacity
        {...props}
        onPress={props.onPress}
        style={[
          {
            height: 64,
            width: 64,
            borderColor: textColor,
            borderWidth: 1,
            borderRadius: 9999,
          },
          props.style,
        ]}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 9999,
            backgroundColor: shimmerColor,
          }}
          source={{
            uri: props.mediaUrl,
          }}
        />
      </TouchableOpacity>
    );
  };
