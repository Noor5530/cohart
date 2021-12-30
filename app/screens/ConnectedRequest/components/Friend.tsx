import Avatar from 'assets/dummyAvator.png';
import { appFonts } from "components/text";
import { iconColor, shimmerColor } from "config/colors";
import React from "react";
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";

interface Props {
  style?: ViewStyle;
  name?: string;
  avatar?: string;
  avatarStyle?: ViewStyle;
  headingStyle?: TextStyle;

  item?: object;
  onPress?: () => void;
  avatarImageStyle?: ImageStyle;
}
export default function Friend(props: Props) {
  const { item } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("MyProfile", {
      currentUser: false,
      user: item,
      userType: "",
      back: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.avatarContainer}>
        <Image
          style={[styles.avatar]}
          source={item?.cover_image ? { uri: item?.cover_image } : Avatar}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.title}>
        {item?.full_name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    width: wp("25"),
    alignItems: "center",
    justifyContent: "center",
    //  paddingHorizontal: 5,
  },

  avatar: {
    height: wp("16%"),
    width: wp("16%"),
    borderWidth: 0,
    borderRadius: wp("8%"),
    // paddingHorizontal: wp("%"),

    backgroundColor: shimmerColor,
  },
  title: {
    fontFamily: appFonts.InterRegular,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13.0379,
    textAlign: "center",
    color: iconColor,
    marginVertical: "-3%",
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: wp("25%"),
    width: wp("25%"),
    borderWidth: 0,
    borderRadius: wp("9%"),
  },
});
