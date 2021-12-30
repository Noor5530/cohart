import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import FansHeader from "components/BackHeadingHeader";
import { iconColor, placeHolderColor } from "config/colors";
import dummyAvator from "assets/dummyAvator.png";
import PrimaryButton from "components/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import {
  useRoute,
  useIsFocused
} from "@react-navigation/native";
import AppState from "models/reducers/index";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";
import { MyConnectedRequestRouteProps } from "navigation/types";
import { sendConnectionRequest } from "services/sendConnectionRequest";
import { enableSnackBar } from "store/actions/snackBarAction";

const ConnectedRequest = () => {
  const route = useRoute<MyConnectedRequestRouteProps>();
  const user = route?.params?.user;
  const alreadyRequestSend = route?.params?.alreadyRequestSend;
  const [requestSent, toggleRequestSent] = useState(false);
  // const navigation = useNavigation();
  const [chatLoading, setChatLoading] = useState(false);
  const dispatch = useDispatch();
  const myProfile = useSelector((state: AppState) => state.user);
  const isFocused = useIsFocused();

  const onPressConnectedRequest = useCallback(async () => {
    try {
      setChatLoading(true);
      let data = await sendConnectionRequest({
        recipient_id: user?._id,
        sender_id: myProfile?._id,
        make_connection: false
      });
      console.log("onPressConnectedRequest", data.data);

        toggleRequestSent(true)

      setChatLoading(false);

    } catch (error: any) {
      console.log("errorrrr", error);

      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
      dispatch(enableSnackBar());
      setChatLoading(false);
    }
  }, [user?._id, myProfile?._id, setChatLoading, user]
  );
  useEffect(() => {
    return () => {
      setChatLoading(false);
      toggleRequestSent(false);
    };
  }, [myProfile, user?._id, isFocused]);

  return (

    <View style={styles.container}>
      <FansHeader headerTitle="Request to Connect" style={styles.fansHeader} />
      <View style={styles.column}>
          <Image progressiveRenderingEnabled={true}
            source={user?.cover_image ? { uri: user?.cover_image } : dummyAvator}
            resizeMode="cover" style={styles.avatar} />
        <Text style={styles.title}>{user?.full_name}</Text>
          <View style={styles.paragraph}>
            {alreadyRequestSend ?
              <>

                <Text style={styles.subTitle}>Request already sent!</Text>
                <Text style={styles.subTitle}>Once {user?.first_name} approves your  {'\n'}connection, you’ll be able to  {'\n'}send messages</Text>
              </> :

              requestSent ?
              <>
                <Text style={styles.subTitle}>Request sent!</Text>
                <Text style={styles.subTitle}>Once {user?.first_name} approves your  {'\n'}connection, you’ll be able to  {'\n'}send messages</Text>
                </> :
                <><Text style={styles.subTitle}>You need to be connected {'\n'} with {user?.first_name} to send  {'\n'}messages. </Text>
                  <Text style={styles.subTitle}>Would you like to send a {'\n'}connection request?</Text></>
            }
        </View>
      </View>
      <PrimaryButton
                buttonTitle={alreadyRequestSend ? "REQUEST ALREADY SENT!" : requestSent ? "REQUEST SENT!" : "REQUEST TO CONNECT"}
        style={{ alignSelf: "center", flexDirection: 'row-reverse', width: '70%', height: 50, backgroundColor: alreadyRequestSend || requestSent ? placeHolderColor : iconColor, marginBottom: 30 }}
                loading={chatLoading}
                loadingStyle={{ paddingRight: 10 }}
                disabled={alreadyRequestSend || requestSent ? true : false}
                stylesName={styles.buttonText}
                onPress={() =>
                  onPressConnectedRequest()
                }
      />

    </View>
  );
};

export default React.memo(ConnectedRequest);
