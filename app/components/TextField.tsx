import { iconColor, textColor } from 'config/colors';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { appFonts } from './text';

interface Props extends TextInputProps {
  isNumber?: boolean;
  value: string;
  setValue: (value: string) => void;
  isValidate: boolean;
  setIsValidate: (value: boolean) => void;
  onSubmit: () => void;
  setError?: (value: string) => void;
  isEmail?: boolean;
  error?: string;
  placeholder: string;
}
export default function TextField(props: Props) {
  const {
    setValue,
    isNumber,
    isEmail,
    isValidate,
    setIsValidate,
    setError,
    onSubmit,
    error,
  } = props;
  const onTextChange = (data: string) => {
    if (setError) {
      setError('');
    }
    if (isNumber) {
      const cleaned = ('' + data).replace(/\D/g, '');
      const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        const intlCode = match[1] ? '' : '',
          number = [intlCode, match[2], '-', match[3], '-', match[4]].join('');

        setValue(number);
        return;
      }
      setValue(data);
    } else if (isEmail) {
      if (
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.trim(),
        )
      ) {
        setIsValidate(true);
      } else {
        setIsValidate(false);
      }
      setValue(data.trim());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={onTextChange}
        {...props}
      />
      {isValidate && (
        <TouchableOpacity style={styles.validate} onPress={onSubmit}>
          <AntDesign name={'check'} color="black" size={30} />
        </TouchableOpacity>
      )}
      {error !== '' && (
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: wp('2.5'),
              color: textColor,
              textAlign: 'left',

              paddingLeft: 20,
              paddingTop: 5,
            }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    width: '100%',
    paddingLeft: 42,
    paddingRight: 41,
    flexDirection: 'row',
  },
  textField: {
    width: '100%',
    height: 51.42,
    borderRadius: 14.4067,
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    paddingLeft: 33,
    backgroundColor: textColor,
    fontWeight: 'normal',
    fontSize: 19.209,
    color: iconColor,
    borderWidth: 1.20056,
    borderColor: iconColor,
  },
  validate: {
    width: 42.02,
    height: 49,
    backgroundColor: '#e6ff00',
    position: 'absolute',
    borderBottomRightRadius: 14.4067,
    borderTopRightRadius: 14.4067,

    right: 41,
    top: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
