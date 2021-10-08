import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCFQbbaf4M_BUJagnQenUwCZCFwwmkCJHc",
  authDomain: "noteshare-45181.firebaseapp.com",
  projectId: "noteshare-45181",
  storageBucket: "noteshare-45181.appspot.com",
  messagingSenderId: "753132916516",
  appId: "1:753132916516:web:404d46cc259ce9d6242db1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const rl = firebase.database()
const auth = firebase.auth()
const st = firebase.storage()

export { db, rl, auth, st }
