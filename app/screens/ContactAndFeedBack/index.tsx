import { useIsFocused } from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import reportIcon from "assets/reportIcon.png";
import StatusBar from "components/CustomStatusBar";
import Header from "components/Header";
import HeaderHeading from "components/HeaderHeading";
import { appFonts } from "components/text";
import ApiConfig from "config/api-config";
import { isIphone } from "lib/isIphone";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { apiClient } from "services/client";

import { iconColor, placeHolderColor, textColor } from "../../config/colors";
import {
  disableLoading,
  enableLoading,
} from "../../store/actions/loadingActions";
import { enableSnackBar } from "../../store/actions/snackBarAction";
import styles from "./style";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isValidateEmail, setValidation] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setEmail("");
      setName("");
      setIsEmailSend(false);
      setValidation(true);
      setReport("");
    }
  }, [isFocused]);

  const errorHandler = (error: any) => {
    if (error?.response?.status == 401) {
      dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      dispatch(enableSnackBar());
    }
    dispatch(disableLoading());
  };
  const sendEmail = () => {
    setValidation(ValidateEmail(email));
    try {
      if (
        name !== "" &&
        email !== "" &&
        report !== "" &&
        ValidateEmail(email)
      ) {
        dispatch(enableLoading());
        analytics.track("Sent_feedback", {
          email: email,
          name: name,
          description: report,
        });
        apiClient
          .post(ApiConfig.SEND_FEED_BACK, {
            email: email,
            name: name,
            description: report,
          })
          .then((res) => {
            dispatch(disableLoading());
            if (res.data.statusCode === 200) {
              setIsEmailSend(true);
            } else {
              dispatch(enableSnackBar());
            }
          })
          .catch((error) => {
            errorHandler(error);
          });
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }
  return (
    <View
      key="contactAndFeedBack"
      style={{ flex: 1, backgroundColor: textColor }}
    >
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <Header
        style={{
          paddingTop: isIphone(),
          borderBottomColor: iconColor,
          borderBottomWidth: 1.5,
        }}
        textStyle={{
          color: iconColor,
          fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
        }}
        back
        color={iconColor}
      />
      <HeaderHeading
        iconStyle={{ top: -34, left: -80, height: 100, width: 120 }}
        title={"Report Bugs + Content + Feedback"}
        icon={reportIcon}
      />
      {!isEmailSend ? (
        <KeyboardAwareScrollView contentContainerStyle={{ padding: 29 }}>
          <Text style={styles.heading}>Name</Text>
          <TextInput
            testID="name"
            style={[styles.input, { marginBottom: 20 }]}
            maxLength={30}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="Name"
          />

          <Text style={styles.heading}>Email</Text>
          <TextInput
            testID="email"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text.trim());
              if (isValidateEmail == false) {
                setValidation(true);
              }
            }}
            placeholder="Email"
          />
          {!isValidateEmail && (
            <Text style={{ marginTop: 5 }}>Please enter valid email</Text>
          )}
          <Text style={[styles.heading, { marginTop: 20 }]}>
            Report/Feedback
          </Text>
          <TextInput
            testID="report"
            style={[
              styles.input,
              {
                height: 200,
                marginBottom: 20,
                textAlignVertical: "top",
              },
            ]}
            maxLength={250}
            value={report}
            onChangeText={(text) => {
              setReport(text);
            }}
            multiline={true}
            placeholder="Report/Feedback"
          />

          <TouchableOpacity
            testID="sendEmail"
            style={[
              styles.button,
              {
                backgroundColor: textColor,
                borderWidth: 1,
                borderColor:
                  name == "" || email == "" || report == ""
                    ? placeHolderColor
                    : iconColor,
              },
            ]}
            onPress={sendEmail}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    name == "" || email == "" || report == ""
                      ? placeHolderColor
                      : iconColor,
                },
              ]}
            >
              SUBMIT
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.emailSend}>{"[ THANK YOU! ]"}</Text>
          <Text style={styles.description}>We appreciate your feedback.</Text>
        </View>
      )}
    </View>
  );
}
