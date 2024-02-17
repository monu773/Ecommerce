import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfvtkELLhuKBFyh1VFu87HmnrxU23JH2U",
    authDomain: "e-commerce-f0486.firebaseapp.com",
    projectId: "e-commerce-f0486",
    storageBucket: "e-commerce-f0486.appspot.com",
    messagingSenderId: "858009267836",
    appId: "1:858009267836:web:85fede4b65ab873963e3f9",
    measurementId: "G-448HC0SWQ2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
