import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import FansScreen from 'screens/FansScreen';

jest.useFakeTimers()

test('renders correctly', () => {

    const tree = renderer.create(<FansScreen />).toJSON();

    expect(tree).toMatchSnapshot();

});
