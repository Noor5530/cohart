import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { appFonts } from '../../components/text';
import { textColor } from '../../config/colors';
import Avatar from './Avatar';

//import ProfileMonogram from 'assets/ProfileMonogram.png';
interface Props {
  description: string;
  user: object;
}
export default function Container(props: Props) {
  const { description, user } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1410F8', '#1410EF', '#110FCE']}
        style={styles.linearGradient}>
        <View style={styles.linearGradientContainer}>
          <ProfileMonogram />
          <View
            style={[
              {
                position: 'absolute',
                height: hp('22'),
                width: 1,
                // transform: [{ rotate: '90deg' }],
                top: 80,
              },
              styles.vectorLine,
            ]}
          />
        </View>

        <Text
          style={{
            color: textColor,
            fontSize: hp('3%'),
            paddingHorizontal: wp('5%'),
            textAlign: 'center',
            fontFamily: appFonts.InterRegular,
          }}>
          {description
            ? description
            : 'You are now following Austyn and can chat once she connects with you.'}
        </Text>
        <View />
      </LinearGradient>
      <Avatar photo={user?.cover_image} style={{ top: -20 }} />
    </View>
  );
}

const ProfileMonogram = () => {
  return (
    <View style={{ paddingTop: hp('11%') }}>
      <View
        style={[
          {
            transform: [{ rotate: '45deg' }],
          },
          styles.vectorLine,
        ]}
      />
      <View
        style={[
          {
            transform: [{ rotate: '135deg' }],
          },
          styles.vectorLine,
        ]}
      />
      <View
        style={[
          {
            top: -3,
            width: 127,
          },
          styles.vectorLine,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp('85') - 130,
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
  },
  linearGradientContainer: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingTop: hp('13'),
  },
  vectorLine: {
    borderWidth: 1,
    borderColor: '#ffffff',
    // width: 127,
    backgroundColor: textColor,
  },
});
