// import { useNavigation } from '@react-navigation/native';

import React from "react";
import { Keyboard, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useSelector } from 'react-redux';
import BottomSheet from "reanimated-bottom-sheet";
import { TouchAble as TouchableOpacity } from "components/workAround";
import { appFonts } from "./text";
// import AppState from 'models/reducers';

interface IProps {
  bottomSheetRef: typeof BottomSheet;
  isVisible: boolean;
  deleteUserPost: () => {};
  toggleButtonSheet: () => {};
}

export default function SnapshotOptionBottomSheet(props: IProps) {
  const { bottomSheetRef } = props;
  // const userId = useSelector((state: AppState) => state.user._id);

  // const navigation = useNavigation();

  const renderContent = () => {
    return (
      <View style={{ height: "100%", borderTopWidth: 2, padding: 20 }}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: 30,
              height: 5,
              backgroundColor: "lightgray",
              borderRadius: 20,
            }}
          ></View>
        </View>
        <Text
          style={{
            fontSize: 35,
            fontFamily: appFonts.InterRegular,
            fontWeight: "bold",
            paddingVertical: 10,
          }}
        >
          {"Are you sure\nyou want to\ndelete?"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.deleteUserPost();
            }}
            style={{
              height: 42,
              width: 136,
              borderRadius: 39,
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                fontFamily: appFonts.InterRegular,
              }}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef?.current?.snapTo(1);
              // setAllUserBottomSheet(true);
            }}
            style={{
              height: 42,
              width: 136,
              borderRadius: 39,
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                fontFamily: appFonts.InterRegular,
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <BottomSheet
      onCloseEnd={() => {
        Keyboard.dismiss();
        props.toggleButtonSheet();
      }}
      animateOnMount={true}
      enabledBottomInitialAnimation
      style={{ backgroundColor: "white" }}
      ref={bottomSheetRef}
      initialSnap={1}
      snapPoints={[hp("35"), 0]}
      renderContent={renderContent}
    />
  );
}
