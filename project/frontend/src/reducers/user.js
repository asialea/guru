const initialState = [];


export default function user(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true};



    default:
      return state;
  }
}
