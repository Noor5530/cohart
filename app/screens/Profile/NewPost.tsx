import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Header from 'components/PostHeader';
import { appFonts } from 'components/text';
import { iconColor } from 'config/colors';
import { useAppState } from 'hooks/useAppState';
import AppState from 'models/reducers';
import { Posts } from 'models/types';
import { StackScreen } from 'navigation/types';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, NativeModules, Platform, useWindowDimensions, View } from 'react-native';
import Video from 'react-native-fast-video';
import { useSelector } from 'react-redux';

const { StatusBarManager } = NativeModules;

export const NewPost: StackScreen<'NewPost'> = () => {
  const artist = useSelector((state: AppState) => state.user);
  const route = useRoute();
  const navigation = useNavigation();
  const [caption, setCaption] = useState('');
  const [isPause, togglePause] = useState(false);
  const isFocused = useIsFocused();
  const currentAppState = useAppState();

  const tabBarHeight = useBottomTabBarHeight();

  const {
    mediaUrl = '',
    post = null,
    post_type = null,
    editView = false,
  } = route.params;

  useEffect(() => {
    if (isFocused && currentAppState == 'active') {
      togglePause(false);
    } else {
      togglePause(true);
    }
    return () => {
      togglePause(true);
    };
  }, [isFocused, currentAppState]);

  useLayoutEffect(() => {
    if (post !== null && editView == false) {
      setCaption(post.description ? post.description : '');
    } else if (post !== null) {
      setCaption(post.description ? post.description : '');
    }
    return () => {};
  }, [post, isFocused]);

  const openPreview = () => {
    const data: Posts = {
      _id: Math.random().toString(),
      post_file: mediaUrl?.path,
      mediaUrl: mediaUrl,
      post_type: post_type,
      created_by: {
        ...artist,
        interests: artist.interests.toString(),
      },
      tags: artist.interests,
      description: caption,
      title: '',
    };
    navigation.navigate('UserPostPreview', {
      mediaUrl: mediaUrl,
      post: editView ? post : data,
      post_type: post_type,
      editView: editView,
    });
  };

  const { height } = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: iconColor,
      }}>
      <Header
        titleStyle={{ fontFamily: appFonts.InterBlack, fontWeight: '700' }}
        style={{ backgroundColor: 'white' }}
        onPress={openPreview}
        color={iconColor}
        textColor={iconColor}
        title={editView ? 'Edit Snapshot' : 'New Snapshot'}
      />
      {post_type == 'video' ? (
        <Video
          paused={isPause}
          automaticallyWaitsToMinimizeStalling={false}
          resizeMode="contain"
          disableFocus={false}
          allowsExternalPlayback={false}
          pictureInPicture={true}
          playInBackground={false}
          // poster={Poster}
          playWhenInactive={true}
          repeat
          style={[
            {
              height:
                Platform.OS == 'ios'
                  ? height + StatusBarManager.HEIGHT - 22 - tabBarHeight - 80
                  : height - 60 - 80,
            },
          ]}
          source={{
            uri: editView
              ? post?.jw_media_url
                ? post?.jw_media_url
                : post?.post_file
              : mediaUrl.path,
          }}
        />
      ) : (
        <Image
          style={[
            {
              height:
                Platform.OS == 'ios'
                  ? height + StatusBarManager.HEIGHT - 22 - tabBarHeight - 80
                  : height - 60 - 80,
            },
          ]}
          source={{
            uri: editView
              ? post?.jw_media_thumb
                ? post.jw_media_thumb
                : post?.post_file
              : mediaUrl.path,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};
