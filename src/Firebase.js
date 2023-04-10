// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALVhviA-arIJse5qSjTRZJI4yk4hmtF7Y",
  authDomain: "pdfeditor-6f3a5.firebaseapp.com",
  projectId: "pdfeditor-6f3a5",
  storageBucket: "pdfeditor-6f3a5.appspot.com",
  messagingSenderId: "811810411274",
  appId: "1:811810411274:web:eee63d1ae56b66468620f3"
};

// Initialize Firebase
 const appfire = initializeApp(firebaseConfig);
 export {appfire};