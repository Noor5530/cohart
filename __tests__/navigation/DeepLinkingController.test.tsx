/**
 * @format
 */


 
import 'react-native';
import React from 'react'; 
import renderer from 'react-test-renderer';
import branch, {  } from 'react-native-branch';
import { render } from "@testing-library/react-native";
import * as navigationActions from 'store/actions/navigationActions';

import DeepLinkingController, { IDeepLinkingControllerProps } from 'navigation/DeepLinkingController';

 jest.useFakeTimers();

 
 test('renders DeepLinkingController component correctly and deeplink branch sdk should be subscribe', () => {
   const props: IDeepLinkingControllerProps = {
      isFirstTimeLogin: false,
      userId: '123',
      isLoggedIn: true,
      onProcessDeeplink: () => {}
    };
   const tree = renderer.create(<DeepLinkingController {...props} />).toJSON();
   expect(tree).toMatchSnapshot();

   expect(branch.subscribe).toBeCalled();

 });

 test('Should do nothing when post id is not recognized', () => {
  const props: IDeepLinkingControllerProps = {
     isFirstTimeLogin: false,
     userId: '123',
     isLoggedIn: true,
     onProcessDeeplink: jest.fn()
   };
    const tree = render(<DeepLinkingController {...props} />);
    const instance = tree.UNSAFE_getByType(DeepLinkingController).instance;
    
    const callbackParamsWithDeepLink = {
      error: null,
      params: {
        postId: null
      }
    }
    instance.onHandleDeepLink(callbackParamsWithDeepLink);
    expect(props.onProcessDeeplink).not.toBeCalled();

});

test('Should do nothing when receive the error with deeplink', () => {
  const props: IDeepLinkingControllerProps = {
     isFirstTimeLogin: false,
     userId: '123',
     isLoggedIn: true,
     onProcessDeeplink: jest.fn()
   };
    const tree = render(<DeepLinkingController {...props} />);
    const instance = tree.UNSAFE_getByType(DeepLinkingController).instance;
    
    const callbackParamsWithDeepLink = {
      error: 'ErrorDeeplink-URI is not valid',
      params: {
        postId: null
      }
    }
    instance.onHandleDeepLink(callbackParamsWithDeepLink);
    expect(props.onProcessDeeplink).not.toBeCalled();

});

test('Should navigate to welcome page if user is not login yet', () => {
  const props: IDeepLinkingControllerProps = {
     isFirstTimeLogin: false,
     userId: '123',
     isLoggedIn: false,
     onProcessDeeplink: jest.fn()
   };
    const tree = render(<DeepLinkingController {...props} />);
    const instance = tree.UNSAFE_getByType(DeepLinkingController).instance;
    
    const callbackParamsWithDeepLink = {
      error: null,
      params: {
        postId: 'post_id_valid'
      }
    };

    jest.spyOn(navigationActions, 'navigateToWelcome')
      .mockImplementation(() => {});

    instance.onHandleDeepLink(callbackParamsWithDeepLink);
    expect(props.onProcessDeeplink).toBeCalled();
    expect(navigationActions.navigateToWelcome).toBeCalledWith({ postId: callbackParamsWithDeepLink.params.postId })

});

test('Should navigate to discover page if user is login ', () => {
  const props: IDeepLinkingControllerProps = {
     isFirstTimeLogin: false,
     userId: '123',
     isLoggedIn: true,
     onProcessDeeplink: jest.fn()
   };
    const tree = render(<DeepLinkingController {...props} />);
    const instance = tree.UNSAFE_getByType(DeepLinkingController).instance;
    
    const callbackParamsWithDeepLink = {
      error: null,
      params: {
        postId: 'post_id_valid'
      }
    };

    jest.spyOn(navigationActions, 'navigateToDiscover')
      .mockImplementation(() => {});

    instance.onHandleDeepLink(callbackParamsWithDeepLink);
    expect(props.onProcessDeeplink).toBeCalled();
    expect(navigationActions.navigateToDiscover).toBeCalledWith({ postId: callbackParamsWithDeepLink.params.postId })

});

 
 