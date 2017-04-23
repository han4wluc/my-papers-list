
const initialState = {
  isLoading: false,
  paper: {
    title: 'Generative',
    abstract: 'summary summary',
  },
  readStatus: undefined,
};

export default function moduleName(state = initialState, action = {}){

  if(action.type === 'DETAIL_SET_STATE'){
    return {
      ...state,
      ...action.props,
    };
  }

  if(action.type === 'DETAIL_RESET_TO_INITIAL_STATE'){
    return initialState;
  }

  return state;
}
