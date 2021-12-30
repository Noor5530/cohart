import "react-native";
import React from "react";
import FeatureSnapshot from "../../../app/screens/FeatureSnapshot";
import renderer from "react-test-renderer";
import { render, fireEvent, act } from "@testing-library/react-native";
import * as featuredPosts from "services/getFeaturedPosts";
import { AxiosResponse } from "axios";
import * as reactNavigation from "@react-navigation/native";
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<FeatureSnapshot />).toJSON();
  act(() => {
    jest.spyOn(reactNavigation, "useIsFocused").mockImplementation(() => true);
  });
  expect(tree).toMatchSnapshot();
});

test("get featureSnapshot ", () => {
  const { getByTestId } = render(<FeatureSnapshot />);

  act(() => {
    const mockResponse: AxiosResponse = {
      data: {
        data: [
          {
            _id: "1111111111111",
          },
        ],
        statusCode: 200,
      },
      status: 200,
      statusText: "",
      headers: undefined,
      config: {},
    };

    const mockGetFeaturedPosts = jest
      .spyOn(featuredPosts, "getFeaturedPosts")
      .mockImplementation(() => Promise.resolve(mockResponse));
    fireEvent(getByTestId("SnapShotList"), "onRefresh");
    expect(mockGetFeaturedPosts).toHaveBeenCalled();
  });
});
test("fail on get  featureSnapshot", () => {
  const { getByTestId } = render(<FeatureSnapshot />);

  act(() => {
    const mockGetFeaturedPosts = jest
      .spyOn(featuredPosts, "getFeaturedPosts")
      .mockImplementation(() => Promise.reject());
    act(() => {
      fireEvent(getByTestId("SnapShotList"), "onRefresh");
    });
    expect(mockGetFeaturedPosts).toHaveBeenCalled();
  });
});
