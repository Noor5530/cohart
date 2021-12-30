import "react-native";
import React from "react";
import PhoneEmailRefer from "../../../../app/screens/ReferFriend/components/PhoneEmailRefer";
import renderer from "react-test-renderer";
import { render, fireEvent, act } from "@testing-library/react-native";
import * as referralAPI from "services/sendReferral";
import { AxiosResponse } from "axios";
import * as redux from "react-redux";

jest.useFakeTimers();



test("renders phone email correctly", () => {
  const tree = renderer
    .create(<PhoneEmailRefer setReferState={() => { }} />).toJSON()

    expect(tree).toMatchSnapshot();
});


test("simulate the phone button is pressed", () => {
  const tree = renderer
    .create(<PhoneEmailRefer setReferState={() => { }} />).toJSON()
    expect(tree).toMatchSnapshot();

    let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
    const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
    fireEvent.changeText(phoneTextInput, "+84123232322")

    const emailTextField = instanceScreen.getByTestId("emailAddress");
    fireEvent.changeText(emailTextField, "steve.job@gmail.com")

    const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
    fireEvent.press(inviteFriendBtn)
});

test("should invite friend success when api call return success", async () => {

  await act( async () => {
    const tree = renderer.create(<PhoneEmailRefer setReferState={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  const mockResponse: AxiosResponse = {
    data: {
      statusCode: 200
    },
    status: 0,
    statusText: "",
    headers: undefined,
    config: null,
  }
  const mockReferral = jest.spyOn(referralAPI, 'sentReferral')
      .mockImplementation(() => Promise.resolve(mockResponse));

  let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
  const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
  await act(async() => {
    fireEvent.changeText(phoneTextInput, "+84123232322");
  })
  

  const emailTextField = instanceScreen.getByTestId("emailAddress");
  await act(async() => {
    fireEvent.changeText(emailTextField, "steve.job@gmail.com")
  })
  

  const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
  // fireEvent.press(inviteFriendBtn)
  await act(async() => {
    fireEvent.press(inviteFriendBtn)
  })

  expect(referralAPI.sentReferral).toBeCalled()
  await act(async() => {
    fireEvent.press(inviteFriendBtn)
  })

  mockReferral.mockClear(); 
});


test("should invite friend failure and show error message when api call return failure", async () => {
  await act( async () => {
    const tree = renderer.create(<PhoneEmailRefer setReferState={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    const mockResponse: AxiosResponse = {
      data: {
        statusCode: 400,
        message: 'Internal server error'
      },
      status: 0,
      statusText: "",
      headers: undefined,
      config: null,
    }
    const mockReferral = jest.spyOn(referralAPI, 'sentReferral')
        .mockImplementation(() => Promise.resolve(mockResponse));

    let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
    const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
    await act(async() => {
      fireEvent.changeText(phoneTextInput, "+84123232322");
    })
    

    const emailTextField = instanceScreen.getByTestId("emailAddress");
    await act(async() => {
      fireEvent.changeText(emailTextField, "steve.job@gmail.com");
    })
    

    const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
    await act(async() => {
      fireEvent.press(inviteFriendBtn);
    })

    expect(referralAPI.sentReferral).toBeCalled();

    mockReferral.mockClear();
});

test("should invite friend failure and show error message when api call return exception", async () => {
  await act( async () => {
    const tree = renderer.create(<PhoneEmailRefer setReferState={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    const mockResponse: AxiosResponse = {
      data: {
        statusCode: 500,
        message: 'Internal server error'
      },
      status: 0,
      statusText: "",
      headers: undefined,
      config: null,
    }

    const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
            const mockDispatchFn = jest.fn()
            useDispatchSpy.mockReturnValue(mockDispatchFn);
    const mockReferral = jest.spyOn(referralAPI, 'sentReferral')
        .mockRejectedValue(() => Promise.reject(mockResponse));

    let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
    const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
    await act(async() => {
      fireEvent.changeText(phoneTextInput, "+84123232322");
    })
    

    const emailTextField = instanceScreen.getByTestId("emailAddress");
    await act(async() => {
      fireEvent.changeText(emailTextField, "steve.job@gmail.com");
    })
    

    const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
    await act(async() => {
      fireEvent.press(inviteFriendBtn);
    })

    expect(referralAPI.sentReferral).toBeCalled();

    mockReferral.mockClear();
});

test("should check if input invalid email", async () => {
  await act( async () => {
    const tree = renderer.create(<PhoneEmailRefer setReferState={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
    const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
    await act(async() => {
      fireEvent.changeText(phoneTextInput, "+84123232322")
    })

    const emailTextField = instanceScreen.getByTestId("emailAddress");
    await act(async() => {
      fireEvent.changeText(emailTextField, "steve.job")
    })

    const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
    await act(async() => {
      fireEvent.press(inviteFriendBtn)
    })

    const errorMessage = instanceScreen.getByTestId("errorMessageEmail");
    expect(errorMessage).not.toBeNull();

});


test("should check if input invalid phone number", async () => {
  await act( async () => {
    const tree = renderer.create(<PhoneEmailRefer setReferState={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

    let instanceScreen = render(<PhoneEmailRefer setReferState={() => { }}/>)
    const phoneTextInput = instanceScreen.getByTestId("phoneInputText");
    await act(async() => {
      fireEvent.changeText(phoneTextInput, "+asdasdsa")
    })

    const emailTextField = instanceScreen.getByTestId("emailAddress");
    await act(async() => {
      fireEvent.changeText(emailTextField, "steve.job@gmail.com")
    })

    const inviteFriendBtn = instanceScreen.getByTestId('InviteFriendButton')
    await act(async() => {
      fireEvent.press(inviteFriendBtn)
    })

    const errorMessage = instanceScreen.getByTestId("errorMessagePhoneNumber");
    expect(errorMessage).not.toBeNull();
});
