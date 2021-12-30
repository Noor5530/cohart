import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { useForm, Controller } from "react-hook-form";

import TextField from "components/PhoneTextInput";
import LoadingOverlay from "components/LoadingOverlay";

import SocialList from "./components/SocialList";
import RegisterSuccess from "./components/RegisterSuccess";
import createPrefineryUser from "services/createPrefineryUser";
import styles from "./style";

enum StepRegisters {
  REGISTER = "REGISTER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  SOCIAL = "SOCIAL",
  REFER_FRIEND = "REFER_FRIEND",
}
interface IProps {
  route: { params: { isUserJoining: boolean; userName?: string } };
}

const isValidMail = (mail: string): boolean => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail
  );
};

const Register: React.FC<IProps> = ({ route }: IProps) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [, setFormattedValue] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [step, setStep] = useState<StepRegisters>(StepRegisters.REGISTER);
  const navigation = useNavigation();
  const [error, setError] = useState<string>("");
  const [submiting, setSubmiting] = useState(false);

  const navigateToReferFriend = () => {
    navigation.goBack();
    navigation.navigate("OnboardReferFriend", {
      showDraw: true
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnChangeFormat = (text: string) => {
    setFormattedValue(text);
  };

  const handleOnSubmitRegister = async (data) => {
    try {
      setSubmiting(true);
      const payload = {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        country_code: countryCode,
        number: phoneNumber,
      };

      await createPrefineryUser(payload);

      setStep(StepRegisters.REGISTER_SUCCESS);
      setSubmiting(false);
    } catch (e) {
      // TODO: handle error here
      setSubmiting(false);
    }
  };

  const handleShowSocial = () => {
    setStep(StepRegisters.SOCIAL);
  };

  const handleGoBackDiscover = () => {
    navigation.goBack();
  };

  if (step === StepRegisters.REGISTER) {
    return (
      <View style={styles.registerContainer}>
        {submiting && (
          <LoadingOverlay/>
        )}
        <KeyboardAwareScrollView>
          <View
            style={styles.registerHeadingContainer}
          />
          <Text style={styles.registerHeading}>
            {route.params?.isUserJoining
              ? `${route.params?.userName} waitlist`
              : "We’re adding final touches..."}
          </Text>
          <Text style={styles.registerSubheading}>
            Be the first to know when Cohart is ready for you to join!
          </Text>
          <View style={styles.formWrapper}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "First Name is required" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.textInputStyle, styles.inputFieldMarginBottom]}
                  mode="flat"
                  label="First Name"
                  placeholder="First Name"
                  returnKeyType="done"
                  theme={{
                    colors: {
                      primary: "black",
                      text: "black",
                      accent: "black",
                      placeholder: "#a9a9a9",
                    },
                  }}
                  underlineColor="#000000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.firstName)}
                />
              )}
              name="firstName"
              defaultValue=""
            />

            {errors.firstName && <Text>{errors.firstName.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Last Name is required" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.textInputStyle, styles.inputFieldMarginBottom]}
                  mode="flat"
                  label="Last Name"
                  placeholder="Last Name"
                  returnKeyType="done"
                  theme={{
                    colors: {
                      primary: "black",
                      text: "black",
                      accent: "black",
                      placeholder: "#a9a9a9",
                    },
                  }}
                  underlineColor="#000000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.firstName)}
                />
              )}
              name="lastName"
              defaultValue=""
            />
            {errors.lastName && <Text>{errors.lastName.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Email is required" },
                validate: {
                  invalidMail: (data: string) => {
                    return isValidMail(data);
                  },
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.textInputStyle, styles.inputFieldMarginBottom]}
                  mode="flat"
                  label="Email Address"
                  placeholder="Email Address"
                  returnKeyType="done"
                  theme={{
                    colors: {
                      primary: "black",
                      text: "black",
                      accent: "black",
                      placeholder: "#a9a9a9",
                    },
                  }}
                  underlineColor="#000000"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={Boolean(errors.email)}
                />
              )}
              name="email"
              defaultValue=""
            />

            {Boolean(errors.email) && (
              <>
                {errors.email.type === "invalidMail" && (
                  <Text>Email is invalid</Text>
                )}

                {errors.email.type === "required" && (
                  <Text>Email is required</Text>
                )}
              </>
            )}

            <Controller
              control={control}
              rules={{
                required: phoneNumber.length === 0,
              }}
              name="phone"
              defaultValue=""
              render={() => (
                <View
                  style={[
                    styles.phoneInputWrapper,
                    styles.inputFieldMarginBottom,
                  ]}
                >
                  <TextField
                    setCountryCode={(codeCt) => setCountryCode(codeCt)}
                    defaultCode={"US"}
                    phoneInput={phoneInput}
                    onChangeFormattedText={handleOnChangeFormat}
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
                    isValidate={false}
                    setIsValidate={() => {}}
                    onSubmit={() => {}}
                    placeholder={"xxxxxxxxxx"}
                    error={error}
                    setError={setError}
                    paddingNull
                    onChangeText={(text) => {
                      setError("");
                      setPhoneNumber(text);
                    }}
                    customButtonFormatStyle={{
                      backgroundColor: "white",
                      borderRadius: 0,
                    }}
                  />
                </View>
              )}
            />
            {Boolean(errors.phone) && (
              <>
                {errors.phone.type === "required" && (
                  <Text>Phone number is required</Text>
                )}
              </>
            )}
            <View style={styles.buttonGroup}>
              {route.params?.isUserJoining && (
                <TouchableOpacity
                  onPress={handleGoBackDiscover}
                  style={[styles.buttonStyle]}
                >
                  <Text style={[styles.buttonText, styles.buttonTextGray]}>
                    Maybe Later
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.buttonStyle, styles.primaryButton]}
                onPress={handleSubmit(handleOnSubmitRegister)}
              >
                <Text style={[styles.buttonText, styles.buttonTextBlack]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  if (step === StepRegisters.REGISTER_SUCCESS) {
    return (
      <RegisterSuccess
        onNavigateToReferFriend={navigateToReferFriend}
        handleShowSocial={handleShowSocial}
      />
    );
  }

  return <SocialList />;
};

export default Register;
