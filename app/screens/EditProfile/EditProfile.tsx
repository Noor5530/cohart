import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  // ScrollView,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import StatusBar from "components/CustomStatusBar";
import { neonYellow, textColor } from "config/colors";
import BackIcon from "assets/Icon-back.png";
import AvatarPlaceHolder from "assets/avatar-placeholder.png";
import ArrowDown from "assets/collapse-down.png";
import ArrowUp from "assets/collapse-up.png";
import QRIcon from "assets/ic_qr.png";

import MyDetails from "./components/MyDetails/MyDetails";
import MyTags from "./components/MyTags/MyTags";
import More from "./components/More/More";
import AboutMe from "./components/AboutMe/AboutMe";
import styles from "./style";
import ImagePicker from "react-native-image-crop-picker";
import QrModel from "./components/QrModal/QrModal";
import { permissionAlert } from "lib/isIphone";
import * as Redux from "react-redux";
import { IMyTags } from "models/reducers/user";
import { uploadAvatar } from "services/uploadAvatar";
import {
  uploadImage,
  requestGetUserInformation,
} from "store/actions/userActions";
import { enableSnackBar } from "store/actions/snackBarAction";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import EditIcon from "assets/ic_edit.png";
import FastImage from "react-native-fast-image";
import * as ReactNavigation from "@react-navigation/native";

enum ContentType {
  DETAIL = "Detail",
  ABOUT = "About",
  TAG = "Tag",
  MORE = "More",
}
type Section = {
  title: string;
  type: ContentType;
};

const SECTION: Section[] = [
  {
    title: "My Details",
    type: ContentType.DETAIL,
  },
  {
    title: "About Me",
    type: ContentType.ABOUT,
  },
  {
    title: "My Tags",
    type: ContentType.TAG,
  },
  {
    title: "+ More",
    type: ContentType.MORE,
  },
];

