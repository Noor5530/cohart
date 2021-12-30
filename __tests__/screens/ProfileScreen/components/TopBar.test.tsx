// import "@testing-library/jest-native/extend-expect";

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import TopBar from "../../../../app/screens/ProfileScreen/components/TopBar";
import { render } from "@testing-library/react-native";

jest.useFakeTimers();

test("renders correctly", () => {
    const tree = renderer.create(<TopBar />).toJSON();
    expect(tree).toMatchSnapshot();

});

test("onTopBar function", () => {
    let mockTabs = ["About", "Snapshots", "Portfolio"]
    render(<TopBar tabs={mockTabs} index={0} onChangeTab={(index) => { index }} />);
});

test("onTopBar function", () => {
  let mockTabs = ["About", "Snapshots", "Portfolio"];
  render(
    <TopBar
      tabs={mockTabs}
      index={1}
      onChangeTab={(index) => {
        index;
      }}
    />
  );
});



