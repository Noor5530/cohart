/**
 * @format
 */



import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BottomTab from 'navigation/BottomTab';
import { render, fireEvent } from "@testing-library/react-native";
import RNPermission from "react-native-permissions";
jest.useFakeTimers();





test("render correctly bottom tab", () => {
  const mockState = { 
    index: 1,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'Profile': {},
    'Menu': {},
  };
  let component = renderer.create(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("onPress Discover Navigation", () => {
  const mockState = { 
    index: 0,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'Profile': {},
    'Menu': {},
  };
  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockDiscoverNav = bottomTabScreen.getByTestId("DiscoverNav");
  fireEvent.press(mockDiscoverNav);


});

test("onPress Community Navigation", () => {
  const mockState = { 
    index: 1,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'Profile': {},
    'Menu': {},
  };
  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockCommunityNav = bottomTabScreen.getByTestId("CommunityNav");
  fireEvent.press(mockCommunityNav);


});
test("onPress Profile Navigation", () => {
  const mockState = { 
    index: 1,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'Profile': {},
    'Menu': {},
  };
  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockProfileNav = bottomTabScreen.getByTestId("ProfileNav");
  fireEvent.press(mockProfileNav);
});
test("onPress Menu Navigation", () => {
  const mockState = { 
    index: 3,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'Profile': {},
    'Menu': {},
  };
  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockMenuNav = bottomTabScreen.getByTestId("MenuNav");
  fireEvent.press(mockMenuNav);


});

test("onPress permissionCheck Navigation", () => {
  const mockState = { 
    index: 1,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  const descriptors = {
    'Discover': {},
    'Community': {},
    'AddArtworks': {},
    'Profile': {},
    'Menu': {},
  };

  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockPermissionCheck = bottomTabScreen.getByTestId("permissionCheck");
  fireEvent.press(mockPermissionCheck);


});

test("onPress permissionCheck with limted Navigation", () => {
  const mockState = { 
    index: 1,
    routes: [
      {
        key: 'Discover'
      },
      {
        key: 'Community'
      },
      {
        key: 'Profile'
      },
      {
        key: 'Menu'
      },
    ]
  };
  const mockNavigate = { navigate: () => jest.fn() }
  jest.spyOn(RNPermission, 'check')
    .mockImplementation(() => Promise.resolve({ result: "limited" }));

  const descriptors = {
      'Discover': {},
      'Community': {},
      'AddArtworks': {},
      'Profile': {},
      'Menu': {},
    };

  let bottomTabScreen = render(<BottomTab descriptors={descriptors} navigation={mockNavigate} state={mockState} />);

  const mockPermissionCheck = bottomTabScreen.getByTestId("permissionCheck");
  fireEvent.press(mockPermissionCheck);

  jest.clearAllMocks()
});


