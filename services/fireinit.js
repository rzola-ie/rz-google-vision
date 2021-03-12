import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
  apiKey: "AIzaSyBBPxj3UVp3sT9D4nyyGWD_Xn7lKOxZhpE",
  authDomain: "rzauthtest-8394d.firebaseapp.com",
  databaseURL: "https://rzauthtest-8394d.firebaseio.com",
  projectId: "rzauthtest-8394d",
  storageBucket: "rzauthtest-8394d.appspot.com",
  messagingSenderId: "229483524369",
  appId: "1:229483524369:web:b0f6713e6a581141ec1cb0",
  measurementId: "G-G13Y4HGWWE"
};

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase