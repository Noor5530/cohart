/**
 * @format
 */


 import 'react-native';
 import React from 'react'; 
 import About from '../../../app/screens/About';
 import renderer from 'react-test-renderer';

 jest.useFakeTimers()

 
 test('renders About component correctly', () => {
   const tree = renderer.create(<About />).toJSON();
   expect(tree).toMatchSnapshot();
 });
 