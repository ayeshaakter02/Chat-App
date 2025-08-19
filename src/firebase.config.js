// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_a82rqNGRgvDDfpK-IU7F4mAs61t-OgI",
  authDomain: "project-cda85.firebaseapp.com",
  projectId: "project-cda85",
  storageBucket: "project-cda85.firebasestorage.app",
  messagingSenderId: "689894240814",
  appId: "1:689894240814:web:2f848921a5c9059b3c25bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// export default firebaseConfig;
export {app};
export {auth};