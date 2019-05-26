import auth from "./auth";
import { combineReducers } from 'redux';


const appReducer = combineReducers({auth});

const guruApp = (state, action) => {

  return appReducer(state, action)
}


// const guruApp = combineReducers({auth,work,education,aboutUser,skills,interests});

export default guruApp;

//combines reduces into a single state and feeds it to the store
// THE EXISITING REDUCERS ARE MOST LIKELY UNECESSARY AND CAN DELETE, ALSO CAN DELETE THE UNUSED URLS FOR ANYTHINH
//THAT IS NOT ABOUT USER OR USER
