import React from 'react';
import { View, Linking, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import VersionCheck from 'react-native-version-check';

const IOS_LINK_URL = "https://apps.apple.com/us/app/cohart/id1554034352";

interface IState {
    shouldShowModalUpdate: boolean;
}

export default class VersionCheckController extends React.Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            shouldShowModalUpdate: false
        }
    }

    async componentDidMount() {
        const latestVersion = await VersionCheck.getLatestVersion({ provider: 'appStore' });
        const currentVersion = await VersionCheck.getCurrentVersion();
        if (currentVersion < latestVersion) {
                        this.setState({
                            shouldShowModalUpdate: true
                        })
            }
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log('Error and errorInfo', error, errorInfo)
        this.setState({
            shouldShowModalUpdate: false
        });

    }

    onUpdateNewVersionInStore = () => {
        Linking.openURL(IOS_LINK_URL);
    }

    onSkipUpgradeVersionApp = () => {
        this.setState({
            shouldShowModalUpdate: false
        })
    }

    render() {
        const { shouldShowModalUpdate } = this.state;

        if (!shouldShowModalUpdate) return <View testID={"VersionIsUpdated"} />;
        return (
            <View testID={"ModalRequireVersionUpdate"} style={[styles.container]}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>
                        We have made some {'\n'} 
                        improvements to the app. {'\n'}
                        Please hit update to {'\n'}
                        access the latest version! 
                    </Text>
                    
                    <View style={styles.groupButtons}>
                        <View style={styles.space}/>
                    <TouchableOpacity testID={"UpgradeAppVersion"} style={styles.updateButtonStyle} onPress={this.onUpdateNewVersionInStore}>
                        <Text style={styles.updateTextStyle}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity testID={"SkipUpgradeVersionApp"} style={styles.buttonStyle} onPress={this.onSkipUpgradeVersionApp}>
                        <Text style={styles.dismissTextStyle}>Skip</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    groupButtons: {
        flexDirection: 'column',
        alignContent: 'space-between'
    },
    container: {
        backgroundColor: '#E6FF00',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    modal: {
        borderRadius: 10,
        width: 300,
        height: 315,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: "center",
    },
    buttonStyle: {
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 12,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: "center",
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 12
    },
    updateButtonStyle: {
        width: 120,
        height: 48,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: "center",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'black'
    },
    updateTextStyle: {
        fontSize: 20
    },
    dismissTextStyle: {
        fontSize: 14
    },
    modalText: {
        fontSize: 20,
        textAlign:"center",
        textAlignVertical: "center"
    },
    space: {
        height: 25
    }

})
