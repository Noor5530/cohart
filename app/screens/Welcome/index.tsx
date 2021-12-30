import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Platform,
  FlatList,
  NativeModules,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import StatusBar from "components/CustomStatusBar";

import Header from "components/Header";
import { appFonts } from "components/text";
import { textColor, iconColor } from "config/colors";
import { isIphone, isIphoneX } from "../../lib/isIphone";
import BottomTab from "navigation/BottomTab";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import VideoPost from "./components/VideoPost";
import { getFeaturedPosts } from "services/getFeaturedPosts";
import getDeepLinkPost from "services/getDeepLinkPost";
import { Posts } from "models/types";
import { disableLoading, enableLoading } from "store/actions/loadingActions";
import { finishDeeplinkRequest } from "store/actions/appAction";

const { StatusBarManager } = NativeModules;

enum PostConstant {
  Welcome = "Welcome",
  End = "End",
}

interface IProps {
  route?: { params: { postId: string } };
}

const Welcome: React.FC<IProps> = ({ route }: IProps) => {
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(false);
  const [post, setPost] = useState<String[] | Posts[]>([]);
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(enableLoading());

    if (route?.params.postId) {
      setPost([]);
      getDeepLinkPost(route.params.postId)
        .then((res) => {
          dispatch(finishDeeplinkRequest());
          setPost([...res, PostConstant.End]);
          dispatch(disableLoading());
        })
        .catch(() => {
          // TODO: handle error here
          dispatch(disableLoading());
          setPost([PostConstant.Welcome, PostConstant.End]);
        });
      return;
    }

    getFeaturedPosts({ admin_view: false })
      .then((res) => {
        setPost([PostConstant.Welcome, ...res.data.data, PostConstant.End]);

        dispatch(disableLoading());
      })
      .catch((e) => {
        // TODO: handle error here
        console.log("exception: " + JSON.stringify(e));
        dispatch(disableLoading());
        setPost([PostConstant.Welcome, PostConstant.End]);
      });
  }, [route]);

  const navigateRegister = () =>
    navigation.navigate("Register", { isUserJoining: false });

  const getVideoHeight = () => {
    return Platform.OS == "ios"
      ? height + StatusBarManager.HEIGHT - 66 - 80 - (isIphoneX() ? 36 : 20)
      : height - 60 - 80;
  };
  const flatListHeight = useMemo(() => getVideoHeight, []);

  const videoComponentRef = useRef({});

  const renderItem = ({ item, index }) => {
    if (index === 0 && item === PostConstant.Welcome) {
      return <WelcomePage height={flatListHeight()} />;
    }
    if (index === post.length - 1 && item === PostConstant.End) {
      return <Footer height={flatListHeight()} />;
    }

    return (
      <VideoPost
        ref={(ref) => {
          videoComponentRef[`id_${index}`] = ref;
        }}
        setIsMuted={setIsMuted}
        isMuted={isMuted}
        isPreview={false}
        allPosts={[]}
        currentIndex={0}
        index={0}
        key={item._id}
        onNavigateToSignUp={navigateRegister}
        style={{
          width: width,
          height: flatListHeight(),
        }}
        post={item}
      />
    );
  };

  const [index, setIndex] = useState(0);

  const onScrollEndDrag = useCallback(
    ({ nativeEvent }) => {
      let index =
        Platform.OS == "android"
          ? Math.ceil(nativeEvent.contentOffset.y / flatListHeight())
          : Math.ceil(nativeEvent.targetContentOffset.y / flatListHeight());

      if (index == 0 || index == post.length - 1) return;
      setIndex(index);
      const cell = videoComponentRef[`id_${index}`];
      const preCell = videoComponentRef[`id_${index - 1}`];
      preCell?.back();

      preCell?.pause();
      cell?.play();
      cell?.back();
    },
    [setIndex, videoComponentRef, flatListHeight]
  );

  const onScrollBeginDrag = useCallback(
    ({ nativeEvent }) => {
      const cell = videoComponentRef[`id_${index}`];
      cell?.pause();
      console.log(nativeEvent);
    },
    [index, videoComponentRef]
  );

  return (
    <>
      <View key="main" style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />
        <Header
          style={{
            paddingHorizontal: 20,
            height: 80,
            paddingTop: isIphone(),
          }}
          textStyle={{ fontFamily: appFonts.AktivGroteskEx_Trial_Bd }}
          color={iconColor}
          textColor={iconColor}
          renderLeft={<></>}
          renderRight={<></>}
        />
        <FlatList
          disableScrollViewPanResponder
          refreshing={false}
          data={post}
          renderItem={renderItem}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          style={[
            {
              height: flatListHeight(),
              width,
            },
          ]}
          getItemLayout={(data, index) => ({
            length: flatListHeight(),
            offset: flatListHeight() * index,
            index,
          })}
          disableIntervalMomentum
          contentContainerStyle={{ paddingBottom: 30 }}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          //   snapToInterval={flatListHeight()}
          keyExtractor={(item, index) => `id_${index}`}
          decelerationRate="fast"
          disableVirtualization={true}
          snapToAlignment="start"
          snapToOffsets={[...Array(post.length)].map(
            (x, i) => flatListHeight() * i
          )}
          scrollsToTop={false}
          updateCellsBatchingPeriod={5}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
        <BottomTab
          isNavRoot={false}
          onPress={navigateRegister}
          isFirstTimeLogin={false}
          isAcceptGuideLines={false}
          navigation={navigation}
          descriptors={[]}
        />
      </View>
    </>
  );
};

export default Welcome;
