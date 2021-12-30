import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { iconColor } from '../config/colors';
import { appFonts } from './text';

interface Props {
  style?: ViewStyle;
  back?: boolean;
  color?: string;
  textColor?: string;
  label?: string;
  textStyle: TextStyle;
  title?: string;
  iconStyle: ImageStyle;
  visibleDot: boolean;
  icon: ImageSourcePropType;
  renderIcon: React.ReactNode;
  drawer: boolean;
}
export default function Header(props: Props) {
  const { style, icon } = props;

  return (
<View
      style={{
        paddingTop: 35,
          alignSelf: 'center',
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          borderBottomWidth: 2,
        borderColor: iconColor,
          ...style,
        }}>
        <Text
          numberOfLines={3}
          style={{
            fontSize: wp('11'),
            ...props.textStyle,
            fontFamily: appFonts.InterBold,
            textAlign: 'left',
            maxWidth: '90%',
          }}>
          {props.title}
        </Text>

        <View style={{ height: '100%' }}>
          {props.renderIcon
            ? props.renderIcon
            : props.icon && (
                <Image
                  resizeMode={'contain'}
                  style={{
                    width: wp('15'),
                    height: wp('15'),
                    marginTop: 5,
                    ...props.iconStyle,
                  }}
                  source={icon}
                />
              )}
        </View>
      </View>

);
}
