import 'react-native';
import React from 'react'; 
import CohartLoginCode from '../../../app/screens/CohartLoginCode';
import renderer from 'react-test-renderer';

jest.useFakeTimers()

test('renders correctly', () => {

    const tree = renderer.create(<CohartLoginCode />).toJSON();

    expect(tree).toMatchSnapshot();

});
