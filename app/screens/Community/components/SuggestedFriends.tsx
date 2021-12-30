import { RightIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { borderColor, iconColor, shimmerColor } from 'config/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  toggleModel: (value: boolean) => void;
  setFriendListModel: (value: boolean) => void;
  setModelHeaderText: (value: string) => void;
  setModalType: (value: string) => void;
  setSelectCategories: (value: string) => void;
  item: object;
}
export default function SuggestedFriends(props: Props) {
  const {
    setFriendListModel,
    setModelHeaderText,
    setModalType,
    setSelectCategories,
    toggleModel,
  } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        toggleModel(true);
        setModelHeaderText('Suggested Connections');
        setFriendListModel(true);
        setModalType('suggestedConnections');
        setSelectCategories(props.item);
      }}>
      <FastImage style={styles.image} source={{ uri: props?.item?.image }} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{props.item.title}</Text>
        <TouchableOpacity style={{ paddingLeft: 8 }}>
          <RightIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 139,
    height: 216,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#0033f7',
  },
  image: {
    width: '100%',
    height: 185,
    backgroundColor: shimmerColor,
  },
  footer: {
    width: '100%',
    height: 31,
    flexDirection: 'row',
    borderTopColor: iconColor,
    borderTopWidth: 1,
    paddingLeft: 14,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 10,
    color: borderColor,
    textAlign: 'center',
  },
});
