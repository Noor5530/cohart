/* Copyright (C) Cohart Inc — All Rights Reserved
 * Unauthorized copying of this file via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Cohart Inc <support@cohart.co> on 2021-11-01 13:36:13
 * Copyright terms written by Cohart Inc <support@cohart.co>, 2021-11-01 13:36:13
 */


import analytics from '@segment/analytics-react-native';
import StatusBar from 'components/CustomStatusBar';
import ListEmpty from 'components/ListEmpty';
import AppHeader
  from 'components/AppHeader';
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeModules,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { textColor } from '../../config/colors';
import { isIphoneX } from '../../lib/isIphone';
import AppState from '../../models/reducers';
import VideoPost from 'screens/Discover/components/Post';
import Alert from 'components/Alert';
import { getUserPost } from 'services/getUserPost';
import { enableSnackBar } from 'store/actions/snackBarAction';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';
import { deletePost } from 'services/deletePost';
import ReportBottomSheet from "components/ReportBottomSheet";
import reportPost from 'services/reportPost';
import blockPost from 'services/blockPost';
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface Props {
  onAcceptTitle?: string;
  onRejectTitle?: string;
  title?: string;
  message?: string;
  onReject: () => void;
  onAccept: () => void;
}
const { StatusBarManager } = NativeModules;


interface IProps {
  route?: {
    params: {
      postId: string,
      currentUser: string,
      post: string,
      user_id: TemplateStringsArray,
    }
  };
}


