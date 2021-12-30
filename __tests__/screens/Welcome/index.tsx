import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import WelcomePage from "../../../app/screens/Welcome";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<WelcomePage />).toJSON();

  expect(tree).toMatchSnapshot();
});
