import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import StatusBar from "components/CustomStatusBar";
import Header from "components/Header";
import { iconColor, textColor } from "config/colors";
import useFetch from "hooks/useFetch";
import { isIphoneX } from "lib/isIphone";
import { StackScreen } from "navigation/types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  NativeModules,
  Platform,
  useWindowDimensions,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
// import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import AppState from "../../models/reducers";
import VideoPost from "./components/Post";

const { StatusBarManager } = NativeModules;

const NewPostPreview: StackScreen<"NewPostPreview"> = () => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const [post, setPost] = useState(null);
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  const {
    state: { status, data },
    refetch: fetchPost,
  } = useFetch<any>(
    "https://rwl5b7ig39.execute-api.us-east-1.amazonaws.com/staging/fetchPostDetail",
    {
      method: "POST",
      data: { post_id: "" },
    }
  );
  const tabBarHeight = 75;
  const isFocused = useIsFocused();
  const getVideoHeight = () => {
    return Platform.OS == "ios"
      ? height + StatusBarManager.HEIGHT - 22 - tabBarHeight
      : height - 60;
  };
  console.log("route?.params", route?.params);
  useEffect(() => {
    fetchPost({
      data: {
        post_id: route?.params?.id,
      },
    });
  }, [route?.params?.id]);

  console.log("post", data, status);
  useEffect(() => {
    if (data != undefined && data.data) {
      setPost(data.data);
    }
  }, [data]);
  useEffect(() => {
    return () => {
      setPost(null);
    };
  }, [isFocused]);
  const flatListHeight = useMemo(() => getVideoHeight, []);
  const bottomSheetRef = useRef();

  return (
    <>
      <View
        style={{
          height: flatListHeight(),
          width: "100%",
        }}
      >
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <Header
          style={{
            paddingHorizontal: 20,
            height: 80,
            paddingTop: isIphoneX(),
          }}
          title={"COHART"}
          back={true}
          color={iconColor}
          textColor={iconColor}
          goBack={() => {
            navigation.navigate(isLoggedIn ? "Discover" : "Base");
          }}
          onPress={() => {
            // navigation.navigate('NewPost', {
            //     post: route?.params?.post,
            //     mediaUrl: route?.params?.post.mediaUrl,
            //     editView: false,
            // });
          }}
        />

        {post != null ? (
          <VideoPost
            style={{
              height: flatListHeight() - 80,
              width: width,
            }}
            onSearch={() => {
              bottomSheetRef?.current?.snapTo(0);
            }}
            isPreview={isFocused ? true : false}
            post={post}
          />
        ) : (
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <ActivityIndicator color="black" size="small" />
          </View>
        )}
      </View>
    </>
  );
};

export default NewPostPreview;
// const styles = StyleSheet.create({
//     container: { width: '100%', height: '100%', backgroundColor: iconColor },
//     playButtonView: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         zIndex: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     loadingView: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 10,
//     },
//     videStyle: {
//         width: '100%',
//         height: '100%',
//     },
//     imageStyle: {
//         width: '100%',
//         height: '100%',
//         zIndex: 1,
//     },
//     innerContainer: {
//         position: 'absolute',
//         width: '100%',
//         bottom: 5,
//     },
//     containerView: {},
//     descriptionView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 4,
//         paddingBottom: 4,
//         paddingLeft: 8,
//         paddingRight: 8,
//         margin: 16,
//         backgroundColor: iconColor,
//         opacity: 0.5,
//         borderRadius: 6,
//     },
//     iconView: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//     },
//     icon: {
//         marginBottom: 12,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderColor: textColor,
//         borderWidth: 1,
//         width: 40,
//         height: 40,
//         borderRadius: 9999,
//     },
//     isMuted: {
//         width: 36,
//         height: 1.5,
//         backgroundColor: textColor,
//         position: 'absolute',
//         transform: [{ rotate: '45deg' }],
//     },
//     headingView: {
//         flexDirection: 'row',
//         width: '100%',
//         alignItems: 'flex-end',
//         justifyContent: 'space-between',
//         marginBottom: heightPercentageToDP('1'),
//     },
//     heading: {
//         color: textColor,
//         fontSize: 36,
//         bottom: -heightPercentageToDP('0.8'),
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: '0%',
//         maxWidth: '75%',
//     },
//     imageView: { alignItems: 'flex-end' },
//     image: {
//         width: 40,
//         height: 40,
//         borderRadius: 9999,
//         marginBottom: 8,
//         borderWidth: 1,
//         borderColor: textColor,
//         alignSelf: 'flex-end',
//     },
//     bottomView: {
//         position: 'absolute',
//         // backgroundColor: 'yellow',
//         width: '100%',
//         paddingTop: 15,
//         paddingHorizontal: 20,
//         paddingBottom: 15,
//         bottom: 0,
//     },
// });
