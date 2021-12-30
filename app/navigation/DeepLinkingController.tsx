import React from 'react';
import {  View } from 'react-native';
import branch from 'react-native-branch';

import * as navigationActions from 'store/actions/navigationActions';


export interface IDeepLinkingControllerProps {
    isLoggedIn: boolean;
    userId: string | number | undefined;
    isFirstTimeLogin: boolean,
    onProcessDeeplink: () => void;
    username: string 
  }

export default class DeepLinkingController extends React.Component<IDeepLinkingControllerProps> {

    componentDidMount() {
        branch.subscribe(this.onHandleDeepLink);
    }

    onHandleDeepLink = ({error, params} : any) => {
            if (error) {
              return
            }            
            const { postId, deepLinkType, username } = params;
            
            const { isLoggedIn, onProcessDeeplink, username: userNameProps } = this.props;

            if(deepLinkType === 'ArtistProfile'){
                if(isLoggedIn) {
                    const currentUser = userNameProps === username
                    navigationActions.navigateToMyProfile({username, currentUser, isFromDeepLink: true})
                    return
                }
                navigationActions.navigateToMyProfile({username, currentUser: false, isFromDeepLink: true})
                return
            }
            
            if (!postId) return;

            if (params && postId && postId != undefined) {
                onProcessDeeplink();
            }

            if (isLoggedIn) {
                navigationActions.navigateToDiscover({ postId });
            }

            if(!isLoggedIn) {
                navigationActions.navigateToWelcome({ postId })
            }
    }


    render() {
        return <View />;
    }
}
