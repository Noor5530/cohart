import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import SignUpSuccess from "../../../app/screens/FirstLogin/components/SignUpSuccess";
jest.mock("react-native-vector-icons/Entypo", () => "Entypo");
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<SignUpSuccess />).toJSON();

  expect(tree).toMatchSnapshot();
});
