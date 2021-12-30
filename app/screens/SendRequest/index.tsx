import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderBack from 'components/Header';
import { appFonts } from 'components/text';
import { iconColor } from 'config/colors';
import React from 'react';
import { View } from 'react-native';

import { isIphone } from '../../lib/isIphone';
import Container from './Container';
import Header from './Header';
import IsFriend from './IsFriend';

const UserProfile: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <View
            key="friendScreen"
            style={[
                {
                    paddingTop: isIphone(),
                },
            ]}>
            <HeaderBack
                style={{
                    paddingTop: isIphone(),
                    borderBottomColor: iconColor,
                    borderBottomWidth: 1.5,
                }}
                textStyle={{
                    color: iconColor,
                    fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
                }}
                back
                color={iconColor}
            />
            <Header
                goBack={() => navigation.goBack()}
                description={
                    route?.params?.isConnectedUser == 'connected'
                        ? 'You + ' +
                          route?.params?.user?.full_name +
                          ' Connected!'
                        : route?.params?.isConnectedUser == 'pending'
                        ? 'Your request already has been sent!'
                        : 'Your request has been sent!'
                }
            />
            {route?.params?.isConnectedUser == 'connected' ? (
                <IsFriend user={route?.params?.user} />
            ) : (
                <Container
                    user={route?.params?.user}
                    description={
                        'You are now following ' +
                        route?.params?.user?.full_name +
                        ' and can chat once ' +
                        route?.params?.user?.full_name +
                        ' connects with you.'
                    }
                />
            )}
        </View>
    );
};

export default UserProfile;
