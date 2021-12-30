import { useNavigation } from '@react-navigation/native';
import { appFonts } from "components/text";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { RightArrow } from "./SvgIcons";
import { isIphone } from "../lib/isIphone";
import CustomMaterialMenu from "./CustomMaterialMenu";
import { Dots } from "./SvgIcons";

interface Props {
  style?: ViewStyle;
  onPressDots?: () => void;
  onSelectOption1?: () => void;
  onSelectOption2?: () => void;
  headerTitle: string;
  Option1?: string;
  Option2?: string;
  onAcceptTitle?: string;
  onRejectTitle?: string;
  currentUser?: String;
  isLoggedIn: Boolean;
}
export default function Header(props: Props) {
  const navigation = useNavigation();
  const { style, onPressDots, isLoggedIn } = props;

  const onActionDots = () => {
    if (!isLoggedIn) {
      navigation.navigate("Register");
      return;
    }
  }
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          
          navigation.goBack();
        }}
      >
        <RightArrow />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {isLoggedIn ? 
      <TouchableOpacity onPress={onPressDots}>
         <CustomMaterialMenu
          Option1={props.Option1}
          Option2={props.Option2}
          onSelectOption1={props.onSelectOption1}
          onSelectOption2={props.onSelectOption2}
        />
      </TouchableOpacity>
         : 
        <TouchableOpacity onPress={onActionDots}>
          <Dots />
        </TouchableOpacity>
        }
      
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: 100,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: appFonts.InterRegular,
    fontSize: 16,
    paddingLeft: 9,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: isIphone() + 30,
    paddingHorizontal: 23,
  },
});