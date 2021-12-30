import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import FirstLogin from "../../../app/screens/FirstLogin";
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo')
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<FirstLogin />).toJSON();

  expect(tree).toMatchSnapshot();
});
