import Header from "components/Header";
import { appFonts } from "components/text";
import { List, TouchAble } from "components/workAround";
import { iconColor, shimmerColor } from "config/colors";
import { useKeyboard } from "hooks/useKeyBoard";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Image from "react-native-fast-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BottomSheet from "reanimated-bottom-sheet";

import TagEditor from "./TagEditor";

const data = [
  "Painting",
  "Drawing",
  "Illustration",
  "Graphic Design",
  "Digital Art",
  "Photography",
  "Sculpture",
  "Installation",
  "New Media",
  "Fashion",
  "Publication",
  "Interior",
  "3D Design",
  "Experimental",
];

interface Props {
  actionSheetRef: any;
  demission: string;
  setDemission: (data: string) => void;
  medium: string;
  setMedium: (data: string) => void;
  price: string;
  setPrice: (data: string) => void;
  description: string;
  setDescription: (data: string) => void;
  tags: string[];
  setAddTags: (data: string[]) => void;
  setForSale: (data: string) => void;
  forSale: string;
  username: string;
  toggleTagModel: (value: boolean) => void;
  isPreView: boolean;
  avatar: { uri: string };
  name: string;
  sheetRef: {
    current: {
      snapTo: (index: number) => void;
    };
  };
}
export default function Footer(props: Props) {
  const { actionSheetRef } = props;
  const keyBoard = useKeyboard();

  const {
    tags,
    setDescription,
    description,
    setPrice,
    price,
    setMedium,
    medium,
    setDemission,
    demission,
    name = "",
    username,
    isPreView = false,
    avatar,
  } = props;

  useEffect(() => {
    if (showTagView) {
      setShowTagView(false);
    }
  }, []);

  const [showTagView, setShowTagView] = useState(false);
  const renderContent = () => {
    if (showTagView) {
      return (
        <View style={[styles.container]}>
          <Header
            style={{
              borderBottomWidth: 2,
              borderBottomColor: iconColor,
            }}
          />
          <View style={styles.line} />

          <TagEditor
            title={"Minimum 1 Tag required"}
            required={1}
            onFocus={() => {
              if (Platform.OS == "android") {
                props.sheetRef?.current?.snapTo(1);
              }
            }}
            tagsList={data}
            label={"Add\nArtwork Tags"}
            toggleTagView={() => {
              setShowTagView(false);
            }}
            interests={tags}
            onChangeInterests={(selectedInterests) => {
              props.setAddTags(selectedInterests);
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header
            style={{
              borderBottomWidth: 2,
              borderBottomColor: iconColor,
            }}
          />
          <View style={styles.line} />
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <View style={{ height: "100%" }}>
                <View style={styles.image}>
                  <Image source={avatar} style={styles.image} />
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.username}>
                  {username ? "@" + username : ""}
                </Text>
              </View>
              <View>
                {!isPreView && (
                  <>
                    <Text
                      style={[
                        styles.heading,
                        {
                          color: price?.length > 0 ? "black" : "#E5E5E5",
                          paddingLeft: 6,
                        },
                      ]}
                    >
                      For sale
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      {price !== "" && <Text style={styles.price}>$</Text>}
                      <TextInput
                        maxLength={10}
                        editable={!isPreView}
                        keyboardType="decimal-pad"
                        value={price}
                        onChangeText={(text) => {
                          setPrice(text);
                        }}
                        placeholder={isPreView ? "" : "$xxx"}
                        style={styles.price}
                      />
                    </View>
                  </>
                )}
                {isPreView && price !== "" && (
                  <>
                    <Text style={styles.heading}>For sale?</Text>
                    <TextInput
                      editable={!isPreView}
                      keyboardType="decimal-pad"
                      value={price}
                      onChangeText={(text) => {
                        setPrice(text);
                      }}
                      placeholder={isPreView ? "" : "$xxx"}
                      style={styles.price}
                    />
                  </>
                )}
              </View>
            </View>
            <View style={styles.middleContainer}>
              <View style={{ width: "50%" }}>
                {demission !== "" && (
                  <Text style={styles.textInput}>Dimension:</Text>
                )}
                <TextInput
                  editable={!isPreView}
                  value={demission}
                  onChangeText={(text) => {
                    setDemission(text);
                  }}
                  style={styles.textInput}
                  placeholder={isPreView ? "" : "Dimension:"}
                />
              </View>
              <View style={{ width: "50%" }}>
                {medium !== "" && <Text style={styles.textInput}>Medium:</Text>}
                {isPreView ? (
                  <Text style={[styles.textInput]}>{medium}</Text>
                ) : (
                  <TextInput
                    maxLength={25}
                    editable={!isPreView}
                    placeholder={isPreView ? "" : "Medium:"}
                    value={medium}
                    onChangeText={(text) => {
                      setMedium(text.substring(0, 25));
                    }}
                    style={[styles.textInput]}
                  />
                )}
              </View>
            </View>
            {!isPreView && (
              <TextInput
                editable={!isPreView}
                placeholder={isPreView ? "" : "Enter artwork description.."}
                multiline={true}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                style={styles.description}
              />
            )}
            {isPreView && description !== "" && (
              <TextInput
                editable={!isPreView}
                placeholder={isPreView ? "" : "Enter artwork description.."}
                multiline={true}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                style={{
                  paddingTop: 20,
                  width: "100%",
                  maxHeight: hp(50),
                  color: iconColor,
                  fontSize: 16,
                  paddingBottom: 20,
                }}
              />
            )}
            <View style={styles.tagListView}>
              <List
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => {
                  if (!isPreView) {
                    return (
                      <TouchAble
                        onPress={() => {
                          setShowTagView(true);
                        }}
                      >
                        <View
                          style={[
                            styles.tag,
                            {
                              borderColor: "#CCCCCC",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.tagText,
                              {
                                color: "#CCCCCC",
                              },
                            ]}
                          >
                            + ENTER ARTWORK TAG
                          </Text>
                        </View>
                      </TouchAble>
                    );
                  } else {
                    return null;
                  }
                }}
                keyExtractor={(item, index) => `id_${index}`}
                data={tags}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <TouchAble>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>+ {item}</Text>
                      </View>
                    </TouchAble>
                  );
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <BottomSheet
      ref={actionSheetRef}
      initialSnap={1}
      onCloseEnd={() => {
        Keyboard.dismiss();
      }}
      snapPoints={
        Platform.OS == "ios"
          ? [hp(94), 0]
          : [hp(94) - keyBoard.keyboardHeight, 0]
      }
      renderContent={renderContent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    width: "100%",
  },
  line: {
    marginTop: hp(1),
    width: 30,
    height: 3,
    backgroundColor: "lightgray",
    alignSelf: "center",
  },
  innerContainer: {
    paddingHorizontal: wp("3"),
    paddingTop: hp(2),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(15),
  },
  image: {
    width: hp(8),
    height: hp(8),
    borderRadius: hp(4),
    backgroundColor: shimmerColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  name: {
    marginTop: hp(1),
    fontFamily: appFonts.InterLight,
    color: iconColor,
    fontWeight: "700",
    fontSize: 15,
    maxHeight: 18,
  },
  username: {
    color: iconColor,
    fontFamily: appFonts.InterLight,

    fontSize: 15,
    maxHeight: 18,
  },
  heading: {
    color: iconColor,
    fontSize: 21,
    fontFamily: appFonts.InterBold,
  },
  price: {
    color: iconColor,
    fontSize: 37,
    fontFamily: appFonts.InterBold,
  },
  middleContainer: {
    paddingTop: hp(0.5),
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    paddingTop: 2,
    width: "100%",
    color: iconColor,
    fontSize: 13,
    fontFamily: appFonts.InterBlack,
    fontWeight: "bold",
  },
  description: {
    paddingTop: 20,
    width: "100%",
    height: hp(50),
    fontWeight: "bold",

    color: iconColor,
    fontSize: 16,
    // borderWidth: 1,
    //   fontFamily: appFonts.InterBlack,
  },
  tagListView: { height: 30 },
  tagText: {
    fontFamily: appFonts.InterRegular,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
  },
  tag: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6.49051,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#000000",
  },
});
