import "react-native";
import React from "react";
import More from "../../../app/screens/EditProfile/components/More/More";
import renderer from "react-test-renderer";
// import { render, fireEvent } from "@testing-library/react-native";

jest.useFakeTimers();

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => ({
    user: {
      affiliations: [],
      referral_by: {
        cover_image: "hnnj",
      },
    },
  }),
}));

jest.mock("react-native-paper/src/components/ActivityIndicator", () => {
  return {
    __esModule: true,
    A: true,
    namedExport: jest.fn(),
    default: "mockedDefaultExport",
  };
});

test("renders correctly", () => {
  const tree = renderer
    .create(<More closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// test("test affiliation input", () => {
//   const { getAllByA11yLabel } = render(
//     <More closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />
//   );
//   const answerInputs = getAllByA11yLabel("Add another affiliation");
//   fireEvent.changeText(answerInputs[0], "affiliation1");

//   const expectNumberAffiliation = getAllByA11yLabel("Add another affiliation");

//   expect(expectNumberAffiliation.length).toEqual(2);
// });

// test("test meetMeAt input", () => {
//   const { getAllByA11yLabel } = render(
//     <More closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />
//   );
//   const answerInputs = getAllByA11yLabel("Add more entry");
//   fireEvent.changeText(answerInputs[0], "entry1");

//   const expectNumberOfEntry = getAllByA11yLabel("Add more entry");

//   expect(expectNumberOfEntry.length).toEqual(2);
// });

// test("remove affiliation", () => {
//   const { getAllByA11yLabel, getByTestId } = render(
//     <More closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />
//   );
//   const answerInputs = getAllByA11yLabel("Add another affiliation");
//   fireEvent.changeText(answerInputs[0], "affiliation1");

//   const expectNumberAffiliation = getAllByA11yLabel("Add another affiliation");
//   fireEvent.changeText(expectNumberAffiliation[1], "affiliation2");
//   const button = getByTestId(`removeAffiliation-1`);
//   fireEvent.press(button);

//   expect(expectNumberAffiliation.length).toEqual(2);
// });

// test("remove meetMeAt", () => {
//   const { getAllByA11yLabel, getByTestId } = render(
//     <More closeCollapsibleSection={jest.fn} setSubmitForm={jest.fn} />
//   );
//   const answerInputs = getAllByA11yLabel("Add more entry");
//   fireEvent.changeText(answerInputs[0], "entry1");

//   const expectNumberOfEntry = getAllByA11yLabel("Add more entry");
//   fireEvent.changeText(expectNumberOfEntry[1], "entry2");
//   const button = getByTestId(`removeEntry-1`);
//   fireEvent.press(button);

//   expect(expectNumberOfEntry.length).toEqual(2);
// });

