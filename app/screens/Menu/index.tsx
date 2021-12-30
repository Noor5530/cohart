import { useNavigation } from "@react-navigation/native";
import analytics from "@segment/analytics-react-native";
import StatusBar from "components/CustomStatusBar";
import HeaderHeading from "components/HeaderHeading";
import {
  AboutIcon,
  ReferFriendIcon,
  ReportIcon,
  SaveStarIcon,
  TermCondition, StartHeadingIcon
} from "components/Icons";
import { appFonts } from "components/text";
import { Container } from "components/workAround";
import { iconColor, textColor } from "config/colors";
import AppState from "models/reducers";
import React, { ReactNode } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { logOutRequest } from "store/actions/userActions";

import styles from "./style";
import MainHeader from "components/MainHeader";

export default function Menu() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: AppState) => state.user.is_admin);
  return (
    <Container>
      <View key="menu" style={styles.container}>
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <MainHeader
          style={{ borderBottomWidth: 1, borderColor: iconColor }}
          heading="Menu"
          back
        />
        <HeaderHeading title={"Menu"} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {isAdmin && (
            <Tag
              name={"Selected\nSnapshots"}
              onPress={() => {
                navigation.navigate("FeatureSnapshot");
              }}
              renderIcon={
                <View style={styles.featureShotHeading}>
                  <StartHeadingIcon
                    color="rgba(0,0,0,0.5)"
                    width={wp("12")}
                    height={wp("12")}
                  />
                </View>
              }
            />
          )}
          {isAdmin && (
            <Tag
              name="Refer a Friend"
              onPress={() => {
                navigation.navigate("ReferFriend");
              }}
              renderIcon={
                <View style={{ marginLeft: -10, paddingTop: 2 }}>
                  <ReferFriendIcon
                    color="rgba(0,0,0,0.5)"
                    width={wp("10")}
                    height={wp("10")}
                  />
                </View>
              }
            />
          )}
          {/* <Tag
            name="Notifications"
            onPress={() => {
              navigation.navigate("Notification");
            }}
            renderIcon={
              <View style={{ marginLeft: -6, paddingTop: 2 }}>
                <NotificationIcon
                  color="rgba(0,0,0,0.5)"
                  width={wp("10")}
                  height={wp("10")}
                />
              </View>
            }
          /> */}
          <Tag
            name={"Saved\nArtworks"}
            onPress={() => {
              navigation.navigate("SavedArtWorks");
            }}
            renderIcon={
              <View style={{ marginLeft: -6, paddingTop: 6 }}>
                <SaveStarIcon
                  color="rgba(0,0,0,0.5)"
                  width={wp("13")}
                  height={wp("13")}
                />
              </View>
            }
          />
          <Tag
            name="About"
            onPress={() => {
              navigation.navigate("About");
            }}
            renderIcon={
              <View>
                <AboutIcon
                  color="rgba(0,0,0,0.5)"
                  width={wp("10")}
                  height={wp("10")}
                />
              </View>
            }
          />
          <Tag
            name={"Report Content\n& Feedback"}
            onPress={() => {
              navigation.navigate("ContactAndFeedBack");
            }}
            renderIcon={
              <View style={{ marginLeft: -70, paddingTop: 2 }}>
                <ReportIcon
                  color="rgba(0,0,0,0.5)"
                  width={wp("30")}
                  height={wp("16")}
                />
              </View>
            }
          />
          <Tag
            name={"Terms &\nConditions"}
            onPress={() => {
              navigation.navigate("TermsAndCondition");
            }}
            renderIcon={
              <View style={{ marginLeft: -15, paddingTop: 10 }}>
                <TermCondition
                  color="rgba(0,0,0,0.5)"
                  width={wp("10")}
                  height={wp("10")}
                />
              </View>
            }
          />
          <Tag
            name={"Change\nPhone Number"}
            onPress={() => {
              navigation.navigate("ChangeNumber");
            }}
          />
          {isAdmin && (
            <Tag
              name="Login As"
              onPress={() => {
                navigation.navigate("LoginAs");
              }}
            />
          )}
          <Tag
            name="Log out"
            onPress={() => {
              Alert.alert("Log out", "Are you sure ?", [
                {
                  text: "Cancel",
                  onPress: () => {
                    analytics.track("Aborted_logout", {});
                    console.log("Cancel Pressed");
                  },
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    analytics.track("Successful_logout", {});
                    dispatch(logOutRequest());
                  },
                },
              ]);
            }}
          />
        </ScrollView>
      </View>
    </Container>
  );
}

interface ITagProps {
  name: string;
  onPress: () => void;
  icon: ImageSourcePropType;
  renderIcon?: ReactNode;
  iconStyle: ImageStyle;
}

const Tag = (props: ITagProps) => {
  const { name, onPress, icon } = props;
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", flexWrap: "wrap" }}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontFamily: appFonts.InterLight,
            fontSize: wp("8"),
            fontWeight: "400",
            color: iconColor,
            paddingBottom: 20,
            right: -wp("4"),
          },
        ]}
      >
        {name}
      </Text>

      {props.renderIcon
        ? props.renderIcon
        : icon && (
            <Image
              resizeMode={"contain"}
              style={[
                {
                  backgroundColor: "black",
                  width: wp("8"),
                  height: wp("8"),
                  ...props.iconStyle,
                },
              ]}
              source={icon}
            />
          )}
    </TouchableOpacity>
  );
};
