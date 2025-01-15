// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGPK8Wl9u2R3Jnk4SxlAWh5NM9RbWkoow",
  authDomain: "ecom-4ba27.firebaseapp.com",
  projectId: "ecom-4ba27",
  storageBucket: "ecom-4ba27.firebasestorage.app",
  messagingSenderId: "202595564675",
  appId: "1:202595564675:web:a43a0bccd6a36091216fb6",
  measurementId: "G-YPLFRY8PX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);