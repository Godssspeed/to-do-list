import axios from "axios";

const initialState = {
  authError: null,
  user: []
};

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        axios.post("/auth/register", {
          uid: response.user.uid,
          username: newUser.username
        });
      })
      .then(() => {
        dispatch({ type: `${SIGNUP}_SUCCESS` });
      })
      .catch(err => {
        dispatch({ type: `${SIGNUP}_ERROR`, err });
      });
  };
};

export const login = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: `${LOGIN}_SUCCES` });
      })
      .catch(err => {
        dispatch({ type: `${LOGIN}_ERROR`, err });
      });
  };
};

export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: `${LOGOUT}_SUCCESS` });
      });
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNUP}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${SIGNUP}_SUCCESS`:
      return { ...state, authError: null };
    case `${LOGIN}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${LOGIN}_SUCCESS`:
      return { ...state, authError: null };
    case `${LOGOUT}_SUCCESS`:
      return state;
    default:
      return state;
  }
};

export default authReducer;
