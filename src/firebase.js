import { initializeApp } from 'firebase/app';
import {getAnalytics} from "firebase/analytics"
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

// your firebase config here
const firebaseConfig = {

    apiKey: "AIzaSyC9ccBXj_IIgdJEwTzumpKmLMjluD6KyYc",

    authDomain: "my-storage-d69f8.firebaseapp.com",

    projectId: "my-storage-d69f8",

    storageBucket: "my-storage-d69f8.appspot.com",

    messagingSenderId: "911453746317",

    appId: "1:911453746317:web:55672b82043e813f839ec4",

    measurementId: "G-DVJ29Z37WL"

};

//init firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//init services
const auth = getAuth();

export {
    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
}