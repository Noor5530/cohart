import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { TextInput, ActivityIndicator } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import AppState from "models/reducers";
import userProfileDetail from "services/userProfileDetails";
// import * as userActions from "store/actions/userActions";
import { enableSnackBar } from "store/actions/snackBarAction";
import { LogOutRequestEnum } from "models/actions/user";
import { logOutRequest } from "store/actions/userActions";
import * as ReactNavigation from "@react-navigation/native";

interface IProps {
  closeCollapsibleSection(): void;
  setSubmitForm(): void;
}

const isValidMail = (mail: string): boolean => {
  // eslint-disable-next-line no-control-regex
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    mail
  );
};

const isNotValidStringNoNumber = (value: string): boolean => {
  return (
    /([^A-Z0-9])(\d)/.test(value) ||
    /([^0-9A-Z])(\d)/.test(value) ||
    /([0-9a-z])(\d)/.test(value) ||
    /([^a-z0-9])(\d)/.test(value) ||
    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value) ||
    value.trim().length <= 1
  );
};

const isNotValidStringAllowNumber = (value: string): boolean => {
  return /([^A-Z])(\d)/.test(value) && /([^a-z])(\d)/.test(value);
};

const MyDetail: React.FC<IProps> = ({
  closeCollapsibleSection,
  setSubmitForm,
}: IProps) => {
  const navigation = ReactNavigation.useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  const [userData, setUserData] = useState(user);
  console.log('User data => ', userData);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setUserData(user);
      console.log(defaultValues, "========");
      console.log(user, "user====");
      reset(defaultValues);
    });

    return unsubscribe;
  }, [navigation, user]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // do something
      // reset(defaultValues)
    });

    return unsubscribe;
  }, [navigation, user]);

  const defaultValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    username: user?.username,
    location: user?.location,
    email: user?.email,
    subtitle: user?.subtitle,
    instagram: user?.instagram,
    twitter: user?.twitter,
    website: user?.website,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await userProfileDetail({ ...data, id: user._id });
      console.log(res, "=========");
      // TODO handle update redux if needed
      // userActions.updateProfileDataResponse(res.data.data);
      setUserData(res.data.data);
      setSubmitting(false);
      setSubmitForm((prev) =>
        prev.map((item, index) => (index === 0 ? true : false))
      );
      closeCollapsibleSection();
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setSubmitting(false);
      dispatch(
        enableSnackBar(
          "User info is not saved successfully. Please check mandatory information."
        )
      );
      closeCollapsibleSection();
    }
  };

  return (
    <View>
      <View style={[styles.inputWrapper, { paddingTop: 0 }]}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              invalidString: (data: string) => {
                return !isNotValidStringNoNumber(data);
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="FIRST NAME *"
              placeholder="First Name"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="first_name"
        />
        {Boolean(errors.first_name) && (
          <>
            {errors.first_name?.type === "invalidString" && (
              <Text style={styles.redError} testID="firstNameInvalid">
                First Name is invalid
              </Text>
            )}

            {errors.first_name?.type === "required" && (
              <Text style={styles.redError} testID="firstNameRequire">
                First Name is required
              </Text>
            )}
          </>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              invalidString: (data: string) => {
                return !isNotValidStringNoNumber(data);
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="LAST NAME *"
              placeholder="Last Name"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="last_name"
        />
        {Boolean(errors.last_name) && (
          <>
            {errors.last_name?.type === "invalidString" && (
              <Text style={styles.redError}>Last Name is invalid</Text>
            )}

            {errors.last_name?.type === "required" && (
              <Text style={styles.redError}>Last Name is required</Text>
            )}
          </>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              invalidString: (data: string) => {
                return isNotValidStringAllowNumber(data);
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="USERNAME*"
              placeholder="User Name"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="username"
        />
        {Boolean(errors.username) && (
          <>
            {errors.username?.type === "invalidString" && (
              <Text style={styles.redError}>Username is invalid</Text>
            )}

            {errors.username?.type === "required" && (
              <Text style={styles.redError}>Username is required</Text>
            )}
          </>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="TITLE"
              placeholder="Enter title"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="subtitle"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: {
              invalidString: (data: string) => {
                return !isNotValidStringAllowNumber(data);
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="LOCATION *"
              placeholder="Location"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="location"
        />
        {Boolean(errors.location) && (
          <>
            {errors.location?.type === "invalidString" && (
              <Text style={styles.redError}>Location is invalid</Text>
            )}

            {errors.location?.type === "required" && (
              <Text style={styles.redError}>Location is required</Text>
            )}
          </>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          rules={{
            required: false,
            validate: {
              invalidMail: (data: string) => {
                return isValidMail(data);
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="EMAIL*"
              placeholder="name@email.com"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="email"
        />
        {Boolean(errors.email) && (
          <>
            {errors.email?.type === "invalidMail" && (
              <Text style={styles.redError}>Email is invalid</Text>
            )}

            {errors.email?.type === "required" && (
              <Text style={styles.redError}>Email is required</Text>
            )}
          </>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="INSTAGRAM"
              placeholder="@yourhandle"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="instagram"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="TWITTER"
              placeholder="@yourhandle"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="twitter"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="WEBSITE"
              placeholder="yoursiteurl.com"
              style={styles.inputStyle}
              returnKeyType="done"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              theme={{
                colors: {
                  primary: "black",
                  text: "black",
                  accent: "black",
                  placeholder: "#a9a9a9",
                },
              }}
              underlineColor="#000000"
            />
          )}
          name="website"
        />
      </View>
      <TouchableOpacity
        disabled={submitting}
        style={styles.button}
        testID="submitBtn"
        onPress={handleSubmit(onSubmit)}
      >
        {submitting ? (
          <ActivityIndicator color="black" size="small" />
        ) : (
          <Text style={styles.buttonText}>{"I'M DONE"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MyDetail;
