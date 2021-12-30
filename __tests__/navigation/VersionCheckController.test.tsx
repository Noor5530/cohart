/**
 * @format
 */


 
 import 'react-native';
 import React from 'react'; 
 import renderer from 'react-test-renderer';
 import VersionCheckController from 'navigation/VersionCheckController';
 import VersionCheck from 'react-native-version-check';
 import { render } from "@testing-library/react-native";
import { Linking } from 'react-native';

 
  jest.useFakeTimers();
 
  
  test('Should automaticall check version with version controller is executed in the app', () => {

    const tree = renderer.create(<VersionCheckController />).toJSON();
    expect(tree).toMatchSnapshot();
 
  });

  test('Should prompt the user popup to require user update if there is new version in the appstore',async () => {


    jest.spyOn(VersionCheck, 'getLatestVersion')
      .mockImplementation(() => {
        return "'1.1.13"
      });

      jest.spyOn(VersionCheck, 'getCurrentVersion')
      .mockImplementation(() => {
        return "'1.1.12"
      });
 
      const wrapper = render(<VersionCheckController />);
      
      expect(wrapper.queryAllByTestId("ModalRequireVersionUpdate")).not.toBeNull();
      expect(wrapper).toMatchSnapshot();
  });

  test('Should prompt the user popup to require user update if there is new version in the appstore', () => {


    jest.spyOn(VersionCheck, 'getLatestVersion')
      .mockImplementation(() => {
        return "'1.1.13"
      });

      jest.spyOn(VersionCheck, 'getCurrentVersion')
      .mockImplementation(() => {
        return "'1.1.13"
      });
 
      const wrapper = render(<VersionCheckController />);

      expect(wrapper.queryAllByTestId("ModalRequireVersionUpdate")).toEqual([]);
      expect(wrapper.queryAllByTestId("VersionIsUpdated")).not.toBeNull();
  });

  test('Should navigate user to appstore once version need to be upgraded', () => {

    jest.spyOn(VersionCheck, 'getLatestVersion')
      .mockImplementation(() => {
        return "'1.1.13"
      });

      jest.spyOn(VersionCheck, 'getCurrentVersion')
      .mockImplementation(() => {
        return "'1.1.12"
      });
 
      const wrapper = render(<VersionCheckController />);

      expect(wrapper.queryAllByTestId("ModalRequireVersionUpdate")).not.toBeNull();
      const instance = wrapper.UNSAFE_getByType(VersionCheckController).instance;
      instance.onUpdateNewVersionInStore();

      expect(Linking.openURL).toBeCalledWith("https://apps.apple.com/us/app/cohart/id1554034352");
  });

  test('Should not open the URL link once call linking URL is failing ', () => {

    jest.spyOn(VersionCheck, 'getLatestVersion')
      .mockRejectedValue(() => {
        return undefined
      });

      jest.spyOn(VersionCheck, 'getCurrentVersion')
      .mockRejectedValue(() => {
        return undefined
      });
 
      const wrapper = render(<VersionCheckController />);

      expect(wrapper.queryAllByTestId("ModalRequireVersionUpdate")).toEqual([]);
  });