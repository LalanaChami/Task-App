import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRXAGAFsZ6q_C1PZVUHggPFxex4ucN098",
  authDomain: "react-navtive-finals.firebaseapp.com",
  projectId: "react-navtive-finals",
  storageBucket: "react-navtive-finals.firebasestorage.app",
  messagingSenderId: "481517089384",
  appId: "1:481517089384:web:9a84122fc5f39f879501dd",
  databaseURL: "https://react-navtive-finals-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
