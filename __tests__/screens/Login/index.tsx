import 'react-native';
import React from 'react'; 
import Login from '../../../app/screens/Login';
import renderer from 'react-test-renderer';

jest.useFakeTimers()

test('renders correctly', () => {

    const tree = renderer.create(<Login />).toJSON();

    expect(tree).toMatchSnapshot();

});
