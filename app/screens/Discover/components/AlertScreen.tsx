import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableHighlight
} from 'react-native';
import { appFonts } from 'components/text';
import { iconColor,primary } from 'config/colors';
interface Props {
  style: ViewStyle;
  userData?: object;
  data: object[];
  setData: (data: object) => void;
  goBack: () => {};
}

export default function AlertScreen(props: Props) {
    // var [ isPress, setIsPress ] = React.useState(false);

  const { style } = props;
  // const onAccept = useCallback(() => {
  //   Alert.alert(
  //     'Hide Post',
  //     'Are you sure you don’t want to see more contents from this person?',
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'OK',
  //         onPress: () => {},
  //       },
  //     ],
  //   );
  // }, []);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.heading}>
        Are you sure you don’t want to see more content like this?
      </Text>
      <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%'}}>
   
      <TouchableHighlight 
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={props.goBack}
      style={[styles.button, { marginTop: 30 }]}>
        <Text style={styles.label}>No</Text>
      </TouchableHighlight>
     
    
       <TouchableHighlight
        // onPress={onAccept}
        onPress={props.goBack}
        underlayColor={primary}
        style={[
          styles.button,
          {
            marginTop: 30,
          },
        ]}>
        <Text style={styles.label}>Yes</Text>
      </TouchableHighlight>
      
  
        </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: iconColor,
    fontSize: 17,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  button: {
    height: 40,
    width: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: iconColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    paddingHorizontal: 30,
    color: iconColor,
    fontFamily: appFonts.InterBlack,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
