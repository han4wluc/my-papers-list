
const initialState = {
  isLoading: true,
  paper: {
    title: 'Generative',
    abstract: 'summary summary',
  },
  readStatus: 'not_read',
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
