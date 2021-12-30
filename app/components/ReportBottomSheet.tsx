// import { useNavigation } from '@react-navigation/native';

import React, { useState } from "react";
import { Keyboard, Text, View, StyleSheet, FlatList } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useSelector } from 'react-redux';
import BottomSheet from "reanimated-bottom-sheet";
import { TouchAble as TouchableOpacity } from "components/workAround";
import { appFonts } from "./text";
import { NeonBlue, placeHolderColor, textColor } from "config/colors";
// import AppState from 'models/reducers';

interface IProps {
  bottomSheetRef?: typeof BottomSheet;
  isVisible?: boolean;
  deleteUserPost?: () => {};
  toggleButtonSheet?: () => {};
  item?: Array<String>;
  key?: number;
  textItem?: string;
  onPresSubmit: (data: value) => void;
  reportOptions: number
}
const data = [
  { id: 0, key: 'It’s spam' },
  { id: 1, key: 'Nudity or sexual activity' },
  { id: 2, key: 'Hate speech or symbols' },
  { id: 3, key: 'False Information' },
  { id: 4, key: 'I just don’t like it' },
  { id: 5, key: 'Bullying or harrassment' },
  { id: 6, key: 'Scam or fraud' },
  { id: 7, key: 'Violence or dangerous organizations' },
  { id: 8, key: 'It’s spam' },
  { id: 9, key: 'Nudity or sexual activity' },
  { id: 10, key: 'Hate speech or symbols' },
  { id: 11, key: 'False Information' },
  { id: 12, key: 'I just don’t like it' },
  { id: 13, key: 'Bullying or harrassment' },
  { id: 14, key: 'Scam or fraud' },
  { id: 15, key: 'Violence or dangerous organizations' },

]
export default function ReportBottomSheet(props: IProps) {
  const [reportChat, setReportChat] = useState(true);
  const [value, setValue] = useState(null);
  const { bottomSheetRef } = props;
  const onPress = () => {
    props.onPresSubmit(value.id)
    setReportChat(true);
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.itemTextContainet} onPress={() => {
        setValue(item)
        setReportChat(false);

      }}>
        <Text style={styles.itemText}>{item.key}</Text>
      </TouchableOpacity>
    )
  }
  const renderContent = () => {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => {
            bottomSheetRef?.current?.snapTo(1)
          }}
          style={styles.topLine}
        />
        <Text
          style={styles.reportHeading}>
          REPORT
        </Text>
        <Text
          style={styles.reportText}
        >
          Why are you reporting this content?
        </Text>

        {reportChat ? (<View style={styles.flatListContainer}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 80
            }}
            keyExtractor={(item, index) => `id_${index}`}
            data={data}
            renderItem={renderItem}
          />

        </View>

        ) : (
          <>
            <TouchableOpacity style={styles.itemTextContainet} onPress={() => {
            }}>
                <Text style={reportChat ? styles.itemText : styles.reportItemText}>{value?.key}</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={() => onPress()}>
              <Text style={styles.submitButtonText} >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </>
        )}



      </View>
      // </View>
    );
  };
  return (
    <BottomSheet
      onCloseEnd={() => {
        Keyboard.dismiss();
        // setReportChat(true);
      }}
      animateOnMount={true}
      enabledBottomInitialAnimation
      style={{ backgroundColor: "white" }}
      ref={bottomSheetRef}
      initialSnap={1}
      snapPoints={[hp("50"), 0]}
      renderContent={renderContent}
    />

  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    borderTopWidth: 2,
    padding: 10,
    backgroundColor: textColor,
  },
  topLineContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: textColor

  },
  topLine: {
    width: 30,
    height: 5,
    backgroundColor: "lightgray",
    borderRadius: 20,
    alignSelf: "center"
  },
  reportHeading: {
    fontSize: 18,
    fontFamily: appFonts.InterRegular,
    fontWeight: "400",
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  reportText: {
    fontSize: 14,
    marginTop: 5,
    fontFamily: appFonts.InterRegular,
    fontWeight: "400",
    justifyContent: 'center',
    textAlign: 'center',
  },
  itemText: {
    marginTop: 5,
    fontFamily: appFonts.InterRegular,
    fontWeight: "400",
    justifyContent: 'center',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 18,
    height: 35,
  },
  reportItemText: {
    marginTop: 10,
    fontFamily: appFonts.InterRegular,
    fontWeight: "500",
    justifyContent: 'center',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 18,
    height: 35,
    color: NeonBlue
  },
  itemTextContainet: {
    borderBottomWidth: 0.2,
    borderBottomColor: placeHolderColor,
    justifyContent: 'center',
    marginVertical: 2
  },


  flatListContainer: {
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor: NeonBlue
  },
  submitButtonText: {
    fontSize: 19,
    color: textColor,
    fontWeight: "600",
    fontFamily: appFonts.InterRegular,
    textAlign: 'center'

  }
});
