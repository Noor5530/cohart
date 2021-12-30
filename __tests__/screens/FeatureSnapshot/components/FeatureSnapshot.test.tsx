import "react-native";
import React from "react";
import FeatureSnapshot from "../../../../app/screens/FeatureSnapshot/components/FeatureSnapshot";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<FeatureSnapshot item={null} />).toJSON();

  expect(tree).toMatchSnapshot();
});
test("renders correctly", () => {
  const { getByTestId } = render(<FeatureSnapshot item={null} />);

  fireEvent.press(getByTestId("featureSnapShots"));
  expect(getByTestId("featureSnapShots")).not.toBeNull();
});
