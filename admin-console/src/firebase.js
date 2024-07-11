// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANMkvtQdksuG-umWerJIIaTg-xcs-A8nk",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "pathpilot-c30ee",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
