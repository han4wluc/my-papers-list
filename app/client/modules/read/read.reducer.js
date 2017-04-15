
const initialState = {
  papers: [{
    title: 'Hello',
    summary: 'abstract abstract'
  },{
    title: 'Title',
    summary: 'abstract abstract'
  }],
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
