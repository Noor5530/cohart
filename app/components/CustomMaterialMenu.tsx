import { iconColor } from 'config/colors';
import React from 'react';
//import react in our code.
import { Text, StyleSheet } from "react-native";
//import all the components we are going to use.
//import menu and menu item
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
// import { Feather } from '@expo/vector-icons';
import { Dots } from "./SvgIcons";

interface Props {
  Option1?: string;
  Option2?: string;
  onSelectOption1?: () => void;
  onSelectOption2?: () => void;
}
const CustomMaterialMenu = (props: Props) => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <Dots />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={props.onSelectOption1}>
            <Text style={styles.text}>{props.Option1}</Text>
          </MenuOption>
          <MenuOption onSelect={props.onSelectOption2}>
            <Text style={styles.text}>{props.Option2}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </>
  );
};

export default CustomMaterialMenu;

const styles = StyleSheet.create({
  text: { color: iconColor, padding: "5%" },
});