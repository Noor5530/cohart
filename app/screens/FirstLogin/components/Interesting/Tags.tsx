import React, { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import {  useSelector } from "react-redux";

import { placeHolderColor } from "config/colors";
import AppState from "../../../../models/reducers";

import styles from "./style";

interface ITagsProps {
  setSelectedTopic: (topic: any) => void;
  item: any;
  selectedTopic: any;
  index: number;
}

const Tags = (props: ITagsProps) => {
  const { item, selectedTopic, index } = props;
  // const color = useSharedValue(colors[0]);
  const animation = useRef(new Animated.Value(0));

  const interests = useSelector((state: AppState) => state.user.interests);

  const handleAnimation = () => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation.current, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };
  const fadeText = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [placeHolderColor, "#000000"],
  });
  useEffect(() => {
    interests.map((tag) => {
      if (tag == item.name) {
        handleAnimation();
      }
    });
  }, []);
  const toggleSelection = () => {
    let index = -1;
    index = selectedTopic.findIndex((tag: string) => {
      return tag == item.name;
    });
    if (index !== -1) {
      const data = selectedTopic.filter((tag: string) => {
        return tag !== item.name;
      });

      props.setSelectedTopic(data);
      fadeOut();
    } else {
      const temp = [...props.selectedTopic, item.name];
      props.setSelectedTopic(temp);
      handleAnimation();
    }
  };
  return (
    <Pressable style={styles.row} onPress={toggleSelection}>
      <Animated.Text
        style={[styles.animatedText, { color: fadeText }]}
        key={`id_${index}`}
      >
        {item.name}
      </Animated.Text>
      {item.tag && (
        <Animated.Image
          resizeMode="contain"
          style={[styles.animatedImage, { opacity: animation.current }]}
          source={item.tag}
        />
      )}
    </Pressable>
  );
};

export default Tags;
