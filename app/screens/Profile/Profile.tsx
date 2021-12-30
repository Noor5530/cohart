import StatusBar from "components/CustomStatusBar";
import { appFonts } from "components/text";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { editProfileRequest } from "store/actions/userActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { iconColor, placeHolderColor, textColor } from "../../config/colors";
import AppState from "../../models/reducers";
import ProfileHeader from "./components/ProfileHeader";
import styles from "./style";

const Profile: React.FC = () => {
  const state = useSelector((state: AppState) => state.user);

  const [firstName, setFirstName] = useState<string>(state.first_name);
  const [lastName, setLastName] = useState<string>(state.last_name);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [location, setLocation] = useState<string>(state.location);
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (firstName == "") {
      setFirstNameError("first name is required");
      return;
    } else if (lastName == "") {
      setLastNameError("last name is required");
    } else if (location == "") {
      setLocationError("location is required");
    } else {
      dispatch(
        editProfileRequest({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          full_name: firstName + " " + lastName,
          location: location,
        })
      );
    }
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <View style={style.upperContainer}>
        <ProfileHeader
          description={"[ TYPE IN YOUR ANSWER ]"}
          heading={"TELL US ABOUT YOURSELF"}
        />
        <View style={style.container}>
          <Text style={style.heading}>MY NAME IS</Text>
          <TextInput
            style={style.textFelid}
            placeholderTextColor={placeHolderColor}
            value={firstName}
            maxLength={13}
            placeholder={"First Name"}
            onChangeText={(value) => {
              setFirstName(value.substring(0, 13));
              if (firstNameError != "") setFirstNameError("");
            }}
          />
          <TextInput
            style={style.textFelid}
            placeholderTextColor={placeHolderColor}
            value={lastName}
            maxLength={13}
            placeholder={"Last Name"}
            onChangeText={(value) => {
              setLastName(value.substring(0, 13));
              if (lastNameError != "") setLastNameError("");
            }}
          />
          <Text style={[style.heading, { paddingTop: 40 }]}>
            I LIVE IN
            <Entypo
              name="location-pin"
              color={placeHolderColor}
              size={wp("3")}
            />
          </Text>
          <TextInput
            style={style.textFelid}
            placeholderTextColor={placeHolderColor}
            value={location}
            placeholder={"Solna, SE"}
            onChangeText={(value) => {
              setLocation(value);
              if (locationError != "") setLocationError("");
            }}
          />
        </View>
        {location !== "" && lastName !== "" && firstName !== "" ? (
          <Button
            style={styles.saveButton}
            onPress={onSubmit}
            mode="text"
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const style = StyleSheet.create({
  container: {
    paddingTop: 57,
    paddingLeft: 38,
    paddingRight: 44,
  },
  textFelid: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
    color: iconColor,
    height: 52,
    fontFamily: appFonts.InterRegular,
    borderBottomWidth: 1,
    borderBottomColor: placeHolderColor,
  },
  heading: {
    fontFamily: appFonts.InterRegular,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 19,
    color: "rgba(0, 0, 0, 0.2)",
    paddingBottom: 5,
  },
  upperContainer: { width: wp(100), height: heightPercentageToDP(100) },
});
