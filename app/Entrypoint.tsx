/**
 * React Native App
 * Everything starts from the entrypoint
 */
import "react-native-gesture-handler";

import NetInfo from "@react-native-community/netinfo";
import analytics from "@segment/analytics-react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import codePush from "react-native-code-push";
import RNExitApp from "react-native-exit-app";
import { Provider as PaperProvider } from "react-native-paper";
import RNRestart from "react-native-restart";
import { enableScreens } from "react-native-screens";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import Smartlook from "smartlook-react-native-wrapper";
import { LogBox } from "react-native";
import { persistor, store } from "../app/store";
import Navigator from "./navigation";
import { MenuProvider } from "react-native-popup-menu";

LogBox.ignoreAllLogs();
enableScreens();
analyticsSetup();
Smartlook.setupAndStartRecording("7f58dbad805fe3fbd2b492d77770fe4896b82e3c");

async function analyticsSetup(): Promise<void> {
  await analytics.setup("LU7MFnkUF7XbnvRimWBCxL7MtEf5ZVyD", {
    recordScreenViews: false,
    trackAppLifecycleEvents: true,
  });
}

const RootNavigation: React.FC = () => {
  // const isDark = false;

  return (
    <MenuProvider>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </MenuProvider>
  );
};

const Entrypoint: React.FC = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "Network Error ",
          "Network is not reachable.Please reconnect...",
          [
            {
              text: "Restart",
              onPress: () => {
                RNRestart.Restart();
              },
            },
            {
              text: "Exit",
              onPress: () => {
                RNExitApp.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};
const codePushOptions = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
};

export default codePush(codePushOptions)(Entrypoint);
