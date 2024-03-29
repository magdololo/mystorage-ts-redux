
import {initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics"
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    sendEmailVerification
} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";



// your firebase config here
export const firebaseConfig = {

    apiKey: "AIzaSyC9ccBXj_IIgdJEwTzumpKmLMjluD6KyYc",

    authDomain: "my-storage-d69f8.firebaseapp.com",

    projectId: "my-storage-d69f8",

    storageBucket: "my-storage-d69f8.appspot.com",

    messagingSenderId: "911453746317",

    appId: "1:911453746317:web:55672b82043e813f839ec4",

    measurementId: "G-DVJ29Z37WL"

};
//init firebase app
export const app = initializeApp(firebaseConfig);
getAnalytics(app);
//init services
const auth = getAuth();
const db = getFirestore(app)

// ADD THESE LINES
// if (location.hostname === "localhost") {
//     console.log("localhost detected!");
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth,'localhost')
// }


export {
    auth,
    db,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    sendSignInLinkToEmail,
    sendEmailVerification
}
