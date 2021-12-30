import { useIsFocused } from "@react-navigation/native";
import StatusBar from "components/CustomStatusBar";
import Header from "components/Header";
import HeaderHeading from "components/HeaderHeading";
import { ReferFriendIcon } from "components/Icons";
import { appFonts } from "components/text";
import { iconColor, textColor } from "config/colors";
import { isIphone } from "lib/isIphone";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import PhoneEmailRefer from "./components/PhoneEmailRefer";
import PhoneRefer from "./components/PhoneRefer";
import styles from "./styles";

interface IProps {
  route: {
    params: {
      showDraw: boolean
    }
  }
}

export default function ReferFriend ({route}: IProps) {
  const isFocused = useIsFocused();
  const [referState, setComponentState] = useState("main");

   useEffect(()=>  {

    if (isFocused) {
      clickOnBackButton()
    }

   }, [isFocused]);

   const clickOnPhone = () => {
    setComponentState("phone")
   }
   const clickOnEmail = () => {
    setComponentState("email")
   }
   const clickOnBackButton = () => {
    setComponentState("main")
   }
return (
    <>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
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
            back={true}
            referBack={referState == "main" ? false : true}
            color={iconColor}
            referBackPress={clickOnBackButton}
          />
          <HeaderHeading
            drawer={route?.params?.showDraw}
            title={"Refer \na Friend"}
            renderIcon={
              <View style={{ top: 10, left: -30 }}>
                <ReferFriendIcon
                  color="rgba(0,0,0,0.5)"
                  width={wp("18")}
                  height={wp("18")}
                />
              </View>
            }
          />
        </View>
        <View key="referFriend" style={{ flex: 1, width: wp(100) }}>
          {referState == "main" && (
            <View style={{ flex: 1 }}
          >
              <Text
                style={[
                  styles.summaryText,
                  {
                    color: "black",
                  },
                ]}
              >
                How would you like to refer your friend?
              </Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonStyles}>
                <Text
                    testID="clickOnPhone"
                    onPress={clickOnPhone}
                    style={styles.buttonTextStyle}
                  >
                    Via phone number only
                  </Text>
                </View>
                <View style={[styles.buttonStyles, { marginTop: 25 }]}>
                <Text
                              testID="clickOnEmail"
             onPress={clickOnEmail}
                    style={styles.buttonTextStyle}
                  >
                    via phone number & email address
                  </Text>
                </View>
              </View>
            </View>
          )}
          {referState == "phone" && (
            <PhoneRefer setReferState={setComponentState} />
          )}
          {referState == "email" && (
            <PhoneEmailRefer setReferState={setComponentState} />
          )}
        </View>
      </View>
    </>
  );
}
