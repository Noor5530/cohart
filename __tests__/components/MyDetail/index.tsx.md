// import "react-native";
// import React from "react";
// import MyDetail from "../../../app/screens/EditProfile/components/MyDetails/MyDetails";
// import { render, fireEvent } from "@testing-library/react-native";

// jest.useFakeTimers();

// jest.mock("react-redux", () => ({
// useDispatch: () => {},
// useSelector: () => ({
// user: {
// affiliations: [],
// referral_by: {
// cover_image: "hnnj",
// },
// },
// }),
// }));

// jest.mock("react-native-paper/src/components/ActivityIndicator", () => {
// return {
// \_\_esModule: true,
// A: true,
// namedExport: jest.fn(),
// default: "mockedDefaultExport",
// };
// });

// describe("test validation form", () => {
// describe("first name input", () => {
// it("should show require message when empty first name", () => {
// const {getByTestId} = render(<MyDetail closeCollapsibleSection={jest.fn()} setSubmitForm={jest.fn}/>)
// const submitButton = getByTestId('submitBtn')
// fireEvent.press(submitButton)

        // expect(getByTestId('firstNameRequire')).not.toBeNull()

// });
// });
// });
