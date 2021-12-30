/**
 * @format
 */
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { name as appName } from "./app.json";
import App from "./app/Entrypoint";

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
