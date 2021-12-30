import React from 'react';
import { View, StyleSheet } from 'react-native';

import { textColor } from '../../config/colors';

export default function Vector() {
  return (
    <View>
      <View
        style={[
          styles.vectorLine,
          {
            transform: [{ rotate: '90deg' }],
          },
        ]}
      />
      <View
        style={[
          styles.vectorLine,
          {
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
      <View style={[styles.vectorLine]} />
    </View>
  );
}

const styles = StyleSheet.create({
  vectorLine: {
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 127,
    backgroundColor: textColor,
  },
});
