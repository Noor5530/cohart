import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { Snackbar } from 'react-native-paper';

import LoadingOverlay from "components/LoadingOverlay";
import  { addUserProfile } from "services/addUserProfile";
import * as userActions from "store/actions/userActions";
import { placeHolderColor } from "config/colors";
import AppState from "../../../../models/reducers";
import ProfileHeader from "../ProfileHeader";
import styles from "./style";
import { verifyUsername } from "services/verifyUsername";

interface IProps {
    onNextStep(): void
}
interface ISignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  location: string;
}

const AddInformationForm: React.FC<IProps> = ({onNextStep}:IProps) => {
  const state = useSelector((state: AppState) => state.user);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFromErrors,
  } = useForm({
    defaultValues: {
      firstName: state.first_name,
      lastName: state.last_name,
      username: state.username,
      location: state.location,
    },
  });

  const dispatch = useDispatch();
  const onDismissSnackBar = () => setError(false)
  const onSubmit = async (data: ISignupRequest) => {
    try {
      setSubmitting(true);
      const payload = {
        id: state._id,
        phone_number: state.phone_number,
        full_name: data.firstName.trim() + " " + data.lastName.trim(),
        username: data.username,
        location: data.location,
        state: "",
        country: "",
        interests: "",
        title_stamp: state?.title_stamp ? state?.title_stamp : 3,
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
      };

      const verifyUsernameResponse = await verifyUsername({
        user_id: state._id,
        username: data.username,
      });

      console.log('Response Verify Username => ' + JSON.stringify(verifyUsernameResponse));


      // TODO-Need to validation username logic by the error code - not for generic error
      if (verifyUsernameResponse?.data.statusCode === 400) {
        setSubmitting(false);
        setFromErrors(
          "username",
          { type: "manual", message: "this username is taken, please choose another"},
          { shouldFocus: true }
        );
        return;
      }

      const response = await addUserProfile(payload);
      console.log('Response AddUserProfile ==> ' + JSON.stringify(response));
      if (response?.data.statusCode === 200) {
        dispatch(
          userActions.editProfileResponse({
            full_name: data.firstName.trim() + " " + data.lastName.trim(),
            last_name: data.lastName,
            first_name: data.firstName,
            username: data.username,
            location: data.location,
          })
        );
        setSubmitting(false);
        onNextStep()
      } else {
        setSubmitting(false);
        setError(true)
      }

      
    } catch (e) {
      console.log('Exception ' + JSON.stringify(e));
      setSubmitting(false);
      setError(true)
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {submitting && <LoadingOverlay />}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={styles.upperContainer}>
          <ProfileHeader
            description={"[ TYPE IN YOUR ANSWER ]"}
            heading={"TELL US ABOUT YOURSELF"}
          />
          <View style={styles.container}>
            <Text style={styles.heading}>MY NAME IS</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textFelid}
                  placeholderTextColor={placeHolderColor}
                  maxLength={13}
                  placeholder="First Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="firstName"
            />
            {errors.firstName && <Text>First name is required.</Text>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textFelid}
                  placeholderTextColor={placeHolderColor}
                  maxLength={13}
                  placeholder="Last Name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="lastName"
            />
            {errors.lastName && <Text>Last name is required.</Text>}
            <View style={styles.space} />
            <Text style={styles.heading}>USERNAME</Text>
            <Controller
              control={control}
              rules={{ required: true, minLength: 3 }}
              render={({ field: { onChange, onBlur, value } }) => { 

                const onChangeText = (text: string) => {
                  if (text.trim().length == 0 && text == " ") {
                    return;
                  }

                  let updatedValue = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                  updatedValue = updatedValue.trim();
                  onChange(updatedValue);
                }

                return (
                  <TextInput
                    style={styles.textFelid}
                    placeholderTextColor={placeHolderColor}
                    maxLength={16}
                    placeholder="Username"
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    autoCapitalize='none'
                    value={value}
                  />
              )}}
              name="username"
            />
            {errors.username && errors.username.type === "required" && <Text>Username is required.</Text>}
            {errors.username && errors.username.type === "manual" && <Text>{errors.username.message}</Text>}
            {errors.username && errors.username.type === "minLength" && <Text>Minimum 3 characters is required</Text>}

            <Text style={[styles.heading, { paddingTop: 40 }]}>
              I LIVE IN
              <Entypo
                name="location-pin"
                color={placeHolderColor}
                size={wp("3")}
              />
            </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textFelid}
                  placeholderTextColor={placeHolderColor}
                  placeholder="Solna, SE"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="location"
            />

            {errors.location && <Text>Location is required.</Text>}
          </View>
          <Button
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
            mode="text"
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
          <Snackbar style={{position: 'absolute'}} visible={error} onDismiss={onDismissSnackBar}>
            Something went wrong!
          </Snackbar>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddInformationForm;
