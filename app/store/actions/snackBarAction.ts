/*
 * Reducer actions related with login
 */
import { DisableSnackBar, EnableSnackBar } from 'models/actions/snackBar';

import * as types from './types';

export function enableSnackBar(
  message = 'Something went wrong',
): EnableSnackBar {
  return {
    type: types.ENABLE_SNACK_BAR,
    data: {
      message: message,
    },
  };
}

export function disableSnackBar(): DisableSnackBar {
  return {
    type: types.DISABLE_SNACK_BAR,
  };
}
