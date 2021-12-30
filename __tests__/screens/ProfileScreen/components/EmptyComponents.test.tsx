/**
 * @format
 */
import 'react-native';
import React from 'react';
import EmptyComponent from '../../../../app/screens/ProfileScreen/components/EmptyComponent';
// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';

jest.setTimeout(15000);

describe("group tesing goes here", () => {
  test('renders correctly', () => {
    const tree = render(<EmptyComponent heading={"abcd"} description={"sjbdjwef"} style={'styles'} />);
    expect(tree).toMatchSnapshot();
  });
})

