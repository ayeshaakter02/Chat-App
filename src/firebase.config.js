// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy3-8MB3egs1dHF5vYzSkbe1CMCrTdwrk",
  authDomain: "chatapp-ffbbd.firebaseapp.com",
  projectId: "chatapp-ffbbd",
  storageBucket: "chatapp-ffbbd.firebasestorage.app",
  messagingSenderId: "183368954477",
  appId: "1:183368954477:web:c2f7258a9b2ff8ed85c564"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// export default firebaseConfig;
export {app};
export {auth};