import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBrJGm2GQfJChVvCa1U3YNeqwrwih5RrdU",
  authDomain: "my-istagram-ce477.firebaseapp.com",
  databaseURL: "https://my-istagram-ce477.firebaseio.com",
  projectId: "my-istagram-ce477",
  storageBucket: "my-istagram-ce477.appspot.com",
  messagingSenderId: "286690279434",
  appId: "1:286690279434:web:a0588a0edd5c6fe1b55ff3",
  measurementId: "G-KX1QDLYZ68",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
