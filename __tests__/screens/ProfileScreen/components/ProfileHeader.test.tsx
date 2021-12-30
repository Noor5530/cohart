import "react-native";
import React from "react";
import ProfileHeader from "../../../../app/screens/ProfileScreen/components/ProfileHeader";
import { render, fireEvent } from "@testing-library/react-native";


jest.useFakeTimers();

test("renders correctly", () => {
    const tree = render(<ProfileHeader />);
    expect(tree).toMatchSnapshot();

});
// test("pickAvatar function with api calling", () => {

//     const { getByTestId } = render(<ProfileHeader />);

//     const mockResponse: AxiosResponse = {
//         data: {
//             data:
//             {
//                 cover_image: "abcd",
//             },

//             // statusCode: 200,
//         },
//         status: 200,
//         statusText: "",
//         headers: undefined,
//         config: {},
//     };
//     const mockResponseForuploadAvatar = jest
//         .spyOn(uploadAvatar, "uploadAvatar")
//         .mockImplementation(() => Promise.resolve(mockResponse));
//     mockResponseForuploadAvatar.mockClear();

//     fireEvent.press(getByTestId("pickAvatar"));

//     expect(getByTestId("pickAvatar")).not.toBeNull();



// });

// test("error message", () => {
//     const { getByTestId } = render(<ProfileHeader />);
//     let openPickerMokeForError = jest.spyOn(ImagePicker, 'openPicker').mockImplementation(() => Promise.reject({ message: "User did not grant library permission." }))

//     fireEvent.press(getByTestId("pickAvatar"));
//     expect(getByTestId("pickAvatar")).not.toBeNull();
//     openPickerMokeForError.mockClear()
// });

// test("catch error ", () => {
//     const { getByTestId } = render(<ProfileHeader />);
//     let openPickerMokeForCatch = jest.spyOn(ImagePicker, 'openPicker').mockImplementation(() => new Error("User cancelled image selection."))

//     fireEvent.press(getByTestId("pickAvatar"));
//     expect(getByTestId("pickAvatar")).not.toBeNull();
//     openPickerMokeForCatch.mockClear()
// });
test("openTwitter function", () => {
    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" follower_count={isNaN} />);

    fireEvent.changeText(getByTestId("numFormat"));
    expect(getByTestId("numFormat")).not.toBeNull();
});
test("openTwitter function", () => {
    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" follower_count={10000} />);

    fireEvent.changeText(getByTestId("numFormat"));
    expect(getByTestId("numFormat")).not.toBeNull();
});
test("openTwitter function", () => {
    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" follower_count={1000000} />);

    fireEvent.changeText(getByTestId("numFormat"));
    expect(getByTestId("numFormat")).not.toBeNull();
});
test("openTwitter function", () => {
    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" />);

    fireEvent.press(getByTestId("openTwitter"));
    expect(getByTestId("openTwitter")).not.toBeNull();
});
test("openInstagram function", () => {
    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" />);

    fireEvent.press(getByTestId("openInstagram"));
    expect(getByTestId("openInstagram")).not.toBeNull();
});
test("openWeb function", () => {

    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" />);

    fireEvent.press(getByTestId("openWeb"));
    expect(getByTestId("openWeb")).not.toBeNull();
});
test("toggleQrModal function", () => {

    const { getByTestId } = render(<ProfileHeader website="website" twitter="twitter" instagram="instagram" />);

    fireEvent.press(getByTestId("onPressQr"));
    expect(getByTestId("onPressQr")).not.toBeNull();
});
