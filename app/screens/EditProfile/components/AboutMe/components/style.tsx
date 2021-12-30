import {StyleSheet} from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    container: {
      height: 200,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      paddingTop: 20,
    },
    mainImage: {
      height: 200,
      width: widthPercentageToDP(40),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    featureFirstImage: {
      height: 61,
      width: widthPercentageToDP(12),
    },
    featureSecondImage: {
      height: 75,
      width: widthPercentageToDP(18),
    },
    featureThird: {
      height: 75,
      width: widthPercentageToDP(18),
    },
    featureForthImage: {
      height: 75,
      width: widthPercentageToDP(18),
    },
    featureFifthImage: {
      height: 75,
      width: widthPercentageToDP(23),
    },
    profileImage: {
      height: 200,
      width: widthPercentageToDP(40),
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    firstImage: {
      left: 0,
      position: "absolute",
      bottom: 20,
    },
    secondImage: {
      left: widthPercentageToDP(7),
      position: "absolute",
      top: 40,
      zIndex: -6,
    },
    thirdImage: {
      left: widthPercentageToDP(16),
      position: "absolute",
      bottom: 40,
      zIndex: -5,
    },
    forthImage: {
      bottom: 25,
      zIndex: -5,
      right: -5,
      position: "absolute",
    },
    fifthImage: {
      top: 50,
      zIndex: -5,
      right: widthPercentageToDP(15),
      position: "absolute",
    },
  });
  
  export default styles