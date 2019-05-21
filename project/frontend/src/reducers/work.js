const initialState = [];


export default function work(state=initialState, action) {
  let workList = state.slice();

  switch (action.type) {
    
    case 'FETCH_WORK':
      return[...state,...action.work];

    case 'ADD_WORK':
      return[...state, action.work_obj];

    case 'DELETE_WORK':
      workList.splice(action.id,1);
      return workList;

    default:
      return state;

  }
}
