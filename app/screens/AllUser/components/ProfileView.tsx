import dummyAvator from 'assets/dummyAvator.png';
import { TouchAble as TouchableOpacity } from 'components/workAround';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-fast-image';

import { appFonts } from '../../../components/text';
import { iconColor } from '../../../config/colors';

interface Props {
  avatar: string;
  name: string;
  userName: string;
  onPress: () => void;
}
export default function ProfileView(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image
        source={props.avatar ? { uri: props.avatar } : dummyAvator}
        style={styles.avatar}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.userName}>
          {props.userName ? '@' + props.userName : ' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingBottom: 20 },
  avatar: {
    width: 33,
    height: 33,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: iconColor,
  },
  mainContainer: { paddingLeft: 20 },
  title: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: appFonts.InterMedium,
    color: iconColor,
  },
  userName: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: appFonts.InterMedium,
    color: iconColor,
  },
});
