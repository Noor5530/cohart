import PhoneTextInput from "components/PhoneTextInput";
import { appFonts } from "components/text";
import { iconColor, textColor } from "config/colors";
import React, {  useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import sendReferral from "services/sendReferral";
import { enableSnackBar } from "store/actions/snackBarAction";
import { useKeyboard } from "@react-native-community/hooks";
import AppState from "../../../models/reducers";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface Props {
  setReferState: (data: string) => void;
}

export default function PhoneRefer(props: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [referSent, setReferSent] = useState(false);
  const { setReferState } = props;
  const dispatch = useDispatch();
  const [formattedValue, setFormattedValue] = React.useState("");
  const [validNumber, setValidNumber] = useState(true);
  const userId = useSelector((state: AppState) => state.user._id);
  const keyboard = useKeyboard();
  const buttonPress = () => {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (referSent) {
      setReferState("main");
    } else {
      if (regex.test(formattedValue)) {
        sendReferralRequest();
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
        user_id: userId,
      };
      let response = await sendReferral(body);
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

  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.summaryText, { paddingLeft: wp(4) }]}>
        {"Enter their phone number\nbelow, we’ll do the rest"}
      </Text>
      <View style={styles.buttonContainer}>
        {referSent ? (
          <Text style={styles.sentText}>SENT!</Text>
        ) : (
          <PhoneTextInput

              defaultCode={"US"}
            value={number}
            defaultValue={number}
            onChangeText={(text) => {
              setNumber(text);
              if (!validNumber) {
                setValidNumber(true);
              }
            }}
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
        )}
        {validNumber == false && (
          <Text style={styles.error}>Enter Valid Number</Text>
        )}
      </View>
      {(number?.length > 0 || referSent) && (
        <View
          style={[
            styles.bottomContainer,
            {
              paddingBottom: keyboard.keyboardShown
                ? keyboard.keyboardHeight + 10
                : hp(18),
            },
          ]}
        >
          <TouchableOpacity style={styles.button} onPress={buttonPress}>
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
    </View>
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
  bottomContainer: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: hp(15),
  },
  button: {
    //  marginTop: hp(14),
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
    paddingLeft: wp(6),
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
    paddingLeft: 20,
    backgroundColor: textColor,
  },
  buttonContainer: { flex: 1, marginTop: hp("15") },
  error: {
    color: "red",
    fontSize: 10,
    top: -10,
    left: wp(10),
  },
});
