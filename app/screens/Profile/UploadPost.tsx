import { useFocusEffect } from '@react-navigation/core';
import { TabActions, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import axios from 'axios';
import StatusBar from 'components/CustomStatusBar';
import { CrossIcon } from 'components/Icons';
import { appFonts, AppText } from 'components/text';
import ApiConfig from 'config/api-config';
import { iconColor, textColor } from 'config/colors';
import AppState from 'models/reducers';
import React, { FC, useLayoutEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { apiClient } from 'services/client';
import { addNewPostResponse, getUserPostsResponse } from 'store/actions/appAction';
import { enableSnackBar } from 'store/actions/snackBarAction';
import { UploadMonogram } from 'utils/icons';
import { logOutRequest } from 'store/actions/userActions';
import { LogOutRequestEnum } from 'models/actions/user';

interface IProps {
    style: ViewStyle;
    apiData: object;
}

const UploadingSlider: FC<
    ViewProps & {
        apiData: object;
    }
> = (props: IProps) => {
    const dispatch = useDispatch();
    const opacity = useSharedValue(0);
    const { width } = useWindowDimensions();
    const lineWidth = Math.min(width * 0.8, 600);
    const monogramSize = 35;
    const maxOffset = lineWidth - monogramSize / 2;
    const xOffset = useSharedValue(0);
    const posts = useSelector((state: AppState) => state.app.userPost);

    const source = axios.CancelToken.source();
    const userPost = useSelector((state: AppState) => state.app.userPost);
    const jumpToAction = TabActions.jumpTo('MyProfile');
    const navigation = useNavigation();
    const route = useRoute();
    const IsFocused = useIsFocused();
    const { apiData, editView } = route.params;
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
    async function mockUpload(value: number) {
        // xOffset.value = maxOffset - (value / maxOffset) * 100;
        xOffset.value = (value * maxOffset) / 100;

        // await sleep(200);
    }
    const task = useRef();
    const showPost = async data => {
        try {
            const config = {
                cancelToken: source.token,
                onUploadProgress: function (progressEvent) {
                    if (editView) {
                        mockUpload(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total,
                            ),
                        );
                    }
                },
            };

            apiClient
                .post(
                    editView ? ApiConfig.EDIT_POST : ApiConfig.CREATE_POST,
                    data,
                    config,
                )
                .then(res => {
                    if (res.data.data) {
                        navigation.dispatch(jumpToAction);
                        mockUpload(0);
                        const data = [...userPost];
                        if (editView) {
                            const index = posts.findIndex(item => {
                                return item._id == res.data.data._id;
                            });
                            const data = [...posts];
                            if (index !== -1) {
                                data[index] = res.data.data;
                            }
                            dispatch(getUserPostsResponse(data));
                        } else {
                            data.unshift(res.data.data);
                            dispatch(addNewPostResponse(data));
                        }
                    } else {
                        throw new Error('');
                    }
                })
                .catch(error => {
                    errorHandler(error,data)
                });
        } catch (error) {
            errorHandler(error,data)

        }

        // createPost(data, config);
    };
    const errorHandler = (error:any,data:any) => {
        if (error?.response?.status == 401) {
            dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        } else {
            const { message = '' } = error;
            analytics.track('Video Uploading', {
                status: 'error',
                file: JSON.stringify(data),
                error: JSON.stringify(error),
            });
            if (message !== 'canceled') {
                dispatch(enableSnackBar());
            }
            mockUpload(0);
            navigation.dispatch(jumpToAction);
        }
    }
    useLayoutEffect(() => {
        xOffset.value = 0;
        if (IsFocused && editView) {
            analytics.track('Video Editing', {
                status: 'uploading',
                file: JSON.stringify(apiData),
            });
            showPost(apiData);
        } else if (IsFocused) {
            uploadPost();
        }
        return () => {
            mockUpload(0);
        };
    }, [IsFocused]);

    const uploadPost = async () => {
      try {
        analytics.track("Video Uploading", {
          status: "uploading",
          file: JSON.stringify(apiData),
        });

        apiClient
          .post(ApiConfig.GET_SIGN_URL, {
            file_name: apiData.file_name,
            content_type: apiData.urlContentType,
          })
          .then((data) => {
            task.current = RNFetchBlob.fetch(
              "PUT",
              data.data.data,
              {
                "Content-Type": apiData.urlContentType,
              },
              RNFetchBlob.wrap(
                Platform.OS == "ios"
                  ? apiData.file_value.replace("file://", "")
                  : apiData.file_value
              )
            );

            return task.current.uploadProgress((written, total) => {
              mockUpload(Math.round((written * 100) / total));
            });
          })
          .then((data) => {
            const apiBody = { ...apiData };
            apiBody.post_file = data.respInfo.redirects[0].split("?")[0];
            showPost(apiBody);
          })
          .catch((error) => {
            errorHandler(error, apiData);
          });
      } catch (error) {
        errorHandler(error, apiData);
      }
    };

    useFocusEffect(() => {
        opacity.value = withTiming(1, {
            duration: 400,
            easing: Easing.out(Easing.exp),
        });
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: textColor }}>
            <StatusBar backgroundColor={iconColor} barStyle="light-content" />
            <View
                style={{
                    height: 28.22,
                    width: '100%',
                    paddingLeft: 22.4,
                    paddingRight: 22.4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{}}
                    onPress={() => {
                        task.current?.cancel();
                        source.cancel('canceled');
                        navigation.goBack();
                    }}>
                    <CrossIcon height={'19'} width={'18'} color={'#0033F7'} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: appFonts.InterRegular,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        width: '80%',
                        fontSize: 22.0843,
                        alignItems: 'center',
                        textAlign: 'center',
                        color: iconColor,
                    }}>
                    New Snapshot
                </Text>

                <TouchableOpacity />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                {...props}
                style={[
                    { flex: 1, alignItems: 'center', justifyContent: 'center' },
                    props.style,
                ]}>
                <View style={{ width: '100%', paddingHorizontal: 40 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                        <Animated.View
                            style={[{ position: 'absolute' }, monogramAnim]}>
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
                                backgroundColor: 'rgba(0, 0, 255, 1)',
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
                                marginTop: 24,
                                fontWeight: 'bold',
                                fontFamily: appFonts.InterBlack,
                            }}>
                            Your snapshot {'\n'}is uploading
                        </AppText>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default UploadingSlider;
