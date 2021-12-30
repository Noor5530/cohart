import { NavigationContainer } from '@react-navigation/native';

import Loader from 'components/Loader';
import PushNotification from 'components/PushNotification';
import UseConnection from 'hooks/UseConnection';
import AppState from 'models/reducers';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { Linking } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from "@react-native-community/async-storage";
import { disableSnackBar } from "../store/actions/snackBarAction";
import { startDeeplinkRequest } from "../store/actions/appAction";
import AuthNavigation from "./AuthNavigation";
import { navigationRef } from "./NavigationService";
import TabsNavigation from "./TabsNavigation";
import DeepLinkingController from "./DeepLinkingController";
import VersionCheckController from "./VersionCheckController";
import { logOutRequest } from "../store/actions/userActions";

const config = {
  screens: {
    // This is config for deeplink but right now we dont use it
    // PostView: {
    //     path: 'posts/:id',
    // },
    Notification: "notification",
  },
};
const linking = {
  prefixes: [
    "https://staging.cohdev.co",
    "https://web.cohart.co",
    "cohart://",
    "https://cohart.test-app.link",
    "https://cohart-alternate.test-app.link",
    "cohart-alternate.app.link",
  ],
  config,
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Next, you would need to get the initial URL from your third-party integration
    // It depends on the third-party SDK you use
    // For example, to get to get the initial URL for branch.io:
  },
  // subscribe(listener: any) {
  //     // First, you may want to do the default deep link handling
  //     const onReceiveURL = ({ url }: { url: string }) => listener(url);

  //     // Listen to incoming links from deep linking
  //     Linking.addEventListener('url', onReceiveURL);

  //     // Next, you would need to subscribe to incoming links from your third-party integration
  //     // For example, to get to subscribe to incoming links from branch.io:
  //     branch.subscribe(({ error, params: any, uri }) => {
  //       if (error) {
  //         console.error('Error from Branch: ' + error);
  //         return;
  //       }
  //       console.log('full params branch 2 ' + JSON.stringify(params));

  //       // A Branch link was opened
  //       const url = params.$canonical_url;

  //       listener(url);
  //     });
  // }
};

export default () => {
  const routeNameRef = useRef();
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  const firstTimeLogin = !useSelector(
    (state: AppState) => state.user.signup_complete
  );
  const isAcceptGuideLines = useSelector(
    (state: AppState) => state.user.isAcceptGuideLines
  );
  const processingDeeplink = useSelector(
    (state: AppState) => state.app.processingDeeplink
  );
  const userId = useSelector((state: AppState) => state.user._id);
  const username = useSelector((state: AppState) => state.user.username);
  const message = useSelector((state: AppState) => state.snackBar.message);
  const isVisibleSnackBar = useSelector(
    (state: AppState) => state.snackBar.isVisible
  );

  const dispatch = useDispatch();
  const onDismissSnackBar = () => {};
  useEffect(() => {
   if (isLoggedIn) {
     AsyncStorage.getItem("token")
       .then((token) => {
         console.log("tokentoken", token);
         if (!token) {
           dispatch(logOutRequest());
         }
       })
       .catch((error) => {
         console.log("tokentokenerror", error);
         dispatch(logOutRequest());
       });
   }
  }, []);
  useEffect(() => {
    if (isVisibleSnackBar) {
      setTimeout(() => {
        dispatch(disableSnackBar());
      }, 7000);
    }
  }, [isVisibleSnackBar]);

  const onProcessDeeplink = () => {
    dispatch(startDeeplinkRequest());
  };

  return (
    <>
      <VersionCheckController />
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          const currentRoute = navigationRef.current.getCurrentRoute();
          const params = currentRoute.params;

          console.log("CurrentRouteName => ", currentRouteName);

          if (previousRouteName !== currentRouteName) {
            switch (currentRouteName) {
              case "UploadPortfolio":
                analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                  description: params.data.description,
                  image_name: params.data.image_name,
                  tags: params.data.tags,
                  title: params.data.title,
                  dimensions: params.data.dimensions,
                  price: params.data.price,
                  ready_for_sale: params.data.ready_for_sale,
                });
                break;
              case "NewPostPreview":
                if (params.post) {
                  analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                    post_id: params.post._id,
                    user_id: params.post.user_id,
                    tags: params.post.tags,
                    title: params.post.title,
                  });
                }
                break;
              case "MyProfile":
                analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                  user_id: params.user._id,
                  username: params.user.username,
                  affiliations: params.user.affiliations,
                  title: params.user.title,
                  country: params.user.country,
                  full_name: params.user.full_name,
                  instagram: params.user.instagram,
                  is_admin: params.user.is_admin,
                  last_active: params.user.last_active,
                  location: params.user.location,
                  state: params.user.state,
                  tags: params.user.tags,
                  twitter: params.user.twitter,
                  website: params.user.website,
                });
                break;
              case "AddPortfolio":
                if (!params.data._id) {
                  analytics().logScreenView({});
                } else {
                  analytics().logScreenView({
                    screen_name: currentRouteName,
                    screen_class: currentRouteName,
                    post_id: params.data.id,
                    user_id: params.data.user_id,
                    description: params.data.description,
                    title: params.data.title,
                    tags: params.data.tags,
                    dimensions: params.data.dimensions,
                    price: params.data.price,
                    ready_for_sale: params.data.ready_for_sale,
                  });
                }
                break;
              default:
                analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
            }
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        {isLoggedIn ? (
          <TabsNavigation
            isAcceptGuideLines={isAcceptGuideLines}
            isFirstTimeLogin={firstTimeLogin}
          />
        ) : (
          <AuthNavigation />
        )}
      </NavigationContainer>

      <Loader shouldLoading={processingDeeplink} />
      <DeepLinkingController
        username={username}
        userId={userId}
        isLoggedIn={isLoggedIn}
        isFirstTimeLogin={firstTimeLogin}
        onProcessDeeplink={onProcessDeeplink}
      />

      <Snackbar visible={isVisibleSnackBar} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
      <UseConnection />
      <PushNotification />
    </>
  );
};
