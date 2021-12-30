import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";

import styles from "./style";
interface Props {
  heading: string;
  description: string;
  renderDescription?: React.ReactElement;
}
const Profile: React.FC<Props> = (props: Props) => {
  const { width } = useWindowDimensions();
  const { heading, description } = props;

  return (
    <View style={[styles.container, { width }]}>
      <Image
        style={styles.logo}
        source={require("assets/profileHeaderIcon.png")}
      />
      <View>
        <Text style={styles.header}>{heading}</Text>
        {props.renderDescription ? (
          props.renderDescription
        ) : (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </View>
  );
};

export default Profile;
