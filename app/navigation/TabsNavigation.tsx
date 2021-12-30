import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { textColor } from "config/colors";
import React from "react";
import About from "screens/About";
import AddPortfolio from "screens/AddPortfolio";
import UploadPortfolio from "screens/AddPortfolio/UploadPortfolio";
import AllUser from "screens/AllUser";
import ChangeNumber from "screens/ChangeNumber";
import Chat from "screens/Chat";
import CommunityTab from "screens/Community/CommunityTab";

import ContactAndFeedBack from "screens/ContactAndFeedBack";
import DiscoverTab from "screens/Discover/DiscoverFeed";
import DiscoverFeedFirstTime from "screens/Discover/DiscoverFeedFirstTime";
import LoginAs from "screens/LoginAs";
import Menu from "screens/Menu";
import Notification from "screens/Notification";
import MyProfile from "screens/ProfileScreen";
import { NewPost } from "screens/Profile/NewPost";
import { NewPostPreview } from "screens/Profile/NewPostPreview";
import SnapshotOptions from "screens/Profile/SnapshotOptions";
import UploadPost from "screens/Profile/UploadPost";
import UserPostPreview from "screens/Profile/UserPostPreview";
import { UserProfile } from "screens/Profile/UserProfile";
import ReferFriend from "screens/ReferFriend";
import SavedArtWorks from "screens/SavedArtWorks";
import SendRequest from "screens/SendRequest";
import TermsAndCondition from "screens/TermsAndCondition";
import FirstLogin from "screens/FirstLogin";
import CommunityGuideline from "screens/Discover/components/Community";
import EditProfile from "screens/EditProfile/EditProfile";

import BottomTab from "./BottomTab";
import { TabParams } from "./types";
import FeatureSnapshot from "screens/FeatureSnapshot";
import SnapShotView from "screens/SnapShotView";
import FansScreen from "screens/FansScreen";
import ConnectedRequest from "screens/ConnectedRequest";
const Tab = createBottomTabNavigator<TabParams>();
const MenuStack = createNativeStackNavigator();

const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="Discover" component={DiscoverFeedFirstTime} />
      <DiscoverStack.Group
        screenOptions={{
          presentation: "modal",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <DiscoverStack.Screen
          listeners={{
            beforeRemove: () => {},
          }}
          name="FirstLogin"
          component={FirstLogin}
        />
      </DiscoverStack.Group>
    </DiscoverStack.Navigator>
  );
};

interface ITabNav {
  isFirstTimeLogin: boolean;
  isAcceptGuideLines: boolean;
}

// TODO: The navigation stack and tab bar need to do refactor in later
// with correct behaviours to include 3 tabs community, discover and profile
// Each tab should have completely different stack navigator.

// const CommunityStack = createNativeStackNavigator()
// const CommunityStackScreen = () => {
//   return (
//     <CommunityStack.Navigator screenOptions={{ headerShown: false }}>
//       <CommunityStack.Screen name="Community" component={CommunityTab} />
//       <CommunityStack.Screen name="UserProfile" component={UserProfile} />
//       <CommunityStack.Screen name="EditCommunity" component={EditCommunity} />
//       <CommunityStack.Screen name="Chat" component={Chat} />
//       <CommunityStack.Screen name="AllUser" component={AllUser} />
//       <CommunityStack.Screen name="SendRequest" component={SendRequest} />
//       <CommunityStack.Screen name="UserPostPreview" component={UserPostPreview} />
//       <CommunityStack.Screen name="Menu" component={MenuStackContainer} />
//     </CommunityStack.Navigator>
//   )
// }

// const MyProfileStack = createNativeStackNavigator()
// const MyProfileStackScreen = () => {
//   return (
//     <MyProfileStack.Navigator  screenOptions={{ headerShown: false }}>
//        <MyProfileStack.Screen
//           options={{ tabBarLabel: "My Profile" }}
//           name="MyProfile"
//           component={MyProfile}
//         />
//         <MyProfileStack.Screen name="NewPostPreview" component={NewPostPreview} />
//         <MyProfileStack.Screen name="AddPortfolio" component={AddPortfolio} />
//         <MyProfileStack.Screen name="UploadPortfolio" component={UploadPortfolio} />
//         <MyProfileStack.Screen name="NewPost" component={NewPost} />

