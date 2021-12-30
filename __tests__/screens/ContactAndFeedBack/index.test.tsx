import "react-native";
import React from "react";
import ContactAndFeedBack from "../../../app/screens/ContactAndFeedBack";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import * as client from "../../../app/services/client";

jest.useFakeTimers();

test("renders correctly Contact and feedBack Screen", () => {
  const tree = renderer.create(<ContactAndFeedBack />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly Contact and feedBack Screen", () => {
  let { getByTestId } = render(<ContactAndFeedBack />);

  fireEvent.press(getByTestId("sendEmail"));
  fireEvent.changeText(getByTestId("name"), "dev");
  fireEvent.changeText(getByTestId("email"), "dev@gmail.com");
  fireEvent.changeText(getByTestId("report"), "hi ");
  fireEvent.press(getByTestId("sendEmail"));
  let secondEvent = jest
    .spyOn(client.apiClient, "post")
    .mockImplementation(() => Promise.resolve({ data: { statusCode: 400 } }));
  fireEvent.press(getByTestId("sendEmail"));

  secondEvent.mockClear();

  let thirdEvent = jest
    .spyOn(client.apiClient, "post")
    .mockImplementation(() => Promise.reject());
  fireEvent.press(getByTestId("sendEmail"));

  thirdEvent.mockClear();
});


// test("render Correctly  - should  disable loading and on 401", async () => {


//   let error = { response: { status: 401 } };

//   expect(throw(error).value).toEqual(
//       put(userActions.logOutRequest(LogOutRequestEnum.tokenExpire))
//   );
// });