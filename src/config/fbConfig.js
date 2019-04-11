import firebase from "firebase/app";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAhXNv7lGTHYeb7QDOcbnHU3SO3QvYAyu4",
  authDomain: "to-do-list-5e3a0.firebaseapp.com",
  databaseURL: "https://to-do-list-5e3a0.firebaseio.com",
  projectId: "to-do-list-5e3a0",
  storageBucket: "to-do-list-5e3a0.appspot.com",
  messagingSenderId: "1046021100065"
};
firebase.initializeApp(config);

export default firebase;
