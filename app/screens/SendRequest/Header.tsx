import { iconColor } from 'config/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { appFonts } from '../../components/text';

interface Props {
  description: string;
  goBack: () => void;
}

export default function Header(props: Props) {
  const { description } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: hp('15%'),
    justifyContent: 'center',
  },
  text: {
    color: iconColor,
    fontSize: hp('3.5%'),
    alignSelf: 'center',
    fontFamily: appFonts.InterBold,
    textAlign: 'center',
    paddingHorizontal: 41,
  },
});
