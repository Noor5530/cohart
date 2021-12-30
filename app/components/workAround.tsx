import React, { ReactNode, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  InteractionManager,
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  FlatList as RNFlatList,
  ScrollView as RNScrollView,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface TouchProps extends TouchableOpacityProps {
    children: ReactNode;
}
interface ListProps extends FlatListProps<any> {
    children: ReactNode;
}
export function TouchAble(props: TouchProps) {
    if (Platform.OS === 'android') {
        return (
            //@ts-ignore
            <RNTouchableOpacity {...props}>{props.children}</RNTouchableOpacity>
        );
    } else {
        return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
    }
}
export function List(props: ListProps) {
    if (Platform.OS === 'android') {
        return <RNFlatList {...props}>{props.children}</RNFlatList>;
    } else {
        return <FlatList {...props}>{props.children}</FlatList>;
    }
}

export function Scroll(props: ListProps) {
    if (Platform.OS === 'android') {
        return <RNScrollView {...props}>{props.children}</RNScrollView>;
    } else {
        return (
            <KeyboardAwareScrollView {...props}>
                {props.children}
            </KeyboardAwareScrollView>
        );
    }
}
interface ContainerProps {}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    const [load, setLoading] = useState(false);
    useLayoutEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setLoading(true);
        });
        [];
    });
    if (!load) {
        return null;
    }
    return children;
};
