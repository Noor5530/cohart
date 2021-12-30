import { User } from 'models/types';
import React from 'react';
import { View, ViewStyle } from 'react-native';

import { isIphone } from '../../lib/isIphone';
import Container from './Container';
import Header from './Header';
import IsFriend from './IsFriend';

interface Props {
    user: User;
    goBack: () => void;
    isConnectedUser: string;
    style: ViewStyle;
}

const UserProfile: React.FC<Props> = (props: Props) => {
  const { user = {} } = props;

    return (
        <View
            key="friendScreen"
            style={[
                {
                    paddingTop: isIphone(),
                },
                props.style,
            ]}>
            <Header
                goBack={props.goBack}
                description={
                    props.isConnectedUser == 'connected'
                        ? 'You + ' + props?.user?.full_name + ' Connected!'
                        : props.isConnectedUser == 'pending'
                        ? 'Your request already has been sent!'
                        : 'Your request has been sent!'
                }
            />
            {props.isConnectedUser == 'connected' ? (
                <IsFriend user={user} />
            ) : (
                <Container
                    user={user}
                    description={
                        'You are now following ' +
                        props?.user?.full_name +
                        ' and can chat once ' +
                        props?.user?.full_name +
                        ' connects with you.'
                    }
                />
            )}
        </View>
    );
};

export default UserProfile;
