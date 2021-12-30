import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import ArrowRight from "assets/Arrow_Right.png";
import styles from "./style";

interface IProps {
  handleShowSocial(): void;
  onNavigateToReferFriend: () => void;
}
const RegisterSuccess: React.FC<IProps> = ({ handleShowSocial, onNavigateToReferFriend }: IProps) => {
  return (
    <View style={styles.registerContainer}>
      <View
        style={styles.registerSubContainer}
      />
      <Text style={styles.registerSuccessHeading}>
        Congrats! You’ve been added to the list
      </Text>
      <Text style={[styles.descriptionText, styles.marginSubDescription]}>
        Please head to your email to opt-in. You can track your place on the
        website.
      </Text>
      <Text style={[styles.descriptionText, styles.subDescriptionText]}>
        Invite a friend to move one step closer in line :)
      </Text>
      <View style={[styles.buttonGroup, styles.registerSuccessButtonGroup]}>
        <TouchableOpacity
          onPress={handleShowSocial}
          style={[styles.buttonStyle]}
        >
          <Text style={[styles.buttonText, styles.buttonTextGray]}>
            Maybe Later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.primaryButton]}
          onPress={onNavigateToReferFriend}
        >
          <Text
            style={[
              styles.buttonText,
              styles.buttonTextBlack,
              styles.buttonTextWithIcon,
            ]}
          >
            Let&apos;s do it
          </Text>
          <Image source={ArrowRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterSuccess;
