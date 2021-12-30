import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ProfileImages from "../../../../app/screens/ProfileScreen/components/ProfileImages";

jest.useFakeTimers();

test("renders correctly", () => {
    let mockResponse = ["abcd"]
    const tree = renderer.create(<ProfileImages featureImages={mockResponse} />).toJSON();

    expect(tree).toMatchSnapshot();

});
