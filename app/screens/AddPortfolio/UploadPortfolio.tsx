import { useFocusEffect } from '@react-navigation/core';
import { TabActions, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import StatusBar from 'components/CustomStatusBar';
import { CrossIcon } from 'components/Icons';
import ApiConfig from 'config/api-config';
import AppState from 'models/reducers';
import React, { FC, useLayoutEffect, useRef } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    ViewProps,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { apiClient } from 'services/client';

import { appFonts, AppText } from '../../components/text';
import { iconColor, textColor } from '../../config/colors';
import { fetchUserWorkResponse } from '../../store/actions/appAction';
import { enableSnackBar } from '../../store/actions/snackBarAction';
import { UploadMonogram } from '../../utils/icons';
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

const UploadingSlider: FC<
  ViewProps & {
    url: string;
    caption: string;
  }
> = (props) => {
  const dispatch = useDispatch();
  const opacity = useSharedValue(0);
  const opacityAnim = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const { width } = useWindowDimensions();
  const jumpToAction = TabActions.jumpTo("MyProfile");

  const lineWidth = Math.min(width * 0.8, 600);
  const navigation = useNavigation();
  const route = useRoute();

  const { data: apiData, editWork = false } = route?.params;
  const monogramSize = 35;
  const maxOffset = lineWidth - monogramSize / 2;
  const xOffset = useSharedValue(0);
  const IsFocused = useIsFocused();
  const portfolio = useSelector((state: AppState) => state.app.portfolio);
  const source = axios.CancelToken.source();
  const task = useRef();

  const monogramAnim = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(xOffset.value, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));
  const showPost = async (imageUrl) => {
    // createPost(data, config);

    try {
      const config = {
        cancelToken: source.token,
        onUploadProgress: function (progressEvent) {
          if (imageUrl == null) {
            mockUpload(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      };

      apiClient
        .post(
          editWork ? ApiConfig.EDIT_WORK : ApiConfig.ADD_WORK,
          imageUrl ? { ...apiData, post_image: imageUrl } : apiData,
          config
        )
        .then((res) => {
          console.log("editWork", res.data.data);
          if (res.data.statusCode === 200 && res.data.data) {
            if (editWork) {
              const index = portfolio.findIndex((item) => {
                return item._id == apiData.work_id;
              });
              const temp = [...portfolio];
              if (index !== -1) {
                temp[index] = res.data.data;
              }
              dispatch(fetchUserWorkResponse(temp));
            } else {
              dispatch(fetchUserWorkResponse([res.data.data, ...portfolio]));
            }
            navigation.dispatch(jumpToAction);
          } else {
            throw new Error("");
          }
        })

        .catch((error) => {
          errorHandler(error);
        });
    } catch (error: any) {
      errorHandler(error);
    }
  };
  const errorHandler = (error: any) => {
    if (error?.response?.status == 401) {
      dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
    } else {
      dispatch(enableSnackBar());

      const { message = "" } = error;
      if (message !== "canceled") {
        dispatch(enableSnackBar());
      }
      navigation.dispatch(jumpToAction);
    }
  };
  async function mockUpload(value: number) {
    xOffset.value = (value * maxOffset) / 100;
    // await sleep(200);
  }

  useLayoutEffect(() => {
    xOffset.value = 0;
    if (IsFocused) {
      console.log("editWork", editWork, apiData?.is_file_change);

      if (!editWork || apiData?.is_file_change == "yes") {
        uploadImage();
      } else {
        console.log("editWork");

        showPost(null);
      }
    }
    return () => {
      mockUpload(0);
    };
  }, [IsFocused]);
  const uploadImage = async () => {
    try {
      apiClient
        .post(ApiConfig.GET_SIGN_URL, {
          file_name: apiData.image_name,
          content_type: apiData.image_type,
        })
        .then((data) => {
          task.current = RNFetchBlob.fetch(
            "PUT",
            data.data.data,
            {
              "Content-Type": apiData.image_type,
            },
            RNFetchBlob.wrap(apiData.uri)
          );
          return task.current.uploadProgress((written, total) => {
            mockUpload(Math.round((written * 100) / total));
          });
        })
        .then((data) => {
          showPost(data.respInfo.redirects[0]);
        })
        .catch((error: any) => {
          errorHandler(error);
        });
    } catch (error: any) {
      errorHandler(error);
    }
  };



  useFocusEffect(() => {
    opacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={textColor} barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            task.current?.cancel();
            source.cancel("canceled");
            navigation.goBack();
          }}
        >
          <CrossIcon height={"19"} width={"18"} color={"#0033F7"} />
        </TouchableOpacity>
        <Text style={[styles.heading, { width: "80%" }]}>
          Artwork is uploading
        </Text>
        {/* <TouchableOpacity></TouchableOpacity> */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        {...props}
        style={styles.innerContainer}
      >
        <Animated.View style={[{ width: "100%", padding: 40 }, opacityAnim]}>
          <View
            style={{
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Animated.View style={[{ position: "absolute" }, monogramAnim]}>
              <UploadMonogram
                width={monogramSize}
                height={monogramSize}
                strokeWidth={2.5}
              />
            </Animated.View>
            <View
              style={{
                height: 4,
                width: lineWidth,
                backgroundColor: "rgba(0, 0, 255, 1)",
                marginBottom: 1,
              }}
            />
          </View>
          <View>
            <AppText
              medium
              style={{
                fontSize: 36,
                marginLeft: 8,
                marginTop: 30,
                fontWeight: "bold",
                fontFamily: appFonts.InterBlack,
              }}
            >
              Your{"\n"}Artwork is{"\n"}uploading
            </AppText>
          </View>

          {/* <View
            style={[
              tw('flex items-center'),
              { transform: [{ translateY: 100 }] },
            ]}>
            <TouchableOpacity
              onPress={() => {
                dispatch(disableLoading());
                source.cancel('Cancel');
              navigation.goBack();
              }}>
              <AppText
                medium
                center
                style={tw('text-xl w-28 py-2 text-neonBlue')}>
                Cancel
              </AppText>
            </TouchableOpacity>
          </View> */}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadingSlider;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: textColor },
    innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    header: {
        height: 28.22,
        width: '100%',
        paddingLeft: 22.4,
        paddingRight: 22.4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // marginTop: 20,
    },
    heading: {
        fontFamily: appFonts.InterRegular,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 22.0843,
        alignItems: 'center',
        textAlign: 'center',
        color: iconColor,
    },
});
