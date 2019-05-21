const initialState = [];


export default function education(state=initialState, action) {
  let educationList = state.slice();

  switch (action.type) {

    case 'FETCH_EDUCATION':
      return[...state,...action.education];

    case 'ADD_EDUCATION':
      return[...state, action.edu_obj];

    case 'DELETE_EDUCATION':
      educationList.splice(action.id,1);
      return educationList;

    default:
      return state;

  }
}
