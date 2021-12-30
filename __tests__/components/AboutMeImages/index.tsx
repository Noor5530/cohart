import "react-native";
import React from "react";
import AboutMeImages from "../../../app/screens/EditProfile/components/AboutMe/components/AboutMeImages";
import renderer from "react-test-renderer";

jest.useFakeTimers();
jest.mock("rn-fetch-blob", () => ({}));

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
    .create(
      <AboutMeImages
        image1={""}
        image2={""}
        image3={""}
        image4={""}
        image5={""}
        image6={""}
        pickImages={jest.fn}
        imageLoading={[]}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
