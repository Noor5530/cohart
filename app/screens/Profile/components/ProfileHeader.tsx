import { appFonts } from 'components/text';
import { primary } from 'config/colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { iconColor } from '../../../config/colors';

interface Props {
  heading: string;
  description: string;
}
const Profile: React.FC<Props> = (props: Props) => {
  const { heading, description } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('assets/profileHeaderIcon.png')}
      />
      <View>
        <Text style={styles.header}>{heading}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 216.05,
    backgroundColor: primary,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  logo: {
    width: 88,
    height: 154,
    position: 'absolute',
    bottom: -10,
    right: 0,
  },
  header: {
    paddingLeft: 38,
    fontFamily: appFonts.InterBold,
    height: 19,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 19,

    textTransform: 'uppercase',

    color: iconColor,
  },
  description: {
    fontFamily: appFonts.InterRegular,
    paddingLeft: 38,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 8.28337,
    paddingTop: 12,
    lineHeight: 12 /* identical to box height */,

    textTransform: 'uppercase',

    color: iconColor,
  },
});
