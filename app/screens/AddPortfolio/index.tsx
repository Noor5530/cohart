import {
    TabActions,
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import StatusBar from 'components/CustomStatusBar';
import { CheckMarkIcon, CrossIcon } from 'components/Icons';
import Image from 'components/Image';
import { AppText } from 'components/text';
import { Container } from 'components/workAround';
import ApiConfig from 'config/api-config';
import { iconColor, primary, shimmerColor, textColor } from 'config/colors';
import { isIphone } from 'lib/isIphone';
import AppState from 'models/reducers';
import { AddPortfolioRouteProps } from 'navigation/MainNavigation';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from 'services/client';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';
import { enableSnackBar } from 'store/actions/snackBarAction';
import { deleteWork, logOutRequest } from "store/actions/userActions";
import saveUserWork from "services/saveUserWork";
import deleteUserWork from 'services/deleteUserWork'
import Footer from "./components/Footer";
import styles from "./styles";
import { LogOutRequestEnum } from "models/actions/user";

export default function Portfolio() {
  const route = useRoute<AddPortfolioRouteProps>();
  const {
    mediaUrl = "",
    data = {},
    isPreView = false,
    userWork = false,
    editView = false,
    userData = {},
    stopRefresh = false,
  } = route.params;
  const actionSheetRef = useRef();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const IsFocused = useIsFocused();
  const [workId, setWorkId] = useState("");
  const [title, setTitle] = useState("");
  const [demission, setDemission] = useState("");
  const [medium, setMedium] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    isPreView && data?.description ? data.description : ""
  );
  const [tags, setAddTags] = useState([]);
  const [forSale, setForSale] = useState("");
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const name = useSelector((state: AppState) => state.user.full_name);
  const username = useSelector((state: AppState) => state.user.username);
  const [mediaUrlData, setMediaUrl] = useState(null);
  const avatar = useSelector((state: AppState) => state.user.cover_image);

  const [isSaveArtWorkData, setSaveArtWorkData] = useState(false);
  const id = useSelector((state: AppState) => state.user._id);
  const dispatch = useDispatch();
  const jumpToAction = TabActions.jumpTo("MyProfile");

  // TODO log setMediaUrl so console.log to remove it later
  console.log(setMediaUrl);

  const onDeleteSaveUserWork =async () => {
    try {
      analytics.track("Deleted_bookmark", {
        user_work_id: data?._id,
      });
      dispatch(enableLoading());
        let response =await deleteUserWork({
            user_id: id,
            user_work_id: workId,
        });
        dispatch(disableLoading());
        if (response?.data?.statusCode === 200) {
          setSaveArtWorkData(false);
        } else if (response.data.statusCode === 201) {
          setSaveArtWorkData(false);
        } else {
          dispatch(enableSnackBar());
        }

    } catch (error:any) {
        errorHandler(error)
    }
  };

  const onSaveUserWork = async () => {
    try {
      analytics.track("Added_bookmark", {
        user_id: id,
        user_work_id: data?._id,
      });
      dispatch(enableLoading());
      let response = await saveUserWork({
        user_id: id,
        user_work_id: data?._id,
      });
      dispatch(disableLoading());
      if (response?.data.statusCode === 200) {
        setSaveArtWorkData(true);
      } else if (response?.data.statusCode == 201) {
        setSaveArtWorkData(true);
      } else {
        dispatch(enableSnackBar());
      }
    } catch (error: any) {
      errorHandler(error);
     }
  };

    const errorHandler = (error:any) => {
        if (error?.response?.status == 401) {
            dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
          } else {
            dispatch(enableSnackBar());
          }
          dispatch(disableLoading());

    }
  useEffect(() => {
    if (IsFocused) {
      setWorkId(isPreView && data?._id ? data._id : "");
      setTitle(isPreView && data?.title ? data.title : "");
      setDemission(isPreView && data?.dimensions ? data.dimensions : "");
      setMedium(isPreView && data?.medium ? data.medium : "");
      setPrice(isPreView && data?.price ? data.price : "");
      setDescription(isPreView && data?.description ? data.description : "");
      setAddTags(isPreView && data?.tags ? data.tags.split(",") : []);
      setForSale(isPreView && data?.ready_for_sale ? data.ready_for_sale : "");
      setImage(isPreView && data?.post_image ? data.post_image : "");
      setThumbnail(
        isPreView && data?.resized_image_path ? data.resized_image_path : ""
      );
      if (!isPreView) {
        setImage(mediaUrl.path);
      }

      setSaveArtWorkData(false);
    } else {
      // setWorkId('');
      // setDemission('');
      // setTitle('');
      // setMedium('');
      // setPrice('');
      // setDescription('');
      // setAddTags([]);
      // setForSale('');
    }
    return () => {
      if (IsFocused) {
        setImage(null);
        setThumbnail(null);
        setSaveArtWorkData(false);
        actionSheetRef.current?.snapTo(1);
      }
    };
  }, [IsFocused]);

  useEffect(() => {
   try {
    if (IsFocused && isPreView && userWork == false && stopRefresh != true) {
      dispatch(enableLoading());
      apiClient
        .post(ApiConfig.GET_SAVE_WORK_DATA, {
          user_id: id,
          user_work_id: data?._id,
        })
        .then((res) => {
          console.log("res", res);
          if (res.data.statusCode === 200) {
            setSaveArtWorkData(true);
          } else {
            setSaveArtWorkData(false);
          }
          dispatch(disableLoading());
        })
        .catch((error) => {
          errorHandler(error)
        });
    }
    if (stopRefresh) {
      setSaveArtWorkData(true);
    }
   } catch (error) {
    errorHandler(error)

   }

  }, [IsFocused]);
  const deleteUserPost = () => {
    navigation.dispatch(jumpToAction);
    dispatch(
      deleteWork({
        work_id: workId,
        id: id,
      })
    );
  };
  const uploadWork = () => {
    const data = {
      user_id: id,
      title: title,
      description: description,
      tags: tags.toString(),
      price: price,
      ready_for_sale: price !== "" ? true : false,
      dimensions: demission,
      medium: medium,
      image_type: mediaUrlData ? mediaUrlData.mime : mediaUrl.mime,
      image_name: mediaUrlData
        ? mediaUrlData?.path.substring(mediaUrlData?.path.lastIndexOf("/") + 1)
        : mediaUrl?.path.substring(mediaUrl?.path.lastIndexOf("/") + 1),
      uri: mediaUrlData ? mediaUrlData?.path : mediaUrl.path,
    };
    navigation.navigate("UploadPortfolio", { data: data, editWork: false });
  };
  const onUploadWork = () => {
    console.log("editWork", editView);

    if (editView) {
      EditWork();
    } else {
      uploadWork();
    }
  };
  const EditWork = () => {
    const data = {
      work_id: workId,
      user_id: id,
      title: title,
      description: description,
      tags: tags.toString(),
      price: price,
      ready_for_sale: price !== "" ? true : false,
      dimensions: demission,
      medium: medium,
    };
    if (mediaUrlData) {
      data.image_name = mediaUrlData.path.substring(
        mediaUrlData.path.lastIndexOf("/") + 1
      );
      data.image_type = mediaUrlData.mime;
      data.uri = mediaUrlData.path;
      data.is_file_change = "yes";
    } else {
      data.is_file_change = "no";
    }
    navigation.navigate("UploadPortfolio", { data: data, editWork: true });
  };
  return (
    <Container>
      <View
        key="addPortfolio"
        style={{
          flex: 1,
          paddingTop: isIphone(),
          backgroundColor: textColor,
        }}
      >
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <View style={styles.header}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CrossIcon height={"19"} width={"18"} />
          </TouchableOpacity>
          <Text style={styles.heading}>
            {editView
              ? "Edit Artwork"
              : isPreView
              ? "Preview Artwork"
              : "New Artwork"}
          </Text>
          {!isPreView || editView ? (
            <TouchableOpacity style={{ padding: 5 }} onPress={onUploadWork}>
              <CheckMarkIcon color={title !== "" ? "black" : "none"} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <KeyboardAwareScrollView scrollEnabled={false} style={{ flex: 1 }}>
          <View
            style={{
              height: height,
            }}
          >
            <View style={{ height: 160 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {!editView && isPreView ? (
                  <Text style={styles.titleHeading}>{title}</Text>
                ) : (
                  <TextInput
                    style={[styles.input, { width: "100%" }]}
                    autoFocus={true}
                    maxLength={40}
                    numberOfLines={2}
                    // multiline={true}
                    value={title}
                    onChangeText={(text) => {
                      setTitle(text.substring(0, 40));
                    }}
                    // editable={userWork ? false : !isPreView}
                    placeholder={"ARTWORK NAME"}
                  />
                )}
                {isPreView && !userWork ? (
                  <TouchableOpacity
                    style={{
                      height: 80,
                      alignItems: "center",
                      paddingTop: 10,
                    }}
                  >
                    <FontAwesome
                      onPress={
                        isSaveArtWorkData
                          ? onDeleteSaveUserWork
                          : onSaveUserWork
                      }
                      name={isSaveArtWorkData ? "bookmark" : "bookmark-o"}
                      color="black"
                      size={30}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 23,
                }}
              >
                {title ? (
                  <TouchableOpacity
                    style={[styles.descriptionView, { marginRight: 20 }]}
                    onPress={() => {
                      actionSheetRef.current?.snapTo(0);
                    }}
                  >
                    <Text style={styles.descriptionText}>
                      {isPreView && !editView
                        ? "Info"
                        : editView
                        ? "O Edit Info"
                        : "O  Enter info"}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {false && (
                  <TouchableOpacity
                    style={[styles.descriptionView]}
                    //  onPress={openCropper}
                  >
                    <Text style={styles.descriptionText}>
                      {"# Crop Artwork"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                height: height - 300,
                width: "100%",
                alignItems: "center",
              }}
            >
              {image !== null && (
                <Image
                  imageHeight={data.orignal_height}
                  imageWidth={data.orignal_width}
                  thumbnail={thumbnail ? thumbnail : image}
                  height={height - 300}
                  width={width}
                  source={{ uri: image ? image : "" }}
                  uri={image ? image : ""}
                  style={{
                    height: height - 300,
                    width: "100%",
                    backgroundColor: shimmerColor,
                  }}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>

        {editView && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              width: "100%",
              height: 45,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: { height: 1 },

              backgroundColor: primary,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              Alert.alert(
                "Delete Artwork",
                "Are you sure?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                  {
                    text: "Delete",
                    onPress: () => {
                      deleteUserPost();
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <AppText
              medium
              style={{
                color: iconColor,
                textTransform: "uppercase",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Delete artWork
            </AppText>
          </TouchableOpacity>
        )}
      </View>
      <Footer
        actionSheetRef={actionSheetRef}
        demission={demission}
        setDemission={setDemission}
        medium={medium}
        setMedium={setMedium}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        tags={tags}
        setAddTags={setAddTags}
        setForSale={setForSale}
        forSale={forSale}
        name={isPreView ? userData?.full_name?.trim() : name}
        username={
          isPreView
            ? userData?.username
              ? userData?.username?.trim()
              : userData?.full_name?.trim()
            : username
        }
        isPreView={editView ? false : isPreView}
        avatar={{ uri: isPreView ? userData?.cover_image : avatar }}
      />
    </Container>
  );
}
