import { PhoneNumberUtil } from "google-libphonenumber";
import React, { PureComponent } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import CountryPicker, {
  CountryModalProvider,
  DARK_THEME,
  DEFAULT_THEME,
  Flag,
  getCallingCode,
} from "react-native-country-picker-modal";
import { CountryFilterProps } from "react-native-country-picker-modal/lib/CountryFilter";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./styles";

const phoneUtil = PhoneNumberUtil.getInstance();

interface IProps {
  value?: string;
  defaultValue?: string;
  defaultCode?: string;
  disabled?: boolean;
  onChangeText: (text: string) => void;
  onChangeFormattedText: (text: string) => void;
  onChangeCountry: (country: string) => void;
  maxLength: number;
  layout: string;
  flagSize: number;
  withShadow: boolean;
  withDarkTheme: boolean;
  codeTextStyle: TextStyle;
  textInputProps: TextInputProps;
  textInputStyle: TextStyle;
  autoFocus: boolean;
  placeholder: string;
  disableArrowIcon: boolean;
  containerStyle: ViewStyle;
  textContainerStyle: TextStyle;
  renderDropdownImage: () => {};
  countryPickerProps: any;
  filterProps: CountryFilterProps;
  countryContainerStyle: ViewStyle;
  setCountryCode?(countryCode: string): void;
}

interface IState {
  code?: string;
  number: string;
  modalVisible: boolean;
  countryCode: string;
  disabled: boolean;
}

export default class PhoneInput extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      code: props.defaultCode ? undefined : "91",
      number: props.value
        ? props.value
        : props.defaultValue
        ? props.defaultValue
        : "",
      modalVisible: false,
      countryCode: props.defaultCode ? props.defaultCode : "IN",
      disabled: props.disabled || false,
    };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.disabled !== prevState.disabled) {
      if (
        (nextProps.value || nextProps.value === "") &&
        nextProps.value !== prevState.number
      ) {
        return { disabled: nextProps.disabled, number: nextProps.value };
      }
      return { disabled: nextProps.disabled };
    }
    return null;
  }

  async componentDidMount() {
    const { defaultCode } = this.props;
    if (defaultCode) {
      // TODO :Duplicate with below function getCallingCode - Need clarify
      const code = await getCallingCode(defaultCode);
      this.setState({ code });
    }
  }

  getCountryCode = () => {
    return this.state.countryCode;
  };

  getCallingCode = () => {
    return this.state.code;
  };

  isValidNumber = (number: string) => {
    try {
      const { countryCode } = this.state;
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  };

  onSelect = (country: any) => {
    const { onChangeCountry } = this.props;
    this.setState(
      {
        countryCode: country.cca2,
        code: country.callingCode[0],
      },
      () => {
        const { onChangeFormattedText } = this.props;
        if (onChangeFormattedText) {
          if (country.callingCode[0]) {
            onChangeFormattedText(
              `+${country.callingCode[0]}${this.state.number}`
            );
          } else {
            onChangeFormattedText(this.state.number);
          }
        }
      }
    );
    if (onChangeCountry) {
      onChangeCountry(country);
    }
  };

  onChangeText = (text: string) => {
    this.setState({ number: text });
    const { onChangeText, onChangeFormattedText, setCountryCode } = this.props;
    if (onChangeText) {
      onChangeText(text);
    }
    if (setCountryCode) {
      setCountryCode(`+${this.state.code}`);
    }
    if (onChangeFormattedText) {
      const { code } = this.state;
      if (code) {
        onChangeFormattedText(text.length > 0 ? `+${code}${text}` : text);
      } else {
        onChangeFormattedText(text);
      }
    }
  };

  getNumberAfterPossiblyEliminatingZero() {
    let { number, code } = this.state;
    if (number.length > 0 && number.startsWith("0")) {
      number = number.substr(1);
      return { number, formattedNumber: code ? `+${code}${number}` : number };
    } else {
      return { number, formattedNumber: code ? `+${code}${number}` : number };
    }
  }

  renderDropdownImage = () => {
    return <AntDesign name={"down"} size={20} color="black" />;
  };

  renderFlagButton = () => {
    const { layout = "first", flagSize } = this.props;
    const { countryCode } = this.state;
    if (layout === "first") {
      return (
        <Flag countryCode={countryCode} flagSize={flagSize ? flagSize : 22} />
      );
    }
    return null;
  };

  render() {
    const {
      withShadow,
      withDarkTheme,
      codeTextStyle,
      textInputProps,
      textInputStyle,
      autoFocus,
      placeholder,
      disableArrowIcon,
      containerStyle,
      textContainerStyle,
      renderDropdownImage,
      countryPickerProps = {},
      filterProps = {},
    } = this.props;
    const { modalVisible, code, countryCode, disabled } = this.state;
    return (
      <CountryModalProvider>
        <View
          style={[
            styles.container,
            withShadow ? styles.shadow : {},
            containerStyle ? containerStyle : {},
          ]}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              backgroundColor: "#F6F6F6",
              ...this.props.countryContainerStyle,
            }}
            disabled={disabled}
            onPress={() => this.setState({ modalVisible: true })}
          >
            {!disableArrowIcon && (
              <React.Fragment>
                {renderDropdownImage
                  ? renderDropdownImage
                  : this.renderDropdownImage()}
              </React.Fragment>
            )}
            <CountryPicker
              onSelect={this.onSelect}
              withEmoji
              withFilter
              withFlag
              filterProps={filterProps}
              countryCode={countryCode}
              withCallingCode
              disableNativeModal={disabled}
              visible={modalVisible}
              theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
              renderFlagButton={this.renderFlagButton}
              onClose={() => this.setState({ modalVisible: false })}
              {...countryPickerProps}
            />

            <Text
              style={[codeTextStyle ? codeTextStyle : {}]}
            >{`+${code}`}</Text>
          </TouchableOpacity>

          <View
            style={[
              styles.textContainer,
              textContainerStyle ? textContainerStyle : {},
            ]}
          >
            <TextInput
              testID={"phoneInputText"}
              style={[styles.numberText, textInputStyle ? textInputStyle : {}]}
              placeholder={placeholder ? placeholder : "Phone Number"}
              onChangeText={this.onChangeText}
              value={this.props.value}
              editable={disabled ? false : true}
              selectionColor="black"
              keyboardAppearance={withDarkTheme ? "dark" : "default"}
              keyboardType="number-pad"
              autoFocus={autoFocus}
              {...textInputProps}
              maxLength={this.props.maxLength ? this.props.maxLength : 25}
            />
          </View>
        </View>
      </CountryModalProvider>
    );
  }
}

export const isValidNumber = (number: string, countryCode: string) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};
