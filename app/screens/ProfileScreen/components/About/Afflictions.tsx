import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { appFonts } from "../../../../components/text";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { iconColor } from "../../../../config/colors";
import { TagProps } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
export const UserTags: FC<TagProps> = (props: TagProps) => {
  const { data = [] } = props;
  const [showMoreButton, toggleShowMoreButton] = useState(false);
  useEffect(() => {
    toggleShowMoreButton(false);
  }, [data.length]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.line} />
        <View {...props} style={styles.innerContainer}>
          {!showMoreButton
            ? data.slice(0, 7).map((place, index) => {
                return (
                  <View key={index} style={styles.container}>
                    <View style={styles.tagContainer} />
                    <Text style={styles.tag}>{place.trim()}</Text>
                  </View>
                );
              })
            : data.map((place, index) => {
                return (
                  <View key={index} style={styles.container}>
                    <View style={styles.tagContainer} />
                    <Text style={styles.tag}>{place.trim()}</Text>
                  </View>
                );
              })}
        </View>
      </View>
      {data?.length > 7 && (
        <TouchableOpacity
          onPress={() => {
            toggleShowMoreButton((prv) => !prv);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {!showMoreButton ? "SHOW MORE" : "HIDE MORE"}
          </Text>
          <AntDesign
            name={showMoreButton ? "up" : "down"}
            size={12}
            color={"#0000FF"}
          ></AntDesign>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  line: {
    top: 0,
    width: 20,
    left: 0,
    backgroundColor: "white",
    zIndex: 5,
  },
  innerContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: -15,
    backgroundColor: "white",
    paddingRight: 15,
  },
  tagContainer: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: iconColor,
    alignSelf: "center",
  },
  tag: {
    color: iconColor,
    paddingHorizontal: 10,
    paddingTop: 3,
    fontFamily: appFonts.InterRegular,
    fontSize: widthPercentageToDP(3.5),
    fontWeight: "400",
  },
  button: {
    paddingLeft: 20,
    paddingTop: 10,
    flexDirection: "row",
  },
  buttonText: { color: "#0000FF", fontSize: 10 },
});
