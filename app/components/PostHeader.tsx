import { useNavigation } from '@react-navigation/native';
import { CheckMarkIcon, CrossIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { isIphone } from 'lib/isIphone';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
  back?: boolean;
  color?: string;
  textColor?: string;
  label?: string;
  textStyle: TextStyle;
  title?: string;
  checkMark?: boolean;
  onPress?: () => void;
  renderLeft: React.ReactNode;
  renderRight: React.ReactNode;
  onPressLeft: () => void;
  titleStyle: TextStyle;
}
export default function Header(props: Props) {
    const navigation = useNavigation();

    const { style, textColor = 'white', title } = props;

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                height: 80,
                backgroundColor: textColor,
                paddingTop: isIphone() + 10,

                ...style,
            }}>
            <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                    if (props.onPressLeft) {
                        props.onPressLeft();
                    } else {
                        navigation.goBack();
                    }
                }}>
                {props.renderLeft ? (
                    props.renderLeft
                ) : (
                    <CrossIcon color={'#0033F7'} />
                )}
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    style={{
                        color: textColor,
                        fontSize: 20,
                        fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                        ...props.titleStyle,
                    }}>
                    {title ? title : 'COHART'}
                </Text>
            </View>

            <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                    props.onPress();
                    // actionSheetRef.current?.setModalVisible();
                }}>
                {props.renderRight ? (
                    props.renderRight
                ) : (
                    <CheckMarkIcon
                        color={'#0033F7'}
                        width={'25'}
                        height={'25'}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}
