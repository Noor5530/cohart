import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import AppState from "models/reducers";
import React from "react";
import { useSelector } from "react-redux";
import CohartLogin from "screens/CohartLogin";
import CohartLoginCode from "screens/CohartLoginCode";
import Login from "screens/Login";
import MainScreen from "screens/MainScreen";
import PostView from "screens/PostView";
import InterestingTopic from "screens/Profile/InterestingTopic";
import Profile from "screens/Profile/Profile";
import ReferFriend from 'screens/ReferFriend';
import SignUp from "screens/SignUp";
import Success from "screens/Success";
import TermsAndCondition from "screens/TermsAndCondition";
import Welcome from "screens/Welcome";
import Register from "screens/Register";
import MyProfile from "screens/ProfileScreen";

import { AuthStackPrams } from "./types";

const AuthStack = createNativeStackNavigator<AuthStackPrams>();

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStackScreens = () => {
  const phone_number = useSelector(
    (state: AppState) => state.user.phone_number
  );
  const full_name = useSelector((state: AppState) => state.user.full_name);

  return (
    <AuthStack.Navigator
      screenOptions={stackScreenOptions}
      initialRouteName={phone_number && full_name ? "Profile" : "Base"}
    >
      <AuthStack.Screen name="Base" component={MainScreen} />
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen
        name="Login"
        initialParams={{ data: null }}
        component={Login}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />      
      <AuthStack.Screen name="Success" component={Success} />
      <AuthStack.Screen name="InterestingTopic" component={InterestingTopic} />
      <AuthStack.Screen name="Profile" component={Profile} />
      <AuthStack.Screen name="MyProfile" component={MyProfile} />
      <AuthStack.Screen name="CohartLogin" component={CohartLogin} />
      <AuthStack.Screen name="CohartLoginCode" component={CohartLoginCode} />      

      <AuthStack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
      />
      <AuthStack.Screen name="PostView" component={PostView} />
      
      <AuthStack.Group
        screenOptions={{
          presentation: "modal",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <AuthStack.Screen name="Register" component={Register} />
        
      </AuthStack.Group>
      <AuthStack.Screen name="OnboardReferFriend" component={ReferFriend} />
    </AuthStack.Navigator>
  );
};
export default AuthStackScreens;
