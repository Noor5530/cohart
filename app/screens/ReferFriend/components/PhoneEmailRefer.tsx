import PhoneTextInput from "components/PhoneTextInput";
import { appFonts } from "components/text";
import { iconColor, placeHolderColor, textColor } from "config/colors";
import AppState from "models/reducers";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Redux from "react-redux";
import { sentReferral } from "services/sendReferral";
import { enableSnackBar } from "store/actions/snackBarAction";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useKeyboard } from "@react-native-community/hooks";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface Props {
  setReferState: (data: string) => void;
}

export default function PhoneRefer(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [referSent, setReferSent] = useState(false);
  const [validEmailAdress, setValidEmailAdress] = useState(true);
  const [validNumber, setValidNumber] = useState(true);
  const userId = Redux.useSelector((state: AppState) => state.user._id);
  const { setReferState } = props;
  const dispatch = Redux.useDispatch();
  const [formattedValue, setFormattedValue] = React.useState("");
  const keyboard = useKeyboard();

  const buttonPress = () => {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (referSent) {
      setReferState("main");
    } else {
      if (regex.test(formattedValue)) {
        if (validateEmail(email)) {
          setValidEmailAdress(true);
          sendReferralRequest();
        } else {
          setValidEmailAdress(false);
        }
      } else {
        setValidNumber(false);
      }
    }
  };
  const sendReferralRequest = async () => {
    setIsLoading(true);

    try {
      let body = {
        phone_number: formattedValue,
        number: number,
        country_code: formattedValue.slice(0, -number.length),
        email: email,
        user_id: userId,
      };
      let response = await sentReferral(body);
      if (response.data.statusCode === 200) {
        setIsLoading(false);
        setReferSent(true);
      } else {
        dispatch(enableSnackBar(response?.data?.message.toString()));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      } else {
        dispatch(enableSnackBar("Something went wrong"));
      }
    }
  };
  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <Text style={[styles.summaryText, { paddingLeft: wp(4) }]}>
        {"Enter their contact details \nbelow, we’ll do the rest"}
      </Text>
      <>
        {referSent ? (
          <View style={styles.sentButton}>
            <Text style={styles.sentText}>SENT!</Text>
          </View>
        ) : (
          <View
            style={{
              height: 200,
              marginTop: keyboard.keyboardShown ? 0 : hp(14),
            }}
          >
            <View style={styles.numberContainer}>
              <PhoneTextInput
                defaultCode={"US"}
                value={number}
                paddingNull={true}
                defaultValue={number}
                onChangeText={(text) => {
                  setNumber(text);
                  setValidNumber(true);
                }}
                placeholderTextColor="black"
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                textInputStyle={styles.phoneTextInputTextInputStyle}
                textContainerStyle={styles.phoneTextContainerStyle}
                countryContainerStyle={styles.phoneCountryContainerStyle}
                codeTextStyle={styles.phoneCodeTextStyle}
                containerStyle={styles.phoneContainerStyle}
                placeholder="xxxxxxxxxx"
                disableArrowIcon={true}
                layout="fisenst"
              />
              {validNumber == false && (
                <Text
                  testID={"errorMessagePhoneNumber"}
                  style={styles.errorText}
                >
                  Enter Valid Number
                </Text>
              )}
            </View>
            <View style={styles.emailContainer}>
              <TextInput
                testID={"emailAddress"}
                style={styles.emailInput}
                placeholderTextColor={placeHolderColor}
                placeholder="Email Address"
                onChangeText={(data) => {
                  if (!validEmailAdress) {
                    setValidEmailAdress(true);
                  }
                  setEmail(data);
                }}
                value={email}
              />
              {validEmailAdress == false && (
                <Text testID={"errorMessageEmail"} style={styles.errorText}>
                  Enter Valid Email Address
                </Text>
              )}
            </View>
          </View>
        )}
      </>
      {((number?.length > 0 && email?.length > 0) || referSent) && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            testID={"InviteFriendButton"}
            style={[
              styles.button,
              { marginTop: keyboard.keyboardShown ? 0 : hp(10) },
            ]}
            onPress={buttonPress}
          >
            <Text style={styles.bottonText}>
              {referSent ? "REFER ANOTHER FRIEND" : "INVITE"}
            </Text>
            {isLoading && (
              <ActivityIndicator
                style={{ marginLeft: 5 }}
                size="small"
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: "100%",
    backgroundColor: textColor,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    flex: 1,
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    // alignItems: 'center',
  },
  bottomContainer: { flex: 1, width: "100%", alignItems: "center" },
  button: {
    marginTop: hp(12),

    height: 35,
    minWidth: 140,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: iconColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  bottonText: {
    fontWeight: "700",
    fontFamily: appFonts.InterRegular,
    fontSize: 13,
  },
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  sentText: {
    alignSelf: "center",
    fontWeight: "700",
    fontFamily: appFonts.InterRegular,
    fontSize: 28,
  },
  cross: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    color: iconColor,
  },
  reefersText: {
    paddingTop: 25,
    height: 55,
    textAlignVertical: "top",
    fontSize: 13,
    color: iconColor,
  },
  summaryText: {
    paddingTop: 10,
    fontFamily: appFonts.InterRegular,
    color: iconColor,
    width: wp(85),
    fontSize: 15,
  },
  phoneTextInputTextInputStyle: {
    height: 50.42,
    padding: 0,
    margin: 0,
    width: "90%",
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontSize: wp("5"),
    fontWeight: "bold",
  },
  phoneTextContainerStyle: {
    width: "90%",
    margin: 0,
    backgroundColor: textColor,
    height: 50.42,
  },
  phoneCountryContainerStyle: {
    borderWidth: 2,
    borderColor: iconColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: textColor,
  },
  phoneCodeTextStyle: {
    margin: 0,
    color: iconColor,
    fontFamily: appFonts.InterRegular,
    fontSize: wp("5"),
    fontWeight: "bold",
  },
  phoneContainerStyle: {
    padding: 0,
    margin: 0,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 50.42,
    borderColor: iconColor,
    borderRadius: 14.4067,
    backgroundColor: textColor,
  },
  numberContainer: {
    height: 80,
    width: wp("85"),
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    fontSize: 10,
    top: -10,
    paddingLeft: 10,
  },
  emailContainer: {
    borderTopWidth: 1,
    height: 60,
    borderBottomWidth: 1,
    borderColor: "gray",
    width: wp("85"),

    alignSelf: "center",
  },
  emailInput: {
    height: 40,
    marginVertical: 12,
    fontFamily: appFonts.InterRegular,
    fontSize: wp("5"),
    fontWeight: "bold",
  },
  sentButton: { flex: 1, marginTop: hp("15") },
});
