
import {
    useIsFocused,
    useNavigation,
    useRoute,
    TabActions,
} from '@react-navigation/native';
import SnapshotOptionBottomSheet from 'components/SnapshotOptionBottomSheet';
import Header from 'components/Header';

import { appFonts } from "components/text";
import { useDispatch, useSelector } from 'react-redux';

import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPostDetail } from 'services/getPostDetail';
import { deletePost, logOutRequest } from "store/actions/userActions";
import AppState from "models/reducers";
import { LogOutRequestEnum } from "models/actions/user";

const SnapshotOptions = () => {
  // const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const isFocused = useIsFocused();
  const [postDetail, setPostDetail] = useState({});
  const IsFocused = useIsFocused();
  const jumpToAction = TabActions.jumpTo("MyProfile");

  const user_id = useSelector((state: AppState) => state.user._id);
  // console.log(user_id, route.params?.post._id);
  const bottomSheetRef = useRef();
  const [showAllUserBottomSheet, setAllUserBottomSheet] = useState(false);
  const getPostDetailApi = async () => {
    setIsLoading(true);
    try {
      let response = await getPostDetail({
        user_id: user_id,
        post_id: route.params?.post._id,
      });
      if (response?.data?.statusCode === 200) {
        setPostDetail(response?.data?.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    bottomSheetRef?.current?.snapTo(1);

    getPostDetailApi();
  }, [IsFocused]);
  const deleteUserPost = () => {
    navigation.dispatch(jumpToAction);
    dispatch(
      deletePost({
        post_id: route.params?.post._id,
        id: user_id,
      })
    );
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <Header back />
        <View
          style={{
            width: "100%",
            height: 250,
            backgroundColor: "#E6FF00",
            alignItems: "center",
          }}
        >
          <Text style={styles.snapShotOptionText}>Insights</Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                height: 80,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: appFonts.InterRegular,
                  fontSize: 14,
                }}
              >
                VIEWS
              </Text>

              {isLoading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <Text
                  style={{
                    fontSize: 35,
                    fontFamily: appFonts.InterRegular,
                  }}
                >
                  {postDetail?.view_count}
                </Text>
              )}
            </View>
            <View
              style={{
                height: 80,
                width: 1,
                borderWidth: 0.7,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                height: 80,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: appFonts.InterRegular,
                  fontSize: 14,
                }}
              >
                GLOWS
              </Text>
              {isLoading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <Text
                  style={{
                    fontSize: 35,
                    fontFamily: appFonts.InterRegular,
                  }}
                >
                  {postDetail?.glow_count}
                </Text>
              )}
            </View>
          </View>
        </View>
        {!isLoading && (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef?.current?.snapTo(0);
                // setAllUserBottomSheet(true);
              }}
              style={{
                height: 42,
                width: 136,
                borderRadius: 39,
                borderWidth: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  fontFamily: appFonts.InterRegular,
                }}
              >
                DELETE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserPostPreview", route.params);
              }}
              style={{
                height: 42,
                width: 136,
                borderRadius: 39,
                borderWidth: 0.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  fontFamily: appFonts.InterRegular,
                }}
              >
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <SnapshotOptionBottomSheet
        toggleButtonSheet={() => {
          setAllUserBottomSheet(false);
        }}
        isVisible={showAllUserBottomSheet}
        bottomSheetRef={bottomSheetRef}
        deleteUserPost={deleteUserPost}
      />
    </>
  );
};

export default SnapshotOptions;
