// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage }  from  "firebase/storage";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFHbDddAsU3Fm2rUd1KgPC7O83dRIBk10",
  authDomain: "mymemes-5bab7.firebaseapp.com",
  projectId: "mymemes-5bab7",
  storageBucket: "mymemes-5bab7.appspot.com",
  messagingSenderId: "244283959581",
  appId: "1:244283959581:web:6f44d32253306f060359f4",
  measurementId: "G-D7XD6M3SVH"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const imgDB= getStorage(app);
export const name=getFirestore(app);
export const db=getFirestore(app); 
// doc(db,);
export const txtDB= getFirestore(app);