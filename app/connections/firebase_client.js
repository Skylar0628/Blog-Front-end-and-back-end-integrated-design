var firebase = require('firebase/app');
require('dotenv').config();

require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId:  process.env.FIREBASE_PROJECT_ID,
    // storageBucket: "artful-affinity-423716-j0.appspot.com",
    // messagingSenderId: "882183960731",
    // appId: "1:882183960731:web:03a07177f1bfc12894ae3e",
    // measurementId: "G-VK6BT1HX5F"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(); //初始化auth

module.exports = { firebase, auth };