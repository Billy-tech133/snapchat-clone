import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyC4lmLq6oE6ksm-8070y0pUd-ZpGfzsQY8",
  authDomain: "snapchat-clone-49d09.firebaseapp.com",
  projectId: "snapchat-clone-49d09",
  storageBucket: "snapchat-clone-49d09.appspot.com",
  messagingSenderId: "856132908732",
  appId: "1:856132908732:web:1ed6c734bc14080f1982b9",
  measurementId: "G-B3MFM5WRZP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, storage, auth, provider};