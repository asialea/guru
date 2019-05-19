import auth from "./auth";
import { combineReducers } from 'redux';
import work from "./work";
import education from "./education"
import aboutUser from "./aboutUser"
import skills from "./skills"
import interests from "./interests"

const guruApp = combineReducers({auth,work,education,aboutUser,skills,interests});

export default guruApp;

//combines reduces into a single state and feeds it to the store
