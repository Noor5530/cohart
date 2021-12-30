import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-native-paper/src/components/Button";

import AppState from "../../../../models/reducers";
import { data } from "./mockData";
import Tags from "./Tags";
import ProfileHeader from "../ProfileHeader";
import Snackbar from 'react-native-paper/src/components/Snackbar';
import { saveUserInterest } from "services/saveUserInterest";
import * as userActions from "store/actions/userActions";
import LoadingOverlay from "components/LoadingOverlay";

import styles from "./style";

interface IProps {
  onPressButton(): void;
}

const Interesting: React.FC<IProps> = ({ onPressButton }: IProps) => {
  const interests = useSelector((state: AppState) => state.user.interests);
  const user = useSelector((state: AppState) => state.user);
  const [selectedTopic, setSelectedTopic] = useState(interests);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const onSave = async () => {
    try {
      setSubmitting(true);
      const payload = {
        id: user._id,
        phone_number: user.phone_number,
        interests: selectedTopic.toString(),
      };
      const apiResponse = await saveUserInterest(payload);
      if (apiResponse.data.statusCode === 200) {
        dispatch(userActions.saveTopicResponse(selectedTopic as any));
        setSubmitting(false);
        onPressButton()
      } else {
        setSubmitting(false);
        setError(true);
      }
    } catch (e) {
      setSubmitting(false);
      setError(true);
    }
  };

  const onDismissSnackBar = () => setError(false)

  const renderTopics = ({ item, index }: { item: any; index: number }) => {
    return (
      <Tags
        item={item}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        index={index}
      />
    );
  };

  return (
    <View style={styles.container}>
      {submitting && <LoadingOverlay />}
      <ProfileHeader
        description={"[ SELECT 3 OR MORE ]"}
        heading={"I’M INTERESTED IN.."}
        renderDescription={
          <>
            <Text style={styles.headerDescriptionText}>
              SELECT AT LEAST ONE OPTION
            </Text>
            <Text style={styles.headerDescriptionText}>
              [ YOU CAN CHANGE THIS LATER ]
            </Text>
          </>
        }
      />

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 38,
          paddingTop: 28,
          paddingBottom: 100,
        }}
        data={data}
        renderItem={renderTopics}
        keyExtractor={(item, index) => `id_${index}`}
      />
      {selectedTopic.length > 0 ? (
        <Button
          style={styles.saveButton}
          onPress={onSave}
          mode="text"
          labelStyle={styles.buttonText}
        >
          START DISCOVERING
        </Button>
      ) : null}
      <Snackbar
        style={{ position: "absolute", bottom: 0}}
        visible={error}
        onDismiss={onDismissSnackBar}
      >
        Something went wrong!
      </Snackbar>
    </View>
  );
};

export default Interesting;
