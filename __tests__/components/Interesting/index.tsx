import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Interesting from "../../../app/screens/FirstLogin/components/Interesting";
jest.useFakeTimers();

jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({
      user: {
        interests: []
    },
    }),
  }));

  jest.mock("react-native-paper/src/components/Snackbar", () => "Snackbar");
  jest.mock("react-native-paper/src/components/Button", () => "Button");
test("renders correctly", () => {
  const tree = renderer.create(<Interesting onPressButton={jest.fn}/>).toJSON();

  expect(tree).toMatchSnapshot();
});


