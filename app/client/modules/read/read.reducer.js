
const initialState = {
  read: [],
  readStatus: undefined,
  isLoading: true,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'READ_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'READ_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
