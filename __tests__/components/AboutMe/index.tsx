import "react-native";
import React from "react";
import AboutMe from "../../../app/screens/EditProfile/components/AboutMe/AboutMe";
import renderer from "react-test-renderer";

jest.useFakeTimers();
jest.mock('rn-fetch-blob', () => ({}))

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => ({
    user: {
      affiliations: [],
      bio: "test",
      referral_by: {
        cover_image: "hnnj",
      },
    },
  }),
}));

test("renders correctly", () => {
  const tree = renderer
    .create(<AboutMe closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
