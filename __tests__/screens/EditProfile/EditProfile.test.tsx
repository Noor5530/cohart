import "react-native";
import React from "react";
import EditProfile from "../../../app/screens/EditProfile/EditProfile";
import renderer from "react-test-renderer";
import { render, fireEvent, act } from "@testing-library/react-native";
import * as reactRedux from 'react-redux';
import * as avatarService from "services/uploadAvatar";

jest.useFakeTimers();

jest.mock("react-redux", () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useRoute: jest.fn(),
  useSelector: jest.fn(),
}));



describe('Test Render Edit Profile', () => {
  let useSelectorMock: any;
  beforeEach(() => {
    useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockImplementation(() => {
      return {
        _id: 'user_id',
        cover_image: 'dummy_image'
      }
    })
  });

  test("renders snapshot correctly", () => {
    const tree = renderer.create(<EditProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should allow user upload the avatar success", async () => {

    await act( async () => {
      const tree = renderer.create(<EditProfile />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    const tree = render(<EditProfile />);

    jest.spyOn(avatarService, 'uploadAvatar').mockImplementation(() => Promise.resolve(
      {
        status: 200,
        data: {
          data: {
            cover_image: 'cover_image'
          }
        }
      }
        ));
    
    const uploadImageButton = tree.getByTestId("uploadAvatarBtnTestID");
    await act(async() => fireEvent.press(uploadImageButton))

    expect(tree).toMatchSnapshot();
  });

  test("should allow user upload the avatar failure", async () => {

    await act( async () => {
      const tree = renderer.create(<EditProfile />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    const tree = render(<EditProfile />);

    jest.spyOn(avatarService, 'uploadAvatar').mockImplementation(() => Promise.resolve(
      {
        status: 400,
        data: {
          data: 'Internal server error'
        }
      }
        ));
    
    const uploadImageButton = tree.getByTestId("uploadAvatarBtnTestID");
    await act(async() => fireEvent.press(uploadImageButton))

    expect(tree).toMatchSnapshot();
  });

  test("should allow to click on the QR code", async () => {

    await act( async () => {
      const tree = renderer.create(<EditProfile />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    const tree = render(<EditProfile />);

    
    const qrCodeButton = tree.getByTestId("qrButtonId");
    await act(async() => fireEvent.press(qrCodeButton))

    const qrCodeView = tree.getByTestId("QRCodeView");
    expect(qrCodeView).not.toBeNull();
    expect(tree).toMatchSnapshot();
  });
  test("should allow user to go back", async () => {

    await act( async () => {
      const tree = renderer.create(<EditProfile />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch'); 
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const tree = render(<EditProfile />);

    const gobackButton = tree.getByTestId("goBackButtonTestID");
    await act(async() => fireEvent.press(gobackButton))

    expect(tree).toMatchSnapshot();
  });
  afterEach(() => {
    jest.clearAllMocks()
  });
});

