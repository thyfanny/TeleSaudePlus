// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTxVNoEpr_NpV9JfAsdC0QIV4I1-kSkbk",
  authDomain: "notificacoes-e17e8.firebaseapp.com",
  projectId: "notificacoes-e17e8",
  storageBucket: "notificacoes-e17e8.firebasestorage.app",
  messagingSenderId: "355252728644",
  appId: "1:355252728644:web:834d8bc3005c033c02dd11",
  measurementId: "G-SE88NLKMG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app