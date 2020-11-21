import firebase from "firebase";
import {firestore} from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCPYWp-1WXnIylCnd4nc9kSEndtDVM8wB4",
    authDomain: "qikchat-messenger.firebaseapp.com",
    databaseURL: "https://qikchat-messenger.firebaseio.com",
    projectId: "qikchat-messenger",
    storageBucket: "qikchat-messenger.appspot.com",
    messagingSenderId: "196321936161",
    appId: "1:196321936161:web:996aff6b13afff9aeb3460",
    measurementId: "G-WJ92T09ZHB"
  });

  const db = firebaseApp.fireStore;

  export default db;