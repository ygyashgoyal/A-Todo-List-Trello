// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBdwsjj4epH3eRIDYTl_cgJI2oN1UexrsM",
    authDomain: "trello---a-todo-list.firebaseapp.com",
    projectId: "trello---a-todo-list",
    storageBucket: "trello---a-todo-list.firebasestorage.app",
    messagingSenderId: "264726786733",
    appId: "1:264726786733:web:c40f8730552ec3d9e98c24",
    measurementId: "G-9477JXM797"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
