// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2aVZPJzMIRFw1UWfj1TpvLXLhYtTIj4A",
  authDomain: "movie-1da62.firebaseapp.com",
  databaseURL: "https://movie-1da62-default-rtdb.firebaseio.com",
  projectId: "movie-1da62",
  storageBucket: "movie-1da62.appspot.com",
  messagingSenderId: "365508311448",
  appId: "1:365508311448:web:598f0e719bec4df22593ed",
  measurementId: "G-5GDC9NGFYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);