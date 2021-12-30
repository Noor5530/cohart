import { appFonts } from 'components/text';
import { iconColor, primary, textColor } from 'config/colors';
import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { acceptCommunityGuideLinesRequest } from 'store/actions/userActions';

import styles from '../styles';

interface CommunityModelProps {
    isModalVisible: boolean;
    isAcceptGuideLines: boolean;
    toggleModal: (value: boolean) => void;
    acceptGuideLines: () => void;
}

function CommunityModel({
    toggleModal,
    acceptGuideLines,
    isAcceptGuideLines = false,
}: CommunityModelProps) {
    const dispatch = useDispatch();
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'black',
            }}>
            <View
                style={{
                    width: 310,
                    height: 413,
                    backgroundColor: textColor,
                    paddingTop: 16,
                    alignItems: 'center',
                    //  justifyContent: 'space-between',
                    borderRadius: 12.01,
                }}>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 5, top: 5 }}
                    onPress={() => {
                        toggleModal(false);
                    }}>
                    <AntDesign name="close" color={'#7E7E7E'} size={hp('3')} />
                </TouchableOpacity>
                <Text
                    style={{
                        textAlign: 'center',
                        color: iconColor,
                        fontFamily: appFonts.InterBold,
                        fontSize: hp('2'),
                    }}>
                    {'COMMUNITY \n GUIDELINES'}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: 73,
                        paddingHorizontal: 28,
                    }}>
                    <View>
                        <Text style={styles.text}>{'1.  '}</Text>
                        <Text style={styles.text}>{'2.  '}</Text>
                        <Text style={styles.text}>{'3.  '}</Text>
                    </View>

                    <View>
                        <Text style={styles.text}>{'Be respectful'}</Text>
                        <Text style={styles.text}>{'Be authentic'}</Text>
                        <Text style={styles.text}>
                            {'Connect, participate, share, and listen'}
                        </Text>
                    </View>
                </View>
                <TouchableHighlight
                    style={[
                        styles.acceptButton,
                        {
                            backgroundColor: textColor,
                            borderWidth: isAcceptGuideLines ? 0 : 1,
                            width: 229.77,
                            justifyContent: 'center',
                        },
                    ]}
                    underlayColor={primary}
                    onPress={() => {
                        acceptGuideLines();
                        dispatch(acceptCommunityGuideLinesRequest());
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: 12,
                                    paddingTop: 0,
                                    paddingRight: 10,
                                },
                            ]}>
                            I agree to these guidelines
                        </Text>
                        <AntDesign
                            name="check"
                            color={iconColor}
                            size={hp('2.5')}
                        />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}
export default CommunityModel;
