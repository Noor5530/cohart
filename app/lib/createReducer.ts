export default function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: any) {
    // eslint-disable-next-line no-prototype-builtins
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
