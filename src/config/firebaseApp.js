import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB03hMBO2DKZ1xb3aZcjW6C5nvY-4Yw4Dk",
  authDomain: "binar-firebase-28e4b.firebaseapp.com",
  projectId: "binar-firebase-28e4b",
  storageBucket: "binar-firebase-28e4b.appspot.com",
  messagingSenderId: "98859592371",
  appId: "1:98859592371:web:f17dedcaabc0891b931ec6",
  measurementId: "G-6CV0HZFPS1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
