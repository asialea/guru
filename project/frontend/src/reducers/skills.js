const initialState = [];


export default function skills(state=initialState, action) {
  let skillList = state.slice();

  switch (action.type) {
    case 'FETCH_SKILLS':
      return[...state,...action.skills];

    case 'ADD_SKILL':
      return[...state, action.skill];

    case 'DELETE_SKILL':
      skillList.splice(action.id,1);
      return skillList;

    default:
      return state;

  }
}
