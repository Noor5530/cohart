import "react-native";
import React from "react";
import SocialList from "../../../app/screens/Register/components/SocialList";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<SocialList />).toJSON();

  expect(tree).toMatchSnapshot();
});
