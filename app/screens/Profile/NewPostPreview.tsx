import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import AppHeader from 'components/AppHeader';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import VideoPost from 'components/VideoPost';
import { iconColor, textColor } from 'config/colors';
import { isIphone } from 'lib/isIphone';
import { NewPostPreviewRouteProps, StackScreen } from 'navigation/types';
import React, { useMemo, useState } from 'react';
import {
    NativeModules,
    Platform,
    useWindowDimensions,
    View,
} from 'react-native';
import Alert from 'components/Alert';

const { StatusBarManager } = NativeModules;
interface Props {
    onAcceptTitle?: string;
    onRejectTitle?: string;
    title?: string;
    message?: string;

}
export const NewPostPreview: StackScreen<'NewPostPreview'> = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute<NewPostPreviewRouteProps>();
    const tabBarHeight = useBottomTabBarHeight();
    const isFocused = useIsFocused();
    const getVideoHeight = () => {
        return Platform.OS == "ios"
            ? height + StatusBarManager.HEIGHT - 22 - tabBarHeight
            : height - 60;
    };
    const flatListHeight = useMemo(() => getVideoHeight, []);
    const currentUser = route?.params?.currentUser
    const [showAlert, setShowAlert] = useState(false);


    const ShowAlertCard = (props: Props) => {
        return (
            <Alert
                title={props.title}
                visible
                message={props.message}
                onAcceptTitle={props.onAcceptTitle}
                onRejectTitle={props.onRejectTitle}
                onAcceptColor={'red'}
                onRejectColor={'red'}
                onReject={() => setShowAlert(false)}
                onAccept={() => {
                    setShowAlert(false);
                    //   logOut();
                }}
            />
        );
    };
    return (
      <>
        <View
          style={{
            height: flatListHeight(),
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatusBar backgroundColor={textColor} barStyle="dark-content" />
          {route?.params?.showPreviewText ? (
            <Header
              style={{
                paddingHorizontal: 20,
                height: 80,
                paddingTop: isIphone(),
              }}
              title={route?.params?.showPreviewText ? "Preview" : "COHART"}
              back={true}
              color={iconColor}
              textColor={iconColor}
              onPress={() => {
                navigation.navigate("NewPost", {
                  post: route?.params?.post,
                  mediaUrl: route?.params?.post.mediaUrl,
                  editView: false,
                });
              }}
              checkMark={route?.params?.showPreviewText ? true : false}
            />
          ) : (
            <AppHeader
              headerTitle={
                route?.params?.post.created_by?.first_name + "'s SnapShorts"
              }
              Option1={currentUser ? "Edit" : "Block"}
              Option2={currentUser ? "Delete" : "Report"}
              onSelectOption1={() => {
                console.log("here");
                setShowAlert(true);
              }}
              onSelectOption2={() => {
                console.log("here");
                setShowAlert(true);
              }}
              onPressDots={() => {}}
            />
          )}

          <VideoPost
            style={{
              height: flatListHeight() - 80,
              width: width,
            }}
            onSearch={() => {}}
            isPreview={isFocused ? true : false}
            post={route?.params?.post}
            from={route.params.from}
          />
        </View>
        {showAlert && (
          <ShowAlertCard
            title={currentUser ? "Edit snapshot?" : "Block "}
            message={
              currentUser
                ? "Are you sure you want to edit?"
                : "They won’t be able to message you or find your profile or contents on Cohart. They won’t be notified that you blocked them"
            }
            onAcceptTitle={currentUser ? "Cancel" : "Cancel"}
            onRejectTitle={currentUser ? "Edit" : "Block"}
          />
        )}
      </>
    );
};
