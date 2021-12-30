import "react-native";
import React from "react";
import Footer from "../../../app/screens/Welcome/components/Footer";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<Footer />).toJSON();

  expect(tree).toMatchSnapshot();
});
