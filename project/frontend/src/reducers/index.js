import auth from "./auth";
import { combineReducers } from 'redux';




const guruApp = combineReducers({auth});

export default guruApp;

//combines reduces into a single state and feeds it to the store
