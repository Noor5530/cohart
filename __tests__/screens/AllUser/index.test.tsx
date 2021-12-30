import 'react-native';
import React from 'react'; 
import AllUser from '../../../app/screens/AllUser';
import renderer from 'react-test-renderer';

jest.useFakeTimers()
jest.mock('axios')



test('renders correctly', () => {

  const toggleButtonSheet = jest.fn();
  const bottomSheetRef = {
      current: {
          snapTo: jest.fn()
      }
  };

  const tree = renderer.create(<AllUser 
    toggleButtonSheet={toggleButtonSheet}
    bottomSheetRef={bottomSheetRef} 
    isVisible={true}
    
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

