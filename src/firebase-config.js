// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9a1DDYVypEH7DeaAxHJPiiTbT2A_Rpjo",
  authDomain: "chatapp-4e247.firebaseapp.com",
  projectId: "chatapp-4e247",
  storageBucket: "chatapp-4e247.appspot.com",
  messagingSenderId: "619509114525",
  appId: "1:619509114525:web:6f502865fb5c1438c21674",
  measurementId: "G-HH1ZVX88VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider(); 
export const db= getFirestore(app)