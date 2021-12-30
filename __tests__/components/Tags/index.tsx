import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Tags from "../../../app/screens/FirstLogin/components/Interesting/Tags"
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


test("renders tags correctly", () => {
  const tree = renderer
    .create(
      <Tags
        setSelectedTopic={jest.fn}
        index={0}
        selectedTopic={["a"]}
        item={{ name: "a", tag: { uri: "https://dddd" } }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

