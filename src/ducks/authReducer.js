import axios from "axios";

const initialState = {
  authError: null,
  user: [],
  lists: [],
  listDetails: {}
};

const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const CREATE_LIST = "CREATE_LIST";
const GET_LIST = "GET_LIST";
const DELETE_ITEMS = "DELETE_ITEMS";
const DELETE_TITLE = "DELETE_TITLE";

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
      .then(response => {
        dispatch({
          type: `${LOGIN}_SUCCESS`,
          payload: axios.post("/auth/login", { uid: response.user.uid })
        });
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
        dispatch({
          type: `${LOGOUT}_SUCCESS`,
          payload: axios.post("/auth/logout")
        });
      });
  };
};

export const createList = (title, listItem) => {
  const items = listItem.toString();
  console.log(items);
  return {
    type: `${CREATE_LIST}_SUCCESS`,
    payload: axios.post("/create/list", { title, items })
  };
};

export const deleteItems = list_id => {
  return {
    type: `${DELETE_ITEMS}_SUCCESS`,
    payload: axios.delete(`/delete/listitems/${list_id}`)
  };
};

export const deleteTitle = id => {
  return {
    type: `${DELETE_TITLE}_SUCCESS`,
    payload: axios.delete(`/delete/listtitle/${id}`)
  };
};

// export const getLists = () => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: `${GET_LIST}_SUCCESS`,
//       payload: axios.get("/user/lists")
//     });
//   };
// };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNUP}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${SIGNUP}_SUCCESS`:
      return { ...state, authError: null };
    case `${LOGIN}_ERROR`:
      return { ...state, authError: action.err.message };
    case `${LOGIN}_SUCCESS_FULFILLED`:
      console.log(action.payload);
      return { ...state, user: action.payload.data, authError: null };
    case `${LOGOUT}_SUCCESS`:
      return { ...state, user: null };
    case `${CREATE_LIST}_SUCCESS`:
      return { ...state };
    case `${DELETE_ITEMS}_SUCCESS`:
      return { ...state };
    case `${DELETE_TITLE}_SUCCESS`:
      return { ...state };
    // case `${GET_LIST}_SUCCESS_FULFILLED`:
    //   console.log(action.payload);
    //   return { ...state, lists: action.payload.data };
    default:
      return state;
  }
};

export default authReducer;
