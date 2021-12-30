import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import Instagram from "assets/instagram.png";
import Twitter from "assets/twitter.png";
import Facebook from "assets/facebook.png";
import Cohart from "assets/cohart-social.png";
import Discord from "assets/discord.png";
import ArrowDown from "assets/Arrow_Down.png";

import styles from "./style";

const SocialList: React.FC = () => {
  const handleOpenInstagram = () => {
    Linking.canOpenURL("instagram://user?username=cohart_beta").then(
      (supported) => {
        if (supported) {
          Linking.openURL("instagram://user?username=cohart_beta");
        } else {
          Linking.openURL("https://www.instagram.com/cohart_beta/");
        }
      }
    );
  };

  const handleOpenTwitter = () => {
    Linking.openURL("https://twitter.com/cohart_co");
  };

  const handleOpenFacebook = () => {
    Linking.openURL("https://www.facebook.com/HelloCohart");
  };

  const handleOpenCohartWeb = () => {
    Linking.openURL("https://www.cohart.co");
  };

  const handleOpenDiscord = () => {
    Linking.openURL("https://discord.gg/9kpBJvkv");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: 45,
          height: 7,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          borderRadius: 12,
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={handleOpenInstagram} style={styles.rowItem}>
          <Image source={Instagram} />
          <Text style={styles.socialText}>@cohart_beta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenTwitter} style={styles.rowItem}>
          <Image source={Twitter} />
          <Text style={styles.socialText}>@cohart_co</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenFacebook} style={styles.rowItem}>
          <Image source={Facebook} />
          <Text style={styles.socialText}>/HelloCohart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenCohartWeb} style={styles.rowItem}>
          <Image source={Cohart} />
          <Text style={styles.socialText}>Cohart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenDiscord} style={styles.rowItem}>
          <Image source={Discord} />
          <Text style={styles.socialText}>Cohart</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.socialSwipeText}>swipe down to keep discovering</Text>
      <View style={styles.arrowWrapper}>
        <Image source={ArrowDown} />
      </View>
    </View>
  );
};

export default SocialList;
