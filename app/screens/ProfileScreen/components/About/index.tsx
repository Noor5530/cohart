import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProfileImages from "../ProfileImages";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { iconColor } from "config/colors";
// import Tags from "./Tags";
import moment from "moment";
import { appFonts } from "../../../../components/text";
import { AboutProps } from "screens/ProfileScreen/types";
import dummyAvator from "assets/dummyAvator.png";
import Image from "react-native-fast-image";
import { UserTags } from "./Afflictions";
import Tags from "./Tags";
export default function About(props: AboutProps) {
  const {
    bio = "",
    full_name = "",
    currently = "",
    currentUser = false,
    user_profile_images = {},
    referral_by = null,
    selected_tags = [],
    invited_by_toggle = false,
    affiliations_array = [],
    seen_me_at = [],
    is_update = true,
  } = props;
  const {
    image1_original = null,
    image2_original = null,
    image3_original = null,
    image4_original = null,
    image5_original = null,
    image6_original = null,
  } = user_profile_images;
  const renderItem = (item, index) => {
    return <Tags tag={item.title} key={index} />;
  };

  return (
    <View>
      <ProfileImages
        image1={image1_original}
        image2={image2_original}
        image3={image3_original}
        image4={image4_original}
        image5={image5_original}
        image6={image6_original}
      />
      <View style={styles.padding}>
        {full_name != "" && <Text style={styles.header}>{full_name}</Text>}
        {currentUser && !is_update && (
          <>
            <Text style={styles.description}>
              Your profile is a little empty!
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>SETUP PROFILE</Text>
            </TouchableOpacity>
          </>
        )}
        {bio != "" && <Text style={[styles.description]}>{bio}</Text>}
      </View>

      {selected_tags && selected_tags?.length != 0 ? (
        <View style={styles.contentContainer}>
          {selected_tags.map((item, index) => renderItem(item, index))}
        </View>
      ) : null}
      <View style={styles.padding}>
        {invited_by_toggle && referral_by && referral_by._id != null && (
          <>
            <Text style={styles.heading}>Invited by</Text>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  referral_by?.cover_image
                    ? { uri: referral_by?.cover_image }
                    : dummyAvator
                }
                style={styles.image}
              />
              <View style={styles.paddingLeft}>
                <Text style={styles.heading}>
                  {referral_by?.full_name ? referral_by?.full_name : ""}
                </Text>
                {props?.created_at && (
                  <Text style={styles.date}>
                    {moment(props?.created_at * 1000).format("DD MMMM yyyy")}
                  </Text>
                )}
              </View>
            </View>
          </>
        )}
        <Text style={styles.heading}>More about {full_name}</Text>
      </View>
      {affiliations_array && affiliations_array?.length != 0 ? (
        <>
          <Text style={styles.innerHeading}>Affiliations :</Text>
          <UserTags
            data={affiliations_array
            }
          />
        </>
      ) : null}
      {seen_me_at && seen_me_at?.length ? (
        <>
          <Text style={styles.innerHeading}>You might have seen me at :</Text>
          <UserTags
            data={seen_me_at}
          />
        </>
      ) : null}
      {currently && currently?.length ? (
        <>
          <Text style={styles.innerHeading}>Currently :</Text>
          <Text style={styles.currentlyDescription}>{currently}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: widthPercentageToDP(10),
    fontWeight: "600",
    color: iconColor,
    textAlign: "center",
    paddingTop: 20,
  },
  description: {
    fontSize: widthPercentageToDP(3.1),
    fontWeight: "300",
    color: iconColor,
    textAlign: "center",
    paddingTop: 5,
  },
  editButton: {
    width: widthPercentageToDP(30),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
  },
  editButtonText: {
    fontSize: widthPercentageToDP(3.1),
    fontWeight: "600",
    color: iconColor,
    textAlign: "center",
    paddingVertical: 5,
  },
  padding: { paddingHorizontal: 20 },
  heading: {
    paddingTop: 20,
    fontSize: widthPercentageToDP(4),
    fontWeight: "500",
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
  avatarContainer: {
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center",
  },
  innerHeading: {
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: widthPercentageToDP(3),
    fontWeight: "600",
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
  currentlyDescription: {
    color: iconColor,
    paddingHorizontal: 20,
    fontFamily: appFonts.InterRegular,
    fontSize: widthPercentageToDP(3.5),
    fontWeight: "400",
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  contentContainer: {
    paddingLeft: 10,
    paddingTop: 20,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  image: {
    width: widthPercentageToDP(15),
    height: widthPercentageToDP(15),
    borderRadius: widthPercentageToDP(7),
    borderWidth: 1,
  },
  date: {
    paddingTop: 2,
    fontSize: widthPercentageToDP(3),
    fontWeight: "400",
    fontFamily: appFonts.InterRegular,
    color: iconColor,
  },
});
