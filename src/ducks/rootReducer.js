import authReducer from "./authReducer";
import { combineReducers } from "redux";

//Sync Auth status from firebase
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
});

export default rootReducer;
