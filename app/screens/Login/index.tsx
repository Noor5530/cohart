import { useNavigation, useRoute } from "@react-navigation/native";
import Arrow from "assets/Arrow_Left.png";
import StatusBar from "components/CustomStatusBar";
import TextField from "components/PhoneTextInput";
import { RequestOTPType } from "enums/request_otp_type";
import { IRequestOtpPayload } from "models/actions/user";
import { LoginScreenRouteProps } from "navigation/types";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp } from "store/actions/userActions";

import { textColor } from "../../config/colors";
import AppState from "../../models/reducers";
import styles from "./styles";

const Login: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<LoginScreenRouteProps>();
  const [isTermsConditionSelected, setTermsCondition] =
    React.useState<boolean>(false);
  const token = useSelector((state: AppState) => state.user.token);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const dispatch = useDispatch();
  const phoneInput = React.useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = React.useState("");
  const onSubmit = () => {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (regex.test(formattedValue)) {
      const requestOtpType = route?.params?.data?.user_code
        ? RequestOTPType.UserCode
        : RequestOTPType.PhoneNumber;
      const payload: IRequestOtpPayload = {
        request_otp_type: requestOtpType,
        user_code: route?.params?.data?.user_code,
        phone_number: formattedValue,
        non_formatted_phone_number: phoneNumber,
        country_code: formattedValue.slice(0, -phoneNumber.length),
        registration_id: token,
      };
      dispatch(requestOtp(payload));
    } else {
      setError("Please enter valid number");
    }
  };
  const goBack = () => navigation.goBack();

  return (
    <KeyboardAwareScrollView key="login" style={{ flex: 1 }}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <ImageBackground
        style={styles.imageBackground}
        source={require("../../assets/LoginBackGround.png")}
      >
        <View style={styles.container}>
          <Text style={styles.shortText}>
            {route?.params?.code?.length > 0
              ? "Please enter your phone number to sign in to the community"
              : "Please enter your phone number to sign in to the community"}
          </Text>
          <TextField
            defaultCode={"US"}
            phoneInput={phoneInput}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            isNumber={true}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onSelectCountry={(text) => {
              console.log("onSelectCountry", text);
            }}
            maxLength={12}
            defaultValue={phoneNumber}
            setValue={setPhoneNumber}
            isValidate={isTermsConditionSelected}
            setIsValidate={setTermsCondition}
            onSubmit={onSubmit}
            placeholder={"xxxxxxxxxx"}
            error={error}
            setError={setError}
            onChangeText={(text) => {
              setError("");
              setPhoneNumber(text);
            }}
          />

          <View style={styles.checkContainer}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => {
                setTermsCondition((prv) => !prv);
              }}
            >
              {isTermsConditionSelected && (
                <AntDesign name={"check"} color="black" size={15} />
              )}
            </TouchableOpacity>
            <Text
              style={styles.footer}
              onPress={() => {
                navigation.navigate("TermsAndCondition");
              }}
            >
              {"I accept the  "}
              <Text
                style={styles.termsConditionLine}
                onPress={() => {
                  navigation.navigate("TermsAndCondition");
                }}
              >
                {"Terms & Conditions"}
              </Text>
            </Text>
          </View>

          <Text
            style={styles.referral}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            [ No Invite? ]
          </Text>
          <TouchableOpacity onPress={goBack} style={{ marginTop: 40 }}>
            <Image source={Arrow} />
          </TouchableOpacity>
          <Text style={styles.bottomText}>
            Featured artist:
            <Text style={styles.bottomInnerText}> alec demarco </Text>
          </Text>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Login;
