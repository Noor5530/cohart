import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import DummyAvatar from "assets/dummyAvator.png";
import StatusBar from "components/CustomStatusBar";
import Header from "components/Header";
import { ChatSendIcon } from "components/Icons";
import ApiConfig from "config/api-config";
import { borderColor } from "config/colors";
import useFetch from "hooks/useFetch";
import AppState from "models/reducers";
import moment from "moment";
import { ChatScreenRouteProps } from "navigation/types";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  Avatar,
  AvatarProps,
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  MessageImageProps,
  Time,
  TimeProps,
} from "react-native-gifted-chat";
// import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { enableSnackBar } from "store/actions/snackBarAction";

import { primary } from "../../config/colors";
import styles from "./style";

const CONFIG_NEW = {
  future: "in %s before",
  past: "%s ago",
  s: "A Few Seconds",
  ss: "%d Seconds",
  m: "A Minute",
  mm: "%d Minutes",
  h: "1 Hour",
  hh: "%d Hour",
  d: "A Day",
  dd: "%d Days",
  M: "1 Month",
  MM: "%d months",
  y: "Year",
  yy: "%d Years",
};
moment.updateLocale("en", { relativeTime: CONFIG_NEW });

let ws: WebSocket | null = null;

const ChatScreen = () => {
  const [messagesList, setMessagesList] = useState<Array<IMessage>>([]);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProps>();
  const { friend = null, user = null } = route.params;
  const [isConnected, setIsConnected] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [lastActive, setLastActive] = useState(0);
  const live_data = useSelector((state: AppState) => state.app.live_data);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {
    state: { status, data },
    refetch: fetchPreviousMessage,
  } = useFetch<any>(ApiConfig.PREVIOUS_CHAT, {
    method: "POST",
    data: {
      sender_id: user._id,
      receiver_id: friend._id,
    },
  });

  useEffect(() => {
    if (data !== undefined && Array.isArray(data)) {
      const messages = data?.map(
        (item: {
          _id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at: string;
        }) => {
          const data = {
            _id: item?._id,
            text: item?.content,
            createdAt: item?.created_at * 1000,
            user: {
              _id: item?.sender_id == user._id ? user._id : friend._id,
              name:
                item?.sender_id == user._id
                  ? user?.full_name
                  : friend?.full_name,
              avatar:
                item?.sender_id == user._id
                  ? user?.cover_image
                  : friend?.cover_image,
              data: item?.sender_id == user._id ? user : friend,
            },
          };
          return data;
        }
      );
      setMessagesList(messages);
    }
  }, [data]);
  useEffect(() => {
    setIsLive(friend?.is_live == true ? true : false);
    setLastActive(friend?.last_active ? friend?.last_active * 1000 : 0);

    if (live_data !== null) {
      if (friend._id == live_data?.user_id) {
        if (live_data?.is_live == true) {
          setIsLive(true);
        } else {
          let date = new Date();
          setIsLive(false);
          setLastActive(date.getMilliseconds());
        }
      }
    }
  }, [live_data, friend]);

  const connectToWebSocket = () => {
    ws = new WebSocket(
      `${ApiConfig.WEB_SOCKET_URL}sender_id=${user._id}&receiver_id=${friend._id}`
    );
    ws.onopen = () => {
      setIsConnected(true);
    };
    if (!isConnected) {
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    }
  };
  useEffect(() => {
    try {
      if (isFocused) {
        connectToWebSocket();
        if (ws !== null) {
          ws.onerror = () => {
            setIsConnected(false);
          };
          ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            if (message?.message) {
              dispatch(enableSnackBar(message?.message));
            } else {
              let messageData = message?.messages[0];
              console.log("message", messageData);

              if (messageData?.sender_id !== user._id) {
                const messageContent = {
                  _id:
                    new Date().toISOString() + Math.floor(Math.random() * 100),
                  text: messageData?.content,
                  createdAt: new Date(),
                  user: {
                    _id: friend?._id,
                    name: friend?.full_name,
                    avatar: friend?.cover_image,
                  },
                };
                setMessagesList((previousMessages) =>
                  GiftedChat.append(previousMessages, messageContent)
                );
              }
            }
          };
        }
      } else if (!isFocused) {
        if (ws !== null) {
          ws.close();
        }
      }
    } catch (error) {
      // TODO handle error exception
    }

    return () => {
      try {
        if (ws !== null) {
          ws.close();
          ws.onclose = () => {
            console.log("here");
            setIsConnected(false);
            ws = null;
          };
        }
        setMessagesList([]);
        setIsConnected(false);
      } catch (error) {
        // TODO handle error exception
      }
    };
  }, [friend?._id, isFocused]);

  useEffect(() => {
    if (isFocused) {
      fetchPreviousMessage({
        data: {
          sender_id: user?._id,
          receiver_id: friend?._id,
        },
      });
    }
  }, [isFocused]);

  // ====================================
  // if we send images in chat than commented code is useful
  // ====================================

  // const chooseImageFormGallery = () => {
  //     ImagePicker.openPicker({
  //         mediaType: 'photo',
  //     }).then(async image => {
  //         onSendMediaMessage(image.path);
  //     });
  // };

  // const chooseImageFormCamera = () => {
  //     ImagePicker.openCamera({
  //         mediaType: 'photo',
  //     }).then(image => {
  //         onSendMediaMessage(image.path);
  //     });
  // };
  // const onSendMediaMessage = (image: string) => {
  //     const messageImage = {
  //         _id: new Date().toISOString(),
  //         text: message,
  //         image: image,
  //         createdAt: new Date(),
  //         user: {
  //             _id: user?._id,
  //             name: user?.full_name,
  //             avatar: user?.cover_image,
  //         },
  //     };
  //     setMessagesList(GiftedChat.append(messagesList, [messageImage]));
  //     setMessage('');
  // };
  // const chooseImage = () => {
  //   ActionSheet.showActionSheetWithOptions(
  //     {
  //       title: 'Update Profile Photo',
  //       options: ['Take Photo', 'Choose from Library', 'Cancel'],
  //       cancelButtonIndex: 2,
  //     },

  //     buttonIndex => {
  //       if (buttonIndex === 0) {
  //         chooseImageFormCamera();
  //       } else if (buttonIndex === 1) {
  //         chooseImageFormGallery();
  //       }
  //     },
  //   );
  // };

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        containerStyle={{
          right: styles.bubbleContainer,
          left: styles.bubbleContainer,
        }}
        containerToPreviousStyle={{
          right: styles.bubbleContainer,
          left: styles.bubbleContainer,
        }}
        containerToNextStyle={{
          right: styles.bubbleContainer,
          left: styles.bubbleContainer,
        }}
        textStyle={{
          right: styles.bubbleTextStyle,
          left: styles.bubbleTextStyle,
        }}
        wrapperStyle={{
          right: styles.bubbleWarpRight,
          left: styles.bubbleWarpLeft,
        }}
      />
    );
  };
  const renderTime = (props: TimeProps<IMessage>) => (
    <Time
      {...props}
      timeTextStyle={{
        right: styles.rightTime,
        left: styles.leftTime,
      }}
    />
  );

  const renderAvatar = (avatarProps: AvatarProps<IMessage>) => {
    const { currentMessage } = avatarProps;
    return (
      <Avatar
        {...avatarProps}
        renderAvatar={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (currentMessage?.user._id !== user._id) {
                  navigation.navigate("Community", {
                    screen: "UserProfile",
                    params: {
                      user: currentMessage?.user,
                      userType: "",
                      back: true,
                    },
                  });
                } else {
                  navigation.navigate("MyProfile", {
                    //currentUser true, but its not occured in it
                    currentUser: true,
                  });
                }
              }}
              style={[
                styles.avatarView,
                {
                  borderColor: borderColor,
                  borderWidth:
                    currentMessage?.user._id == user._id ? 1 : isLive ? 1 : 0,
                },
              ]}
            >
              <FastImage
                source={
                  currentMessage?.user?.avatar
                    ? {
                        uri: currentMessage?.user?.avatar,
                      }
                    : DummyAvatar
                }
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const onSend = () => {
    try {
      if (isConnected && ws !== null && message !== "") {
        const messages = {
          _id: new Date().toISOString() + Math.floor(Math.random() * 100),
          text: message,
          createdAt: new Date(),
          user: {
            _id: user?._id,
            name: user?.full_name,
            avatar: user?.cover_image,
          },
        };

        setMessagesList((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
        ws.send(
          JSON.stringify({
            action: "sendMessage",
            sender_id: user?._id,
            receiver_id: friend._id,
            content: message,
          })
        );
        setMessage("");
      } else {
        connectToWebSocket();
        dispatch(enableSnackBar("Unable to connect with user"));
      }
    } catch (error) {
      dispatch(enableSnackBar("Unable to connect with user"));
    }
  };

  const renderImage = (imageProps: MessageImageProps<IMessage>) => (
    <FastImage
      source={{ uri: imageProps.currentMessage?.image }}
      style={styles.messageImageStyle}
    />
  );

  const renderComposer = () => {
    return (
      <View style={styles.composerView}>
        <View style={styles.composerInnerView}>
          {/* <TouchableOpacity onPress={chooseImage}>
            <Entypo
              name="camera"
              color={'#E3E3E3'}
              size={wp('6')}
              style={{ paddingHorizontal: wp('3') }}
            />
          </TouchableOpacity> */}

          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder={"Type Message Here"}
            onChangeText={(text) => {
              setMessage(text.substring(0, 500));
            }}
            value={message}
          />
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            if (message !== "") {
              analytics.track("Message_sent", {
                friend: friend,
                user: user,
              });
              onSend();
            }
          }}
        >
          <ChatSendIcon />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View key="chat" style={styles.container}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />

      <Header
        style={styles.header}
        color={"black"}
        textColor="black"
        title={friend?.full_name}
        label={
          isLive
            ? "online"
            : lastActive
            ? `Last Active: ${moment(lastActive).fromNow()}`
            : "  "
        }
        back={true}
      />
      <GiftedChat
        showUserAvatar
        showAvatarForEveryMessage
        messages={messagesList}
        //  onSend={messages => onSend(messages)}
        renderBubble={renderBubble}
        renderComposer={renderComposer}
        renderAvatar={renderAvatar}
        renderTime={renderTime}
        messagesContainerStyle={{ paddingBottom: 20 }}
        renderMessageImage={renderImage}
        user={{
          _id: user?._id,
          name: user?.full_name,
          avatar: user?.cover_image,
        }}
        maxComposerHeight={62}
        minComposerHeight={62}
        bottomOffset={20}
      />
      <Modal
        animationInTiming={1000}
        animationOutTiming={1000}
        isVisible={!isConnected}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => {
              connectToWebSocket();
              fetchPreviousMessage();
            }}
          >
            <Text style={styles.buttonText}>
              {status == "fetching" || status == "init"
                ? "connecting ..."
                : "click here to reconnect"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ChatScreen);
