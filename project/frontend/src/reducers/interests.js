const initialState = [];


export default function interests(state=initialState, action) {
  let interestList = state.slice();

  switch (action.type) {
    case 'FETCH_INTERESTS':
      return[...state,...action.interests];

    case 'ADD_INTEREST':
      return[...state, action.interest];

    case 'DELETE_SKILL':
      interestList.splice(action.id,1);
      return interestList;

    default:
      return state;

  }
}
