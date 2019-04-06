import auth from "./auth";
import { combineReducers } from 'redux';
import user from "./user";


const guruApp = combineReducers({auth,user});

export default guruApp;

//combines reduces into a single state and feeds it to the store
