import { iconColor, placeHolderColor, textColor } from "config/colors";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "react-native-responsive-screen";
import PrimaryButton from "./PrimaryButton";


interface Props {
  title?: string;
  message?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onAcceptTitle?: string | undefined;
  onRejectTitle?: string | undefined;
  onAcceptColor?: string;
  onRejectColor?: string;
  visible: boolean;
  testID: string;
}
const Alert = (props: Props) => {
  // const Button = ({ title, onPress, color = 'textColor' }) => (
  //   <TouchableOpacity
  //     style={{ ...styles.button, backgroundColor: color }}
  //     onPress={onPress}
  //   >
  //     <Text>{title}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <Modal
      animationIn="bounceInUp"
      animationInTiming={0}
      backdropColor="none"
      isVisible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.message}>{props.message}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonTitle={props.onAcceptTitle}
            onPress={props.onAccept}
            color={props.onAcceptColor}
            stylesName={{
              fontSize: widthPercentageToDP("5%"),
              color: "red",
            }}
          />
          <PrimaryButton
            buttonTitle={props.onRejectTitle}
            onPress={props.onReject}
            color={props.onRejectColor}
            stylesName={{
              fontSize: widthPercentageToDP("5%"),
              color: iconColor,
            }}

          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: textColor,
    width: widthPercentageToDP(75),
    alignSelf: "center",
    zIndex: 2000,
    marginTop: 200,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: "50%",
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
    color: iconColor,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    fontSize: 12,
    padding: 15,
    color: iconColor,
    // paddingHorizontal: 5,
  },
  buttonContainer: {
    // marginTop: "5%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: placeHolderColor,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 60,
  },
  textContainer: {
    alignItems: "center",
  },
});

export default Alert;
