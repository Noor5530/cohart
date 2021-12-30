import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Monogram from "assets/MonogramIconMd.png";

import styles from "./style";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { acceptCommunityGuideLinesRequest } from 'store/actions/userActions';
import { useDispatch } from "react-redux";

interface IProps {
  height: number;
}

const Community: React.FC<IProps> = ({ height }: IProps) => {
  const [accepted, setAccepted] = useState(false);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const onPressToggleButton = () => {  
    if (!accepted) {
      dispatch(acceptCommunityGuideLinesRequest());
    }
    setAccepted(!accepted);
  };

  return (
    <View style={[styles.container, { height, width }]}>
      <View style={styles.headerStyle}>
        <Image source={Monogram} style={styles.appIcon} />
        <Text style={styles.headerText}>Community</Text>
        <Text style={styles.headerText}>Guidelines</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.numberText}>1</Text>
          <Text style={styles.contentText}>Be respectful</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberText}>2</Text>
          <Text style={styles.contentText}>Be authentic</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberText}>3</Text>
          <Text style={styles.contentText}>
            Connect, participate, share, and listen
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPressToggleButton}
        style={[styles.buttonStyle, accepted ? styles.buttonStyleActive : {}]}
      >
        <Text style={styles.buttonText}>I agree to these guidelines</Text>
        {accepted && (
          <AntDesign
            name={"check"}
            color="black"
            size={heightPercentageToDP("3")}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Community;
