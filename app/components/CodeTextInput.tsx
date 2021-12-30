import { iconColor } from 'config/colors';
import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { requestLogin } from 'store/actions/userActions';

import { appFonts } from './text';

interface Props extends TextInputProps {
  phone_number: string;
  createWithCode: boolean;
  countryCode: number;
  number: number;
}
export default function CodeTextInput(props: Props) {
  const [value, setValue] = useState(['', '', '', '', '', '']);
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const dispatch = useDispatch();

  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('4'),
        marginTop: hp('3'),
      }}>
      <TextInput
        value={value[0]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        autoFocus={true}
        //   onSubmitEditing={() => ref_input2.current.focus()}
        ref={ref_input1}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[0] = text;
            return data;
          });
          if (text.length !== 0) {
            ref_input2.current.focus();
          }
        }}
      />
      <TextInput
        value={value[1]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        ref={ref_input2}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[1] = text;
            return data;
          });
          if (text.length === 0) {
            ref_input1.current.focus();
          } else {
            ref_input3.current.focus();
          }
        }}
      />
      <TextInput
        value={value[2]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        ref={ref_input3}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[2] = text;
            return data;
          });
          if (text.length === 0) {
            ref_input2.current.focus();
          } else {
            ref_input4.current.focus();
          }
        }}
      />
      <TextInput
        value={value[3]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        ref={ref_input4}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[3] = text;
            return data;
          });
          if (text.length === 0) {
            ref_input3.current.focus();
          } else {
            ref_input5.current.focus();
          }
        }}
      />
      <TextInput
        value={value[4]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        ref={ref_input5}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[4] = text;
            return data;
          });
          if (text.length === 0) {
            ref_input4.current.focus();
          } else {
            ref_input6.current.focus();
          }
        }}
      />
      <TextInput
        value={value[5]}
        style={styles.textInput}
        placeholder={'X'}
        keyboardType={'number-pad'}
        ref={ref_input6}
        maxLength={1}
        onChangeText={text => {
          setValue(prv => {
            const data = [...prv];
            data[5] = text;
            return data;
          });
          if (text.length === 0) {
            ref_input5.current.focus();
          } else {
            const data = [...value];

            const index = value.splice(0, 5).findIndex(item => item === '');
            if (index == -1) {
              Keyboard.dismiss();
              data[5] = text;

              dispatch(
                requestLogin({
                  code: data,
                  createWithCode: props.createWithCode ? true : false,
                  phone_number: props.phone_number,
                  country_code: props.countryCode,
                  number: props.number,
                }),
              );
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 14.4067,
    width: wp('12'),
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontSize: wp('5'),
    paddingLeft: wp('4.5'),
  },
});
