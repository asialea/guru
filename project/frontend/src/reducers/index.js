import auth from "./auth";
import { combineReducers } from 'redux';
// import work from "./work";
// import education from "./education"
import aboutUser from "./aboutUser"
// import skills from "./skills"
// import interests from "./interests"

const appReducer = combineReducers({auth,aboutUser});

const guruApp = (state, action) => {

  return appReducer(state, action)
}


// const guruApp = combineReducers({auth,work,education,aboutUser,skills,interests});

export default guruApp;

//combines reduces into a single state and feeds it to the store
// THE EXISITING REDUCERS ARE MOST LIKELY UNECESSARY AND CAN DELETE, ALSO CAN DELETE THE UNUSED URLS FOR ANYTHINH
//THAT IS NOT ABOUT USER OR USER
