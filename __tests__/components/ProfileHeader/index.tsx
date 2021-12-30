import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {Text} from "react-native"

import ProfileHeader from "../../../app/screens/FirstLogin/components/ProfileHeader";
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer.create(<ProfileHeader heading="heading" description="description"/>).toJSON();

  expect(tree).toMatchSnapshot();
});

test("renders correctly when use props renderDescription", () => {
    const tree = renderer.create(<ProfileHeader heading="heading" renderDescription={(<Text>description 1</Text>)} description="description"/>).toJSON();
  
    expect(tree).toMatchSnapshot();
  });
  