export const SnapShotView: FC<IProps> = ({ route }: IProps) => {
  const { height, width } = useWindowDimensions();
  const [allPosts, setAllPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const user = useSelector((state: AppState) => state.user);
  const videoComponentRef = useRef({});
  const currentUser = route?.params?.currentUser;
  const user_id = route?.params?.post.user_id;
  const postId = route?.params?.postId;
  const [showOption1Alert, setShowOption1Alert] = useState(false);
  const [showOption2Alert, setShowOption2Alert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const isFocus = useIsFocused()
  const [pageError, setPageError] = useState(false);
  const navigation = useNavigation()
  const bottomSheetRef = React.useRef(null);
  const [isAcceptGuideLines, setAcceptGuideLines] = useState(
    user.isAcceptGuideLines,
  );
  console.log("data", showAlert);

  const [isMuted, setIsMuted] = useState(false);
  const flatListRef = useRef()
  useEffect(() => {

    return () => {
      setAllPosts([]);
      setIndex(0);
      setPageNumber(1);
      setPageError(false);
      setShowOption1Alert(false);
      setShowOption2Alert(false);
    };
  }, [isFocus])
  useLayoutEffect(() => {
    if (user_id && isFocus) {
      getSnapShot()
    }
  }, [user_id, route], isFocus);

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 95,
  });

  const onViewRef = React.useRef((props: any) => {
    if (Platform.OS == 'android') {
      // eslint-disable-next-line react/prop-types
      props.changed.forEach((item: { key: string, index: number }) => {
        const cell = videoComponentRef[item.key];
        const prevCell = videoComponentRef[`id_${item.index - 1}`];
        setIndex(item.index);
        if (cell) {
          if (item.isViewable) {
            prevCell?.pause();
            cell.play();
            item.startedViewing = new Date();
            analytics.screen('Post', {
              index: item.index,
              user_id: item.item.user_id,
              username: item.item.created_by.username,
              user_location: item.item.created_by.location,
              user_state: item.item.created_by.state,
              user_country: item.item.created_by.country,
              user_tags: item.item.created_by.tags,
              user_last_active: item.item.created_by.last_active,
              user_is_admin: item.item.created_by.is_admin,
              user_accepted_guidelines:
                item.item.created_by.accepted_guideline,
              post_id: item.item._id,
              post_type: item.item.post_type,
              title: item.item.title,
              tags: item.item.tags,
              description: item.item.description,
            });
          } else {
            cell.pause();
            cell.back();
            if (item.startedViewing) {
              const stoppedViewing = new Date();
              const duration =
                stoppedViewing.getTime() -
                item.startedViewing.getTime();
              analytics.track('Viewed_post', {
                index: item.index,
                user_id: item.item.user_id,
                username: item.item.created_by.username,
                user_location: item.item.created_by.location,
                user_state: item.item.created_by.state,
                user_country: item.item.created_by.country,
                user_last_active:
                  item.item.created_by.last_active,
                user_is_admin: item.item.created_by.is_admin,
                user_accepted_guidelines:
                  item.item.created_by.accepted_guideline,
                post_id: item.item._id,
                post_type: item.item.post_type,
                title: item.item.title,
                tags: item.item.tags,
                description: item.item.description,
                viewing_duration: duration,
              });
            }
          }
        }
      });
    }
  });

  console.log('index', index);

  const getSnapShot = useCallback(async () => {
    try {
      let post = [];
      post[0] = route?.params?.post


      setLoader(true);
      setPageNumber(1);
      setPageNumber(1);
      setPageError(false);

      let data = await getUserPost({
        page: 1,
        page_size: 20,
        user_id: user_id,
      });
      setLoader(false);

      if (data?.data?.statusCode === 200) {

        setAllPosts([...post, ...data?.data?.data,]);
      }
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setLoader(false);
      dispatch(enableSnackBar());
    }
  }, [user_id, route, route?.params?.post, setAllPosts]);


  const getVideoHeight = () => {
    return Platform.OS == "ios"
      ? height + StatusBarManager.HEIGHT - 66 - 80 - (isIphoneX() ? 36 : 13)
      : height - 60 - 80;
  };

  const flatListHeight = useMemo(() => getVideoHeight, []);

  const onDeletePost = useCallback(async () => {
    try {
      console.log('allPosts');

      setShowOption2Alert(false);
      dispatch(enableLoading());
      let data = await deletePost({
        post_id: allPosts[index]._id,
        id: user_id,
      });
      console.log("deletedata", data);
      setShowOption2Alert(false);

      navigation.goBack();
      dispatch(disableLoading());
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      navigation.goBack();
      dispatch(disableLoading());
      dispatch(enableSnackBar());
    }
  }, [postId, user_id, allPosts]);
  // const onEndReach = () => {

  // };
  const loadMoreSnapShot = useCallback(async () => {
    if (!pageError && allPosts?.length != 0) {
      try {

        setLoader(true);
        let data = await getUserPost({
          page: pageNumber + 1,
          page_size: 20,
          user_id: user_id,
        });
        setLoader(false);

        setPageNumber((prv) => prv + 1);
        if (
          data?.data?.statusCode === 200 &&
          Array.isArray(data?.data?.data) &&
          data?.data?.data?.length != 0
        ) {
          setAllPosts((prv) => prv.concat(data?.data?.data));
        } else {
          setPageError(true);
        }
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }
        setPageError(true);
        setLoader(false);
      }
    }
  }, [user?._id, currentUser, pageError, pageNumber, allPosts]);

  const renderVideo = useCallback(
    ({ item, index: currentIndex }) => {

      if (item.jw_media_url) {
        return (
          <VideoPost
            ref={ref => {
              videoComponentRef[`id_${currentIndex}`] = ref;
            }}
            setIsMuted={setIsMuted}
            isMuted={isMuted}
            setAllPosts={setAllPosts}
            isPreview={false}
            allPosts={allPosts}
            currentIndex={0}
            index={0}
            setAcceptGuideLines={setAcceptGuideLines}
            isAcceptGuideLines={isAcceptGuideLines}
            onSearch={() => {
              bottomSheetRef?.current?.snapTo(0);
            }}
            key={item._id}
            style={{
              width: width,
              height: flatListHeight(),
            }}
            post={item}
          />
        );
      }
    },

    [
      bottomSheetRef,
      loader,
      allPosts,
      isAcceptGuideLines,
      setAcceptGuideLines,
      isMuted,
      setIsMuted,
    ],
  );

  const onScrollEndDrag = useCallback(
    ({ nativeEvent }) => {
      let index =
        Platform.OS == 'android'
          ? Math.ceil(nativeEvent.contentOffset.y / flatListHeight())
          : Math.ceil(
            nativeEvent.targetContentOffset.y / flatListHeight(),
          );
      setIndex(index);
      const cell = videoComponentRef[`id_${index}`];
      const preCell = videoComponentRef[`id_${index - 1}`];
      preCell?.back();

      preCell?.pause();
      cell?.play();
      cell?.back();

      analytics.screen('Post', {
        post: allPosts[index],
      });
    },
    [setIndex, videoComponentRef, flatListHeight],
  );

  const onScrollBeginDrag = useCallback(
    () => {
      const cell = videoComponentRef[`id_${index}`];
      cell?.pause();
    },
    [index, videoComponentRef],
  );
  const ListFooter = useCallback(() => {
    return (
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {loader ? (
          <ActivityIndicator
            color="black"
            size="large"
          />
        ) : (
          <View />
        )}
      </View>
    );
  }, [loader])
  const ListEmptyComponent = useCallback(() => {
    if (!loader) {
      return (

        <ListEmpty
          style={{
            height: flatListHeight(),
          }}
        />
      );
    } else {
      return (<View />)
    }

  }, [loader]);
  const onEditAccept = () => {
    console.log('index', index);

    setShowOption1Alert(false),
      navigation.navigate("UserPostPreview", {
        mediaUrl: null,
        post: allPosts[index],
        post_type: allPosts[index]?.post_type,
        editView: true,
      }
    )
  };
  const onBlockPost = useCallback(async () => {
    try {
      setShowAlert(false);
      dispatch(enableLoading());
      // blockUser will replaced by blockPost
      let data = await blockPost({
        post_id: allPosts[index]?._id,
        id: user_id,
      });
      console.log("data", data);

      navigation.goBack();
      dispatch(disableLoading());
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      setShowOption1Alert(false)
      navigation.goBack();

      dispatch(disableLoading());
      dispatch(enableSnackBar());
    }
  }, [user_id, currentUser]);
  const onReportPost = useCallback(async () => {
    try {
      setShowAlert(false);
      dispatch(enableLoading());
      // reportUser service will be exchange with reportPost when api deployed
      let data = await reportPost({
        post_id: allPosts[index]?._id,
        id: user_id,
      });
      console.log("data", data);
      navigation.goBack();
      dispatch(disableLoading());
      bottomSheetRef?.current.snapTo(1);
    } catch (error) {
      dispatch(disableLoading());
      dispatch(enableSnackBar());
      bottomSheetRef?.current.snapTo(1);
      navigation.goBack();
    }
  }, [user_id, currentUser]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <AppHeader
          headerTitle={
            route?.params?.post.created_by?.first_name + "'s SnapShorts"
          }
          Option1={currentUser ? "Edit" : "Block"}
          Option2={currentUser ? "Delete" : "Report"}
          onSelectOption1={() => {
            currentUser ? setShowOption1Alert(true) : setShowOption1Alert(true);
          }}
          onSelectOption2={() => {
            currentUser
              ? setShowOption2Alert(true)
              : bottomSheetRef?.current?.snapTo(0);
          }}
          onPressDots={() => {}}
          showDot={currentUser ? true : false}
        />
        <FlatList
          disableScrollViewPanResponder
          refreshing={false}
          onRefresh={getSnapShot}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={(event) => {
            if (Platform.OS == "ios") {
              onScrollEndDrag(event);
            }
          }}
          style={[
            {
              height: flatListHeight(),
            },
          ]}
          ListEmptyComponent={ListEmptyComponent}
          getItemLayout={(data, index) => ({
            length: flatListHeight(),
            offset: flatListHeight() * index,
            index,
          })}
          disableIntervalMomentum
          data={allPosts}
          contentContainerStyle={{ paddingBottom: 30 }}
          pagingEnabled={true}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={renderVideo}
          showsVerticalScrollIndicator={false}
          snapToInterval={flatListHeight()}
          ListFooterComponent={ListFooter}
          onEndReached={loadMoreSnapShot}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true}
          keyExtractor={(_, index) => `id_${index}`}
          decelerationRate="fast"
          disableVirtualization={true}
          snapToAlignment="start"
          scrollsToTop={false}
          snapToOffsets={[...Array(allPosts?.length)].map(
            (x, i) => flatListHeight() * i
          )}
          updateCellsBatchingPeriod={5}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={10}
          ref={flatListRef as any}
        />
      </View>
      <Alert
        title={currentUser ? "Edit snapshot?" : "Block ?"}
        visible={showOption1Alert ? true : false}
        message={
          currentUser
            ? "Are you sure you want to edit?"
            : "They won’t be able to message you or find your profile or contents on Cohart. They won’t be notified that you blocked them"
        }
        onAcceptTitle={currentUser ? "Edit" : "Block"}
        onRejectTitle={currentUser ? "Cancel" : "Cancel"}
        onAcceptColor={"red"}
        onRejectColor={"red"}
        onReject={() => {
          currentUser ? setShowOption1Alert(false) : setShowOption1Alert(false);
        }}
        onAccept={currentUser ? onEditAccept : onBlockPost}
      />

      <Alert
        title={currentUser ? "Delete snapshot?" : "Report ?"}
        visible={showOption2Alert ? true : false}
        message={currentUser ? "Are you sure you want to delete?" : "hello"}
        onAcceptTitle={currentUser ? "Delete" : "Report"}
        onRejectTitle={currentUser ? "Cancel" : "Cancel"}
        onAcceptColor={"red"}
        onRejectColor={"red"}
        onReject={() => {
          currentUser ? setShowOption1Alert(false) : setShowOption1Alert(false);
        }}
        onAccept={currentUser ? onDeletePost : () => setShowOption1Alert(false)}
      />
      <ReportBottomSheet
        onPresSubmit={onReportPost}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
};

export default SnapShotView;