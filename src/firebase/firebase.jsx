// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmW6oaREOdEXyTfj6tLbLwDRaXyrKtJ-s",
  authDomain: "diamondvaluation-1718484187119.firebaseapp.com",
  projectId: "diamondvaluation-1718484187119",
  storageBucket: "diamondvaluation-1718484187119.appspot.com",
  messagingSenderId: "1097918965642",
  appId: "1:1097918965642:web:6ab7c6f605327f3e29ca73",
  measurementId: "G-393G1MDFHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);