const EditProfile: React.FC = () => {
  const dispatch = Redux.useDispatch();
  const navigation = ReactNavigation.useNavigation();
  const [activeSections, setActiveSections] = useState([]);
  const [submitForm, setSubmitForm] = useState([false, false, false, false]);
  const [loadAvatar, setLoadAvatar] = useState(false);

  const [isVisibleQrModal, toggleQrModal] = useState(false);
  const myProfile = Redux.useSelector((state: AppState) => state.user);

  const [imagePath, setImagePath] = useState(myProfile.cover_image);
  // const [user, setUser] = useState<UserState | null>(myProfile);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({ tabBarVisible: "HIDE" });
  }, []);

  console.log('My Profile ==> ' + JSON.stringify(myProfile));

  const myTags: IMyTags = {
    user_id: myProfile._id,
    user_mediums: myProfile.user_mediums,
    user_moods: myProfile.user_moods,
    user_tags: myProfile.user_tags,
  };

  const updateSections = (activeSections: unknown) =>
    setActiveSections(activeSections as any);

  const pickVideo = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: "photo",
      avoidEmptySpaceAroundImage: false,
    })
      .then((response) => {
        setUploadImageLoading(true);
        const imagePath = response.path;

        setImagePath(imagePath);
        uploadProfileAvatar(response);
      })
      .catch((error: any) => {
        if (error?.message === "User did not grant library permission.") {
          permissionAlert();
        } else if (error?.message !== "User cancelled image selection") {
          // dispatch(enableSnackBar(error?.message));
        }
      });
  };

  const renderSectionHeader = (section: Section, __, isActive) => {
    return (
      <View style={styles.collapsibleHeader}>
        <Text style={styles.collapsibleHeaderTitle}>{section.title}</Text>
        {isActive ? <Image source={ArrowUp} /> : <Image source={ArrowDown} />}
      </View>
    );
  };

  const closeCollapsibleSection = () => setActiveSections([]);

  const renderContent = (section: Section) => {
    if (section.type === ContentType.DETAIL) {
      return (
        <MyDetails
          setSubmitForm={setSubmitForm}
          closeCollapsibleSection={closeCollapsibleSection}
        />
      );
    }
    if (section.type === ContentType.TAG) {
      return (
        <MyTags
          setSubmitForm={setSubmitForm}
          myTags={myTags}
          closeCollapsibleSection={closeCollapsibleSection}
        />
      );
    }
    if (section.type === ContentType.MORE) {
      return (
        <More
          setSubmitForm={setSubmitForm}
          closeCollapsibleSection={closeCollapsibleSection}
        />
      );
    }
    return (
      <AboutMe
        setSubmitForm={setSubmitForm}
        closeCollapsibleSection={closeCollapsibleSection}
      />
    );
  };

  const imageSrc = imagePath === "" ? AvatarPlaceHolder : { uri: imagePath };
  const onPressQr = () => {
    toggleQrModal(true);
  };

  const uploadProfileAvatar = (image: any) => {
    const data = {
      id: myProfile._id,
      phone_number: myProfile.phone_number,
      image_name: image.path.substring(image.path.lastIndexOf("/") + 1),
      img64: image.data,
    };

    uploadAvatar(data)
      .then((response) => {
        const data = response?.data?.data;

        setUploadImageLoading(false);
        if (data?.cover_image) {
          dispatch(uploadImage(data?.cover_image));
        } else {
          dispatch(enableSnackBar());
        }
        
      })
      .catch(() => {
        setUploadImageLoading(false);
      });
  };

  const onGoBack = () => {
    closeCollapsibleSection();
    dispatch(requestGetUserInformation({ user_id: myProfile._id }));
    navigation.goBack();
  };

  const disabledButton = submitForm.every((item) => !item);

  return (
    <>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <QrModel
          isVisible={isVisibleQrModal}
          toggleModal={toggleQrModal}
          name={myProfile?.username}
          link={myProfile?.full_name}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity testID={"goBackButtonTestID"} onPress={onGoBack} style={styles.backButton}>
              <Image source={BackIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>
          <View style={styles.avatarSection}>
            <TouchableOpacity testID={"qrButtonId"} onPress={onPressQr} style={styles.qrButton}>
              <FastImage source={QRIcon} style={styles.qrIcon} />
            </TouchableOpacity>
            <TouchableOpacity testID={"uploadAvatarBtnTestID"} onPress={pickVideo}>
              <View style={[styles.editAvatar, imagePath !== "" && {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}>
                {uploadImageLoading ? (
                  <ActivityIndicator color={neonYellow} size="small" />
                ) : (
                  <Image source={EditIcon} />
                )}
              </View>
              <FastImage
                style={[
                  imagePath === ""
                    ? styles.avatarPlaceHolderDefault
                    : styles.avatarPlaceHolder,
                  !loadAvatar ? {} : { width: 0, height: 0 },
                ]}
                source={imageSrc}
                onLoadEnd={() => setLoadAvatar(false)}
                onLoadStart={() => setLoadAvatar(true)}
                resizeMode={FastImage.resizeMode.cover}
              />
              {loadAvatar && (
                <View
                  style={[
                    styles.avatarPlaceHolder,
                    { backgroundColor: "gray" },
                  ]}
                ></View>
              )}
            </TouchableOpacity>
          </View>
          {/* <ScrollView></ScrollView> */}
          <Accordion
            sections={SECTION}
            activeSections={activeSections}
            renderHeader={renderSectionHeader}
            renderContent={renderContent}
            onChange={updateSections}
            keyExtractor={(item) => item.title}
            underlayColor="white"
            duration={200}
          />
        </KeyboardAwareScrollView>
        { activeSections.length == 0 && <TouchableOpacity
          disabled={disabledButton}
          style={styles.buttonSaveAll}
          onPress={onGoBack}
        >
          <Text style={styles.buttonText}>Save All</Text>
        </TouchableOpacity> }
      </SafeAreaView>
    </>
  );
};

export default EditProfile;
