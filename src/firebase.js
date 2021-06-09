import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyCXXAj-fKO8lVK1DcfE1GXSxIgwuu5tl58",
  authDomain: "noteshare-d25f8.firebaseapp.com",
  projectId: "noteshare-d25f8",
  storageBucket: "noteshare-d25f8.appspot.com",
  messagingSenderId: "942904519680",
  appId: "1:942904519680:web:225c06ca8fc90dfd8afce5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const rl = firebase.database()
const auth = firebase.auth()
const st = firebase.storage()

export { db, rl, auth, st }