import 'react-native';
import React from 'react'; 
import ChangeNumber from '../../../app/screens/ChangeNumber';
import renderer from 'react-test-renderer';

jest.useFakeTimers()

test('renders correctly', () => {

    const tree = renderer.create(
        <ChangeNumber />
    ).toJSON();

    expect(tree).toMatchSnapshot();

});
