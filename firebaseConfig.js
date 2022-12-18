// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7GohVyaiY1ZIiN1GC_BxbR3QRgxXB5WI",
  authDomain: "rfidadmin-5d6ca.firebaseapp.com",
  databaseURL: "https://rfidadmin-5d6ca-default-rtdb.firebaseio.com",
  projectId: "rfidadmin-5d6ca",
  storageBucket: "rfidadmin-5d6ca.appspot.com",
  messagingSenderId: "706414298478",
  appId: "1:706414298478:web:3573a0b0e3fe0021f0ed7f",
  measurementId: "G-GCF95SFEB6"
};

// Initialize Firebase
 const firebase = initializeApp(firebaseConfig);

// const db = getFirestore(firebase);

export default firebase;
