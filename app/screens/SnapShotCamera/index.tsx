/* Copyright (C) Cohart Inc — All Rights Reserved
 * Unauthorized copying of this file via any medium is strictly prohibited
 * Proprietary and confidential
 * Created by Cohart Inc <support@cohart.co> on 2021-11-01 13:36:13
 * Copyright terms written by Cohart Inc <support@cohart.co>, 2021-11-01 13:36:13
 */
import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { RNCamera } from "react-native-camera";
import { backgroundColor } from "../../config/colors";
import SnapShotHeader from "components/SnapShotHeader";
export default function Camera() {
  const cameraRef = useRef();
  return (
    <View style={{ flex: 1 }}>
      <SnapShotHeader />
      <RNCamera
        ref={cameraRef}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }}
      />
      <View
        style={styles.snapShotContainer}
      >
        <View
          style={styles.snapShotSubContainer}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="camera-reverse-outline"
              color={backgroundColor}
              size={40}
            />
          </View>
          <View style={{ width: "33%" }}>
            <TouchableOpacity
              style={styles.imageContainer}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ width: "33%", alignItems: "center", paddingLeft: 20 }}
          >
            <Image
              style={styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
        <View
          style={styles.snapShotTitleContainer}
        >
          <View style={{ flex: 1 }} />

          <Text
            style={styles.snapShotTextContainer}
          >
            Snapshot
          </Text>
          <Text
            style={styles.artworkTextContainer}
          >
            ArtWork
          </Text>
        </View>
      </View>
    </View>
  );
}
