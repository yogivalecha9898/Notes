import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyCCOi_fACARyYoV4bS7vuuqtU6qqRRCrq8",
  authDomain: "noteshare-4e19e.firebaseapp.com",
  projectId: "noteshare-4e19e",
  storageBucket: "noteshare-4e19e.appspot.com",
  messagingSenderId: "855345446267",
  appId: "1:855345446267:web:2df30e14172a118d1b91de"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const rl = firebase.database()
const auth = firebase.auth()
const st = firebase.storage()

export { db, rl, auth, st }