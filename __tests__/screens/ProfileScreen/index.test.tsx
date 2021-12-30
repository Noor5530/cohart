/**
 * @format
 */
import 'react-native';
import React from 'react';
import ProfileScreen from '../../../app/screens/ProfileScreen/index';
import * as followStatus from "../../../app/services/followStatus";
import * as getUserPost from "../../../app/services/getUserPost";
import * as followUser from "../../../app/services/followUser";
import * as ReactNavigation from "@react-navigation/native";
// Note: test renderer must be required after react-native.

import { render, act, fireEvent } from "@testing-library/react-native";
// import * as Navigation from '@react-navigation';
// import { AxiosResponse } from "axios";
// import * as getUserPost from "services/getUserPost";
// import * as getUserInformation from "services/getUserInformation";
import * as reactNavigation from "@react-navigation/native";
import { AxiosError, AxiosResponse } from "axios";
const mockResponse: AxiosResponse = {
  data: {
    data: {
      follow_back: true,
      is_following: true,
    },
    statusCode: 200,
  },
  status: 200,
  statusText: "",
  headers: undefined,
  config: {},
};
const mockResponseFollowUser: AxiosResponse = {
  data: {
    data: {
      user_id: 1111,
      follower_id: 2222,
      unfollow: true,
    },
    statusCode: 200,
  },
  status: 200,
  statusText: "",
  headers: undefined,
  config: {},
};

const mockResponseGetUserPost: AxiosResponse = {
  data: {
    data: [{ id: 111 }, { id: 2222 }],
    statusCode: 200,
  },
  status: 200,
  statusText: "",
  headers: undefined,
  config: {},
};

const failApiResponse: AxiosError = { response: { status: 401 } };
describe("Profile screen testing", () => {
  test("renders correctly", () => {
    const tree = render(<ProfileScreen />);
    act(() => {
      jest
        .spyOn(reactNavigation, "useIsFocused")
        .mockImplementation(() => true);
    });
    expect(tree).toMatchSnapshot();
  });

  test("renders correctly  profile screen list", () => {
    let followStatusApi = jest
      .spyOn(followStatus, "followStatus")
      .mockImplementation(() => Promise.resolve(mockResponse));
    let UserPostStatusApi = jest
      .spyOn(getUserPost, "getUserPost")
      .mockImplementation(() => Promise.resolve(mockResponseGetUserPost));
    let followUserApi = jest
      .spyOn(followUser, "followUser")
      .mockImplementation(() => Promise.resolve(mockResponseFollowUser));

    const { getByTestId, rerender } = render(<ProfileScreen />);

    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "ListFooterComponent");
    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("ProfileScreenList"), "ListEmptyComponent");
    fireEvent(getByTestId("ProfileScreenList"), "ListHeaderComponent");
    fireEvent(getByTestId("onFollowUserPrimary"), "onPress");
    // fireEvent(getByTestId("onChatPrimaryButton"), "onPress");
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");
    fireEvent(getByTestId("TopBar"), "onChangeTab", 1);
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");

    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("TopBar"), "onChangeTab", 2);
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");
    fireEvent(getByTestId("Alert"), "onAccept");
    fireEvent(getByTestId("Alert"), "onReject");
    fireEvent(getByTestId("TopBar"), "onChangeTab", null);
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ReportBottomSheet"), "onPresSubmit");
    followStatusApi.mockClear();
    followStatusApi.mockImplementation(() => Promise.reject(failApiResponse));
    rerender(<ProfileScreen />);
    followStatusApi.mockClear();
    UserPostStatusApi.mockClear();
    followUserApi.mockClear();
  });
  test("renders correctly  profile screen list", () => {
    let followStatusApi = jest.spyOn(followStatus, "followStatus");
    followStatusApi.mockImplementation(() => Promise.reject(failApiResponse));

    let UserPostStatusApi = jest
      .spyOn(getUserPost, "getUserPost")
      .mockImplementation(() => Promise.reject(failApiResponse));
    let followUserApi = jest
      .spyOn(getUserPost, "getUserPost")
      .mockImplementation(() => Promise.reject(failApiResponse));
    let route = jest
      .spyOn(ReactNavigation, "useRoute")
      .mockImplementation(() => ({
        params: { currentUser: true, user: { _id: 1111 } },
      }));

    const { getByTestId } = render(<ProfileScreen />);

    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "ListFooterComponent");
    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("ProfileScreenList"), "ListEmptyComponent");
    fireEvent(getByTestId("ProfileScreenList"), "ListHeaderComponent");
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");
    fireEvent(getByTestId("TopBar"), "onChangeTab", 1);
    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");

    fireEvent(getByTestId("TopBar"), "onChangeTab", 2);
    fireEvent(getByTestId("ProfileScreenList"), "onRefresh");
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    fireEvent(getByTestId("ProfileScreenList"), "onEndReached");
    fireEvent(getByTestId("Alert"), "onAccept");
    fireEvent(getByTestId("Alert"), "onReject");
    fireEvent(getByTestId("TopBar"), "onChangeTab", null);
    fireEvent(getByTestId("ProfileScreenList"), "renderItem", {
      item: { data: "" },
      i: 1,
    });
    UserPostStatusApi.mockClear();
    followUserApi.mockClear();
    route.mockClear();
  });
});

