import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import MakeConnection from "../../../app/screens/FirstLogin/components/MakeConnection";
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<MakeConnection onPressButton={jest.fn}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
