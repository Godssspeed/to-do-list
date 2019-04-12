import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "../config/fbConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase }),
      promiseMiddleware
    ),
    reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
  )
);

export default store;
