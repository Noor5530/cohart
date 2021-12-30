import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { iconColor, placeHolderColor, backgroundColor, NeonBlue } from "config/colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { appFonts } from "components/text";
import { TabBarProps, TabProps } from "../types";
export default function TopBar(props: TabBarProps) {
  const {
    tabs = ["About", "Snapshots", "Portfolio"],
    index = 0,
    onChangeTab = () => {},
  } = props;
  const [selectedTabIndex, setsSleetedTabIndex] = useState(index);
  useEffect(() => {
    setsSleetedTabIndex(index);
  }, [index]);
  const onPressTab = (index: number) => {
    setsSleetedTabIndex(index);
    onChangeTab(index);
  };
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <Tab
          selectedTabIndex={selectedTabIndex}
          index={index}
          tab={tab}
          onPressTab={onPressTab}
          key={index}
        />
      ))}
    </View>
  );
}

export const Tab = ({ selectedTabIndex, index, onPressTab, tab }: TabProps) => {
  return (
    <TouchableOpacity
      testID={"onPressTab"}
      key={index}
      style={{
        justifyContent: "space-between",
        paddingLeft: index == 0 ? 0 : 20,
      }}
      onPress={() => {
        onPressTab(index);
      }}
    >
      <Text
        style={[
          styles.tab,
          {
            color: selectedTabIndex == index ? iconColor : placeHolderColor,
          },

        ]}
      >
        {tab}
      </Text>
      <View
        style={{
          height:
            selectedTabIndex == index ? 2 : 0,
          backgroundColor: NeonBlue
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: 35,
    flexDirection: "row",
    backgroundColor: backgroundColor,
    paddingLeft: 20,
    borderBottomWidth: widthPercentageToDP(0.3),
    borderBottomColor: NeonBlue,
    marginBottom: 5
  },
  tab: {
    fontSize: widthPercentageToDP(5),
    fontWeight: "500",
    fontFamily: appFonts.InterRegular,


  },
});