//         <MyProfileStack.Screen name="UploadPost" component={UploadPost} />
//         <MyProfileStack.Screen name="Menu" component={MenuStackContainer} />
//         <MyProfileStack.Screen name="SnapshotOptions" component={SnapshotOptions} />
//         <MyProfileStack.Screen name="FirstTimeCommunityGuideline" component={CommunityGuideline} />

//     </MyProfileStack.Navigator>
//   )
// }

// const DiscoverNormalStack =  createNativeStackNavigator()
// const DiscoverNormalStackScreen = () => {
//   return (
//     <DiscoverNormalStack.Navigator  screenOptions={{ headerShown: false }}>
//       <DiscoverNormalStack.Screen name="DiscoverTab" component={DiscoverTab}/>
//       <Tab.Screen name="ReferFriend" component={ReferFriend} />
//     </DiscoverNormalStack.Navigator>
//   )
// }

const TabNav = ({ isFirstTimeLogin, isAcceptGuideLines }: ITabNav) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
      sceneContainerStyle={{ backgroundColor: textColor }}
      initialRouteName={"Discover"}
      tabBar={(props) => (
        <BottomTab
          isNavRoot={true}
          isAcceptGuideLines={isAcceptGuideLines}
          isFirstTimeLogin={isFirstTimeLogin}
          {...props}
        />
      )}
    >
      <Tab.Group screenOptions={{ title: "Community" }}>
        <Tab.Screen name="Community" component={CommunityTab} />
        <Tab.Screen name="UserProfile" component={UserProfile} />

        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="AllUser" component={AllUser} />
        <Tab.Screen name="SendRequest" component={SendRequest} />
        <Tab.Screen name="UserPostPreview" component={UserPostPreview} />
        {/* <Tab.Screen name="CommunityTab" component={CommunityStackScreen}/> */}
      </Tab.Group>
      <Tab.Screen
        name="Discover"
        component={
          isFirstTimeLogin || !isAcceptGuideLines
            ? DiscoverStackScreen
            : DiscoverTab
        }
      />

      <Tab.Screen
        name="FirstTimeCommunityGuideline"
        component={CommunityGuideline}
      />

      <Tab.Screen name="ReferFriend" component={ReferFriend} />

      <Tab.Group>
        {/* <Tab.Screen name="MyProfileTab" component={MyProfileStackScreen}/> */}
        <Tab.Screen
          options={{ tabBarLabel: "My Profile" }}
          name="MyProfile"
          initialParams={{ currentUser: true, user: null }}
          component={MyProfile}
        />
        <Tab.Screen name="EditProfile" component={EditProfile} />
        <Tab.Screen name="NewPostPreview" component={NewPostPreview} />
        <Tab.Screen name="AddPortfolio" component={AddPortfolio} />
        <Tab.Screen name="UploadPortfolio" component={UploadPortfolio} />
        <Tab.Screen name="NewPost" component={NewPost} />

        <Tab.Screen name="UploadPost" component={UploadPost} />
        <Tab.Screen name="Menu" component={MenuStackContainer} />
        <Tab.Screen name="SnapshotOptions" component={SnapshotOptions} />
        <Tab.Screen name="SnapShotView" component={SnapShotView} />
        <Tab.Screen name="FansScreen" component={FansScreen} />
        <Tab.Screen name="ConnectedRequest" component={ConnectedRequest} />
        <Tab.Screen name="Notification" component={Notification} />
      </Tab.Group>
    </Tab.Navigator>
  );
};

const MenuStackContainer = () => {
  return (
    <MenuStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <MenuStack.Screen name="Main" component={Menu} />
      <MenuStack.Screen name="FeatureSnapshot" component={FeatureSnapshot} />

      <MenuStack.Screen name="ReferFriend" component={ReferFriend} />
      <MenuStack.Screen name="ChangeNumber" component={ChangeNumber} />
      <MenuStack.Screen name="LoginAs" component={LoginAs} />
      <MenuStack.Screen name="SavedArtWorks" component={SavedArtWorks} />
      <MenuStack.Screen
        name="TermsAndCondition"
        component={TermsAndCondition}
      />
      <MenuStack.Screen name="About" component={About} />
      <MenuStack.Screen
        name="ContactAndFeedBack"
        component={ContactAndFeedBack}
      />
    </MenuStack.Navigator>
  );
};


export default TabNav;
