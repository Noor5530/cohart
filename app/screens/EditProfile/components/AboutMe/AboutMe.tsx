import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { ActivityIndicator } from "react-native-paper";

import AppState from "models/reducers";

import AboutMeImages from "./components/AboutMeImages";
import { permissionAlert } from "lib/isIphone";
import styles from "./styles";
import { apiClient } from "services/client";
import saveProfileImage from "services/saveProfileImage";
import userProfileAboutMe from "services/userProfileAboutMe";
import RNFetchBlob from "rn-fetch-blob";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface IProps {
  closeCollapsibleSection(): void;
  setSubmitForm(): void;
}

const AboutMe: React.FC<IProps> = ({
  closeCollapsibleSection,
  setSubmitForm,
}: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  const [description, setDescription] = useState(user.bio || "");
  const [submitting, setSubmitting] = useState(false);
  const [imagePathOne, setImagePathOne] = useState(
    user.user_profile_images?.image1_original
  );
  const [imagePathTwo, setImagePathTwo] = useState(
    user.user_profile_images?.image2_original
  );
  const [imagePathThree, setImagePathThree] = useState(
    user.user_profile_images?.image3_original
  );
  const [imagePathFour, setImagePathFour] = useState(
    user.user_profile_images?.image4_original
  );
  const [imagePathFive, setImagePathFive] = useState(
    user.user_profile_images?.image5_original
  );
  const [imagePathSix, setImagePathSix] = useState(
    user.user_profile_images?.image6_original
  );
  const [imageLoading, setImageLoading] = useState<string[]>([]);
  const task = useRef();

  useEffect(() => {
    setDescription(user.bio || "");
    return () => {
      setDescription("");
    };
  }, [user]);

  const uploadImage = async (payload) => {
    try {
      setImageLoading((prev) => {
        if (!prev.includes(payload.location)) {
          return prev.concat(payload.location);
        }
        return prev;
      });
      apiClient
        .post("getSignedUrl", {
          file_name: payload.image_name,
          content_type: payload.image_type,
        })
        .then((data) => {
          task.current = RNFetchBlob.fetch(
            "PUT",
            data.data.data,
            {
              "Content-Type": payload.image_type,
            },
            RNFetchBlob.wrap(payload.uri)
          );
          return task.current.uploadProgress((written, total) => {
            console.log("Written", written);
            console.log("Total", total);
          });
        })
        .then((data) => {
          console.log(data, "========");
          saveImage(data.respInfo.redirects[0] as string, payload.location);
        })
        .catch((error) => {
          const { message } = error;
          console.log(message);
        });
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      const { message } = error;
      console.log(message);
    }
  };

  const saveImage = async (imgUrl: string, location: string) => {
    const res = await saveProfileImage({
      id: user._id,
      image: imgUrl,
      image_location: location,
    });
    setImageLoading((prev) => {
      return prev.filter((item) => item !== location);
    });
    console.log("Response saved image => ", res);
  };

  const pickImages = (location) => () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // cropping: true,
      mediaType: "photo",
      avoidEmptySpaceAroundImage: false,
    })
      .then((response) => {
        const image_name = response.path.substring(
          response.path.lastIndexOf("/") + 1
        );
        const image_type = response.mime;
        const uri = response.path;
        switch (location) {
          case 1:
            setImagePathOne(uri);
            break;
          case 2:
            setImagePathTwo(uri);
            break;
          case 3:
            setImagePathThree(uri);
            break;
          case 4:
            setImagePathFour(uri);
            break;
          case 5:
            setImagePathFive(uri);
            break;
          case 6:
            setImagePathSix(uri);
            break;
          default:
            break;
        }

        uploadImage({
          image_name,
          image_type,
          uri,
          location: String(location),
        });

        console.log("Response Image ==> " + response.path);
      })
      .catch((error: any) => {
        if (error?.message === "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          // dispatch(enableSnackBar(error?.message));
        }
      });
  };

  const handleChangeText = (text: string) => {
    if (text.trim().length == 0 && text == " ") {
      return;
    }
    setDescription(text);
  };

  const handleUpdateBio = async () => {
    setSubmitting(true);
    try {
      await userProfileAboutMe({
        id: user._id,
        bio: description.replace(/\s+/g, " ").trim(),
      });
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
    }

    setSubmitting(false);
    setSubmitForm((prev) =>
      prev.map((item, index) => (index === 1 ? true : false))
    );
    closeCollapsibleSection();
  };

  return (
    <View>
      <AboutMeImages
        image2={imagePathTwo}
        image1={imagePathOne}
        image3={imagePathThree}
        image4={imagePathFour}
        image5={imagePathFive}
        image6={imagePathSix}
        pickImages={pickImages}
        imageLoading={imageLoading}
      />
      <View style={styles.container}>
        <Text style={styles.fullName}>{user?.full_name}</Text>
        <TextInput
          placeholder="Enter your bio.."
          multiline
          numberOfLines={18}
          style={styles.textArea}
          underlineColorAndroid={"transparent"}
          maxLength={345}
          onChangeText={handleChangeText}
          value={description}
        />

        <Text style={styles.maxLength}>
          {description.length}/345 characters
        </Text>

        <TouchableOpacity
          disabled={submitting}
          onPress={handleUpdateBio}
          style={styles.button}
        >
          {submitting ? (
            <ActivityIndicator color="black" size="small" />
          ) : (
            <Text style={styles.buttonText}>{"I'M DONE"}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutMe;
