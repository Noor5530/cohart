import { useNavigation } from '@react-navigation/native';
import { CrossIcon } from 'components/Icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { appFonts } from '../../components/text';
import { iconColor, primary, textColor } from '../../config/colors';
interface Props {
  isModalVisible: boolean;
  toggleModal: (value: boolean) => void;
}

const ListFooterComponent = (props: Props) => {
  const navigation = useNavigation();
  const { isModalVisible, toggleModal } = props;
  return (
    <Modal
      key="ListFooterComponent"
      animationInTiming={2000}
      animationOutTiming={2000}
      isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              toggleModal(false);
            }}
            style={styles.crossView}>
            <CrossIcon />
          </TouchableOpacity>
          <Text style={styles.description}>
            {
              "Let's complete  your profile so the community can get to know you!"
            }
          </Text>
          <TouchableHighlight
            onPress={() => {
              toggleModal(false);
              setTimeout(() => {
                navigation.navigate('MyProfile', {
                  userType: "",
                  currentUser: false,
                });
              }, 2000);
            }}
            underlayColor={primary}
            style={[styles.footerButton]}>
            <View style={styles.buttonTitleView}>
              <Text style={styles.text}>LET’S GO</Text>
              <AntDesign name="check" color={iconColor} size={hp('2.5')} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  description: {
    color: iconColor,
    fontSize: 30,
    fontFamily: appFonts.InterRegular,
    // textAlign: 'center',
    width: 217,
    fontWeight: '500',
  },
  crossView: {
    alignSelf: 'flex-end',
    paddingTop: 14,
    paddingHorizontal: 13,
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  innerContainer: {
    width: 310,
    height: 413,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: textColor,
  },
  text: {
    textAlign: 'auto',
    color: iconColor,
    fontFamily: appFonts.InterBold,
    fontWeight: '500',
    fontSize: 17.8,
    paddingTop: 0,
    paddingRight: 10,
  },
  acceptButton: {
    position: 'absolute',
    height: hp('4'),
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primary,
    flexDirection: 'row',
    bottom: 20,
    borderColor: iconColor,
  },
  footerButton: {
    height: 42,
    width: 168,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: textColor,
    borderWidth: 1,
    borderColor: iconColor,
  },
  buttonTitleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListFooterComponent;
