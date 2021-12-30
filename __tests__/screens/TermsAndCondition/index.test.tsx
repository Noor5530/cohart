import "react-native";
import React from "react";
import TermsAndCondition from "../../../app/screens/TermsAndCondition";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<TermsAndCondition />).toJSON();

  expect(tree).toMatchSnapshot();
});
