import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import moment from "moment";

import { Input } from "utils/uiPrimitives";
import AppState from "models/reducers";
import RemoveIcon from "assets/ic_remove_text_2.png";
import WarningIcon from "assets/ic_warning_blue.png";
import HideIcon from "assets/ic_hide.png";
import ShowIcon from "assets/ic_show.png";
import SampleAvatar from "assets/sample-avatar.jpeg";
import userProfileMore from "services/userProfileMore";
import styles from "./style";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

interface IProps {
  closeCollapsibleSection(): void;
  setSubmitForm(): void;
}

const getArrayDataFromString = (data: any) => {
  if (typeof data == "string") {
    return data.split(",").map((item) => item.trim());
  }
  return data;
};

const More: React.FC<IProps> = ({
  closeCollapsibleSection,
  setSubmitForm,
}: IProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const [submitting, setSubmitting] = useState(false);

  const affiliations = getArrayDataFromString(user.affiliations);
  const seenMeAt = getArrayDataFromString(user.seen_me_at);

  const [affiliation, setAffiliation] = useState(
    affiliations ? [...affiliations, ""] : [""]
  );

  const [meetMeData, setMeetMeData] = useState(
    seenMeAt ? [...seenMeAt, ""] : [""]
  );

  const [currently, setCurrently] = useState(
    user.currently ? user.currently : ""
  );

  const [isShow, setIsShow] = useState(user?.invited_by_toggle || false);

  useEffect(() => {
    setAffiliation(affiliations ? [...affiliations, ""] : [""]);
    setMeetMeData(seenMeAt ? [...seenMeAt, ""] : [""]);
    setCurrently(user.currently ? user.currently : "");
    setIsShow(user?.invited_by_toggle || false);

    return () => {
      setAffiliation([""]);
      setMeetMeData([""]);
      setCurrently("");
      setIsShow(user?.invited_by_toggle || false);
    };
  }, [user]);

  const toggleShowInvite = () => setIsShow(!isShow);

  const removeAffiliation = (position: number) => () =>
    setAffiliation((prev) => prev.filter((_, index) => index !== position));

  const removeMeetMe = (position: number) => () =>
    setMeetMeData((prev) => prev.filter((_, index) => index !== position));

  const onSubmit = async () => {
    setSubmitting(true);

    const filterAffiliations = affiliation.filter((item) => {
      return item !== "" && item.trim() != "";
    });

    const filterSeenMe = meetMeData.filter((item) => {
      return item !== "" && item.trim() != "";
    });

    const payload = {
      id: user._id,
      affiliations: filterAffiliations,
      seen_me_at: filterSeenMe,
      currently,
      invited_by_toggle: isShow,
    };

    setAffiliation([...filterAffiliations, ""]);
    setMeetMeData([...filterSeenMe, ""]);

    try {
      await userProfileMore(payload);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
    }

    setSubmitForm((prev) =>
      prev.map((_, index) => (index === 3 ? true : false))
    );
    closeCollapsibleSection();
    setSubmitting(false);
  };

  console.log("[More] affiliations ==> " + JSON.stringify(affiliation));
  console.log("[More] seenMeAt ==> " + JSON.stringify(seenMeAt));

  return (
    <View style={styles.container}>
      <View style={styles.affiliation}>
        <Text style={styles.label}>Affiliation:</Text>
        {affiliation.map((place, index) => {
          return (
            <View key={index} style={styles.inputWithIcon}>
              <Input
                maxLength={25}
                style={styles.inputStyle}
                value={place}
                accessibilityLabel="Add another affiliation"
                placeholderTextColor="#7e8d98"
                placeholder={"Add another affiliation"}
                onChangeText={(text) => {
                  if (text.trim().length == 0 && text == " ") {
                    return;
                  }
                  const temp = [...affiliation];
                  temp[index] = text.substring(0, 25);
                  if (index == affiliation?.length - 1) {
                    setAffiliation([...temp, ""]);
                  } else {
                    setAffiliation(temp);
                  }
                }}
              />
              {index !== affiliation.length - 1 && (
                <TouchableOpacity
                  testID={`removeAffiliation-${index}`}
                  style={styles.removeBtn}
                  onPress={removeAffiliation(index)}
                >
                  <Image source={RemoveIcon} style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.meetMe}>
        <Text style={styles.label}>You Might Have Seen Me At:</Text>
        {meetMeData.map((place, index) => {
          return (
            <View key={index} style={styles.inputWithIcon}>
              <Input
                maxLength={25}
                accessibilityLabel="Add more entry"
                style={styles.inputStyle}
                value={place}
                placeholder={"Add more entry"}
                placeholderTextColor="#7e8d98"
                onChangeText={(text) => {
                  if (text.trim().length == 0 && text == " ") {
                    return;
                  }
                  const temp = [...meetMeData];
                  temp[index] = text.substring(0, 25);
                  if (index == meetMeData?.length - 1) {
                    if (meetMeData?.length === 8) {
                      setMeetMeData(temp);
                      return;
                    }
                    setMeetMeData([...temp, ""]);
                  } else {
                    setMeetMeData(temp);
                  }
                }}
              />
              {index !== meetMeData.length - 1 && (
                <TouchableOpacity
                  testID={`removeEntry-${index}`}
                  onPress={removeMeetMe(index)}
                  style={styles.removeBtn}
                >
                  <Image source={RemoveIcon} style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        {meetMeData.length === 8 && (
          <View style={styles.meetMeWarning}>
            <Image source={WarningIcon} />
            <Text style={styles.warningText}>
              You have reached the maximum number of entries
            </Text>
          </View>
        )}
      </View>

      <View style={styles.currently}>
        <Text style={styles.label}>Currently</Text>
        <View style={styles.inputWithIcon}>
          <Input
            maxLength={25}
            testID="currentlyInput"
            style={styles.inputStyle}
            value={currently}
            placeholder={"Share what you’re up to"}
            onChangeText={(text) => {
              if (text.trim().length == 0 && text == " ") {
                return;
              }
              setCurrently(text);
            }}
          />
          {currently.length !== 0 && (
            <TouchableOpacity
              onPress={() => setCurrently("")}
              style={styles.removeBtn}
            >
              <Image source={RemoveIcon} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>INVITED BY</Text>
        <TouchableOpacity
          style={styles.buttonToggle}
          onPress={toggleShowInvite}
        >
          <Image
            style={styles.toggleStyle}
            source={isShow ? ShowIcon : HideIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.inviteRow} opacity={isShow ? 1 : 0.3}>
          <Image
            source={
              user.referral_by?.cover_image
                ? { uri: user.referral_by?.cover_image }
                : SampleAvatar
            }
            style={styles.avatarItem}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user?.referral_by?.full_name}</Text>
            <Text style={styles.date}>
              {moment(user.referral_by?.last_active).format("DD MMMM YYYY")}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        testID="buttonSubmit"
        style={styles.button}
        onPress={onSubmit}
      >
        {submitting ? (
          <ActivityIndicator color="black" size="small" />
        ) : (
          <Text style={styles.buttonText}>{"I'M DONE"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default More;
