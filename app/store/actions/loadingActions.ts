/*
 * Reducer actions related with login
 */
import { LoadingState } from 'models/actions/loading';

import * as types from './types';

export function enableLoading(): LoadingState {
  return {
    type: types.ENABLE_LOADER,
  };
}

export function disableLoading(): LoadingState {
  return {
    type: types.DISABLE_LOADER,
  };
}

export function enableAppLoading(): LoadingState {
  return {
    type: types.ENABLE_APP_LOADER,
  };
}

export function disableAppLoading(): LoadingState {
  return {
    type: types.DISABLE_APP_LOADER,
  };
}
