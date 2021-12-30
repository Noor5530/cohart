import "react-native";
import React from "react";
import ReferFriend from "../../../app/screens/ReferFriend";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

test("render correctly referFriends", () => {
  let component = renderer.create(<ReferFriend />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("run email flow  referFriends", () => {

  let instanceScreen = render(<ReferFriend />);
  const firstFlow = instanceScreen.getByTestId("clickOnPhone");
  fireEvent.press(firstFlow);

  instanceScreen = render(<ReferFriend />);
  const secondFLow = instanceScreen.getByTestId("clickOnEmail");

  fireEvent.press(secondFLow);

  expect(firstFlow).not.toBeNull();
});
test("run phone flow referFriends", () => {
  let instanceScreen = render(<ReferFriend />);
  const secondFLow = instanceScreen.getByTestId("clickOnEmail");

  fireEvent.press(secondFLow);
  expect(secondFLow).not.toBeNull();
});
