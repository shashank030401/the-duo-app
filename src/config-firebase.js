import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL:
//     "https://the-duo-app-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcc5T544XiGNSPWs5nlmNxgtp9-5si5kY",
  authDomain: "the-duo-app.firebaseapp.com",
  databaseURL:
    "https://the-duo-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-duo-app",
  storageBucket: "the-duo-app.appspot.com",
  messagingSenderId: "773694421750",
  appId: "1:773694421750:web:3ecbcc7a64e3eebb594ad7",
  measurementId: "G-LWZZHFHK42",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
