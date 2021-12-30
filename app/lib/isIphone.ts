/**
 * Helper class to fixing iPhoneX UI
 */
import { Alert, Platform, Dimensions } from 'react-native';
import Config from 'react-native-config';
import { openSettings } from 'react-native-permissions';

export function isIphone() {
    return Platform.OS === 'ios' ? 30 : 10;
}

export function permissionAlert() {
    Alert.alert(
        'Permission ',
        `Goto Settings > ${
            Config.BUILD == 'production' ? 'cohart' : 'cohart'
        } > Photos > allow Photos access to Read and Write`,
        [
            {
                text: 'Cancel',
                onPress: () => {},
            },
            {
                text: 'Open Settings',
                onPress: () => {
                    openSettings();
                },
            },
        ],
        { cancelable: false },
    );
}
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    );
}