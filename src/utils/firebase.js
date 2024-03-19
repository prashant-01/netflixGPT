// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBouRAPoqmCGrCWJSwlKsHwyK2RPnShKSg",
    authDomain: "netflixgpt-1577f.firebaseapp.com",
    projectId: "netflixgpt-1577f",
    storageBucket: "netflixgpt-1577f.appspot.com",
    messagingSenderId: "990214346720",
    appId: "1:990214346720:web:dcf637dcf94fa20a123d85",
    measurementId: "G-J70HMS0FGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth  = getAuth();