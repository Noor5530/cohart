/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'lib/createReducer';
import { SnackBar } from 'models/reducers/snackBar';
import * as types from 'store/actions/types';

import { EnableSnackBar } from '../../models/actions/snackBar';

const initialState: SnackBar = {
  isVisible: false,
  message: '',
};

const snackBarReducer = createReducer(initialState, {
  [types.ENABLE_SNACK_BAR](state: SnackBar, action: EnableSnackBar) {
    return { ...state, isVisible: true, message: action.data.message };
  },
  [types.DISABLE_SNACK_BAR](state: SnackBar) {
    return { ...state, isVisible: false, message: '' };
  },
});
export default snackBarReducer;
