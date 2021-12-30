import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import QrModel from "../../../../app/screens/ProfileScreen/components/QrModel";
import { render, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

test("renders correctly", () => {
    let mockToggle = () => { }
    const tree = renderer.create(<QrModel toggleModal={mockToggle} isVisible={true} />).toJSON();

    expect(tree).toMatchSnapshot();
});

test("onToggle function", () => {
    let mockToggle = () => { }
    const { getByTestId } = render(<QrModel toggleModal={mockToggle} isVisible={true} />);

    fireEvent.press(getByTestId("toggleModel"));
    expect(getByTestId("toggleModel")).not.toBeNull();
});