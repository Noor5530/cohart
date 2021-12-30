import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentType } from "react";
import { Post } from "utils/stores";

import { UserState } from "../models/reducers/user";

export type AuthStackPrams = {
  Base: undefined;
  Login: { data: object | undefined | null };
  SignUp: undefined;
  Success: undefined;
  InterestingTopic: undefined;
  Profile: undefined;
};

export type StackParams = {
  Base: undefined;
  NewPost: {
    mediaUrl: string;
  };
};

type ModalStackParams = {
  Main: undefined;
  NewPostPreview: {
    post: Post;
    showPreviewText?: boolean;
  };
};

export type TabParams = {
  FirstLogin: undefined;
  Discover: undefined;
  Community: undefined;
  MyProfile: {
    currentUser: boolean;
    user: UserState;
  };
  Home: undefined;
  auth: undefined;
  Base: undefined;
  tabs: undefined;
  AddPortfolio: {
    mediaUrl: object;
    data: Post;
    isPreView: boolean;
    userWork: boolean;
  };
  NewPost: {
    mediaUrl: object;
  };
  NewPostPreview: {
    post: Post;
    showPreviewText?: boolean;
    currentUser: boolean
  };
  EditProfile: undefined;
  InterestingTopic: undefined;
  UserProfile: {};
  Chat: {
    friend: UserState | null | undefined;
    user: UserState | null | undefined;
  };
  CommunityTab: undefined;
  EditCommunity: undefined;
  UploadPortfolio: object;
  ContactAndFeedBack: object;
  TermsAndCondition: object;
  SavedArtWorks: object;
  About: undefined;
  Notification: undefined;
  Menu: undefined;
  ReferFriend: undefined;
  ChangeNumber: undefined;
  AllUser: undefined;
  UserPostPreview: object;
  UploadPost: object;
  LoginAs: object;
  SnapShotView: object;
  FansScreen: {
    _id: undefined;
  };
  ConnectedRequest: {
    user: UserState | null | undefined;
    alreadyRequestSend: boolean | undefined | null
  }
};

export type TabStackParams = {
  CommunityTab: undefined;
  EditCommunity: undefined;
};
export type AllNavParams = StackParams & ModalStackParams & AuthStackPrams;
export type StackScreen<N extends keyof AllNavParams, P = {}> = ComponentType<
  {
    navigation: NativeStackNavigationProp<AllNavParams, N>;
    route: RouteProp<AllNavParams, N>;
  } & P
>;

export type ChatScreenRouteProps = RouteProp<TabParams, "Chat">;
export type LoginScreenRouteProps = RouteProp<AuthStackPrams, "Login">;

export type MyProfileScreenRouteProps = RouteProp<TabParams, "MyProfile">;
export type MyFansScreenRouteProps = RouteProp<TabParams, "FansScreen">;
export type MyConnectedRequestRouteProps = RouteProp<TabParams, "ConnectedRequest">;
export type NewPostPreviewRouteProps = RouteProp<TabParams, "NewPostPreview">;
