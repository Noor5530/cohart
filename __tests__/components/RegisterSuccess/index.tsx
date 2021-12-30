import "react-native";
import React from "react";
import RegisterSuccess from "../../../app/screens/Register/components/RegisterSuccess";
import renderer from "react-test-renderer";

jest.useFakeTimers();

test("renders correctly", () => {
  const tree = renderer
    .create(<RegisterSuccess handleShowSocial={jest.fn} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
