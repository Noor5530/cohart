import "react-native";
import React from "react";

import PhoneEmailRefer from "../../../../app/screens/ReferFriend/components/PhoneRefer";
import renderer from "react-test-renderer";
jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer
    .create(<PhoneEmailRefer setReferState={()=>{}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
