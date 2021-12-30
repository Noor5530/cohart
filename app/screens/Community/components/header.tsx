import Star from 'assets/Start_black.png';
import { Notification } from 'components/SvgIcons';
import { appFonts, AppText } from 'components/text';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { iconColor } from '../../../config/colors';

export default function header() {
  return (
    <View
      style={{
        height: 28,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 22,
      }}>
      <TouchableOpacity>
        <Image
          source={Star}
          style={{
            height: 18,
            width: 18,
          }}
        />
      </TouchableOpacity>
      <AppText
        style={{
          color: iconColor,
          fontSize: 20,
          fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
        }}>
        COHART
      </AppText>
      <TouchableOpacity
        // onPress={onPressNotification}
        style={{ paddingHorizontal: 10 }}
      >
        <Notification />
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Image
          source={Menu}
          style={{
            height: 18,
            width: 18,
          }}
        />
      </TouchableOpacity> */}
    </View>
  );
}
