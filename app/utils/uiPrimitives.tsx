import { textColor } from 'config/colors';
import React, { FC, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { iconColor } from '../config/colors';

interface ITextInputProps extends TextInputProps {
  style: ViewStyle
}

export const Input: FC<ITextInputProps> = (props: ITextInputProps) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

interface IDashBoxProps extends ViewProps {
  children: JSX.Element
}

export const DashBox: FC<IDashBoxProps> = (props: IDashBoxProps) => {
  return (
    <View {...props}>
      <DashLine style={styles.firstDashLine} />
      <DashLine style={styles.secondDashLine} />
      <DashLine vertical style={styles.leftDashLine} />
      <DashLine vertical style={styles.rightDashLine} />
      {props.children}
    </View>
  );
};

interface IDashLineProps extends ViewProps {
  vertical?: boolean;
}

export const DashLine: FC<IDashLineProps> = (props: IDashLineProps) => {
  const dashLength = 15;
  const [dashCount, setDashCount] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { layout } = e.nativeEvent;
    const longSide = props.vertical ? layout.height : layout.width;
    setDashCount(Math.round((longSide / dashLength) * 0.6));
  };

  const dashes = [];
  for (let i = 0; i < dashCount; i++) {
    const length = i === 0 || i === dashCount - 1 ? dashLength / 2 : dashLength;
    dashes.push(
      <View
        key={i}
        style={[
          styles.lineColor,
          props.vertical
            ? { height: length, width: '100%' }
            : { width: length, height: '100%' },
        ]}
      />,
    );
  }

  return (
    <View
      {...props}
      onLayout={onLayout}
      style={[
        {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: 2,
        },
        props.vertical
          ? {
              height: '100%',
              width: 2,
            }
          : { flexDirection: 'row' },
        props.style,
      ]}>
      {dashes}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: textColor,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  firstDashLine: { position: 'absolute', top: 0 },
  secondDashLine: { position: 'absolute', bottom: 0 },
  leftDashLine: { position: 'absolute', left: 0 },
  rightDashLine: { position: 'absolute', right: 0 },
  lineColor: { backgroundColor: iconColor },
});
